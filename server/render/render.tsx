import type { Request, Response } from 'express'
import path from 'path'
import { ChunkExtractor } from '@loadable/server'
import { renderToString } from 'react-dom/server'
import { Helmet } from 'react-helmet'
import { StaticRouter } from 'react-router-dom/server'
import { SEO, SPACE } from '@/constants'
import QueryContext from '@/contexts/QueryContext'
import { SSRProvider } from '@/contexts/SSRContext'
import { Router } from '@/router'
import { api } from '~/api/api'

export default async function renderHome(url: string, req: Request, res: Response) {
  const serverSideData: Record<string, unknown> = {}

  console.info('SSR request url :', url)

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
  }

  const webStats = path.resolve(__dirname, './web/loadable-stats.json')
  const nodeStats = path.resolve(__dirname, './node/loadable-stats.json')

  const webExtractor = new ChunkExtractor({ statsFile: webStats })
  const nodeExtractor = new ChunkExtractor({ statsFile: nodeStats })

  const extractor = process.env.NODE_ENV === 'production' ? webExtractor : nodeExtractor

  const jsx = extractor.collectChunks(
    <StaticRouter location={url}>
      <SSRProvider data={serverSideData}>
        <QueryContext>
          <Router></Router>
        </QueryContext>
      </SSRProvider>
    </StaticRouter>
  )

  const html = renderToString(jsx)
  const helmet = Helmet.renderStatic()

  /**
   * @description 동적 CSS 가져오기 이슈가 있습니다.
   * @see https://github.com/gregberge/loadable-components/issues/94
   */
  res.set('content-type', 'text/html')
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, user-scalable=no">
        <meta charSet="utf-8" />
        <link rel="stylesheet" type="text/css" href="/web/App.css">
        ${helmet.title.toString()}
        ${webExtractor.getLinkTags()}
      </head>
      <body>
        <div id="root">${html}
        </div>
      </body>
      <script id="__SERVER_DATA__" type="application/json">${JSON.stringify(serverSideData)}</script>
      ${webExtractor.getScriptTags()}
    </html>
    `)
}
