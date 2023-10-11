import App from '@/App'
import { DEFAULT_CACHE_TIME, SEO, SPACE } from '@/constants'
import { SSRProvider } from '@/context/ssr'
import { ChunkExtractor } from '@loadable/server'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { Request, Response } from 'express'
import path from 'path'
import { renderToString } from 'react-dom/server'
import { Helmet } from 'react-helmet'
import { StaticRouter } from 'react-router-dom/server'
import { api } from '~/api/api'

export default async function renderHome(url: string, req: Request, res: Response) {
  const serverSideData: Record<string, unknown> = {}

  console.log('SSR request url :', url)

  serverSideData[SEO] = JSON.stringify({})
  serverSideData[SPACE] = JSON.stringify({}) // CSR시 빈 객체로 초기화

  if (url.includes('/space/')) {
    try {
      const pageId = url.split('/space/')[1]
      const { data } = await api(`/v1/page/${pageId}`)
      serverSideData[SPACE] = JSON.stringify(data.response)
      serverSideData[SEO] = JSON.stringify({
        title: data.response.title,
        description: data.response.description,
        profileImageLink: data.response.profileImageLink
      })
    } catch (error) {
      console.error(error)
      return res.status(404).send('<h1>NOT FOUND</h1>')
    }
  } else if (url.includes('/space/')) {
    // HACK : MOCK API 임시 코드
    // const spaceId = url.split('/space/')[1]
    // const reponse = getSpaceBySpaceId(spaceId)
    // serverSideData[SPACE] = JSON.stringify(reponse)
    // serverSideData[SEO] = JSON.stringify({
    //   title: 'Jober Chip | Test Page',
    //   description: 'The lazy fox jumps over the brown quick dog'
    // })
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
        cacheTime: DEFAULT_CACHE_TIME, // 5분
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
