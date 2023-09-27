import App from '@/App'
import { POST_API_KEY, SEO, SPACE } from '@/constants'
import { SSRProvider } from '@/context/ssr'
import { ChunkExtractor } from '@loadable/server'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { Request, Response } from 'express'
import path from 'path'
import { renderToString } from 'react-dom/server'
import { Helmet } from 'react-helmet'
import { StaticRouter } from 'react-router-dom/server'
import { getSpaceBySpaceId } from '~/utils/getSpaceById'

export default async function renderHome(url: string, req: Request, res: Response) {
  const serverSideData: Record<string, unknown> = {}

  interface SEOData {
    title: string
    description: string
  }
  const data: SEOData = await new Promise((resolve) => {
    setTimeout(() => {
      const response = {
        title: '브라우저에서 페이지 소스를 확인해주세요!',
        description: 'this code show you how to use react server side rendering'
      }
      resolve(response)
    }, 100)
  })

  serverSideData[POST_API_KEY] = JSON.stringify(data)
  serverSideData[SEO] = JSON.stringify({
    title: {
      '/': 'jober chip | 누군가의 공유 페이지',
      '/detail': 'jober chip | 누군가의 디테일 페이지'
    }
  })
  serverSideData[SPACE] = JSON.stringify({}) // CSR시 빈 객체로 초기화

  if (url.includes('/temp/space/')) {
    console.info('BACK_END에서 SPACE DETAIL을 조회합니다.')
    console.info('(미구현, BACK API 수정 중..)')

    // const spaceId = url.split('/temp/space/')[1]
    // serverSideData[SPACE] = JSON.stringify(getSpaceBySpaceId(spaceId))
    // const backResponse = await api(`/v1/page/${spaceId}`)
    // console.log('backResponse : ', backResponse)
  }

  if (url.includes('/space/')) {
    const spaceId = url.split('/space/')[1]
    serverSideData[SPACE] = JSON.stringify(getSpaceBySpaceId(spaceId))
  }

  const webStats = path.resolve(__dirname, './web/loadable-stats.json')
  const nodeStats = path.resolve(__dirname, './node/loadable-stats.json')

  const webExtractor = new ChunkExtractor({ statsFile: webStats })
  const nodeExtractor = new ChunkExtractor({ statsFile: nodeStats })

  const extractor = process.env.NODE_ENV === 'production' ? webExtractor : nodeExtractor
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        cacheTime: 1000 * 60 * 5, // 5분
        retry: 0
      }
    }
  })

  const jsx = extractor.collectChunks(
    <SSRProvider data={serverSideData}>
      <StaticRouter location={url}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </StaticRouter>
    </SSRProvider>
  )

  const html = renderToString(jsx)
  const helmet = Helmet.renderStatic()

  res.set('content-type', 'text/html')
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, user-scalable=no">
        <meta charSet="utf-8" />
        ${helmet.title.toString()}
        ${webExtractor.getLinkTags()}
        ${webExtractor.getStyleTags()}
      </head>
      <body>
        <div id="root">${html}
        </div>
        <script id="__SERVER_DATA__" type="application/json">${JSON.stringify(serverSideData)}</script>
        ${webExtractor.getScriptTags()}
      </body>
    </html>
    `)
}
