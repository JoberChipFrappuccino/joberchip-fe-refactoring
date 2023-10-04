import App from '@/App'
import { SEO, SPACE } from '@/constants'
import { SSRProvider } from '@/context/ssr'
import { ChunkExtractor } from '@loadable/server'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { Request, Response } from 'express'
import path from 'path'
import { renderToString } from 'react-dom/server'
import { Helmet } from 'react-helmet'
import { StaticRouter } from 'react-router-dom/server'
import { api } from '~/api/api'
import { getSpaceBySpaceId } from '~/utils/getSpaceById'

export default async function renderHome(url: string, req: Request, res: Response) {
  const serverSideData: Record<string, unknown> = {}

  serverSideData[SEO] = JSON.stringify({
    title: {
      '/': 'jober chip',
      '/detail': 'jober chip | 누군가의 디테일 페이지'
    }
  })
  serverSideData[SPACE] = JSON.stringify({}) // CSR시 빈 객체로 초기화

  if (url.includes('/temp/space/')) {
    try {
      const pageId = url.split('/temp/space/')[1]
      const { data } = await api(`/v1/page/${pageId}`)
      serverSideData[SPACE] = JSON.stringify(data.response)
    } catch (error) {
      console.error(error)
      serverSideData[SPACE] = JSON.stringify({})
    }
  } else if (url.includes('/space/')) {
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
