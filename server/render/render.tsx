import App from '@/App'
import { POST_API_KEY, SEO } from '@/constants'
import { SSRProvider } from '@/context/ssr'
import { ChunkExtractor } from '@loadable/server'
import type { Request, Response } from 'express'
import path from 'path'
import { renderToString } from 'react-dom/server'
import { Helmet } from 'react-helmet'
import { StaticRouter } from 'react-router-dom/server'
1
export default async function renderHome(url: string, req: Request, res: Response) {
  let serverSideData: {
    [key: string]: unknown
  } = {}

  const data: { title: string; description: string } = await new Promise((res) => {
    setTimeout(() => {
      const response = {
        title: '브라우저에서 페이지 소스를 확인해주세요!',
        description: 'this code show you how to use react server side rendering'
      }
      return res(response)
    }, 100)
  })

  serverSideData[POST_API_KEY] = JSON.stringify(data)
  serverSideData[SEO] = JSON.stringify({
    title: {
      '/': 'jober chip | 누군가의 공유 페이지',
      '/detail': 'jober chip | 누군가의 디테일 페이지'
    }
  })

  const webStats = path.resolve(__dirname, './web/loadable-stats.json')
  const nodeStats = path.resolve(__dirname, './node/loadable-stats.json')

  const webExtractor = new ChunkExtractor({ statsFile: webStats })
  const nodeExtractor = new ChunkExtractor({ statsFile: nodeStats })

  const extractor = process.env.NODE_ENV === 'production' ? webExtractor : nodeExtractor
  const jsx = extractor.collectChunks(
    <SSRProvider data={serverSideData}>
      <StaticRouter location={url}>
        <App />
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
        <div id="root">${html}</div>
        <script id="__SERVER_DATA__" type="application/json">${JSON.stringify(serverSideData)}</script>
        ${webExtractor.getScriptTags()}
      </body>
    </html>`)
}
