import compress from 'compression'
import cors from 'cors'
import express from 'express'
import render from '~/render/render'
import authRouter from '~/routes/auth'
import spaceRouter from './routes/space'

const PORT = 5173
const app = express()

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack')
  const webpackConfig = require('../webpack.client.config').map((config: any) => {
    config.output.path = config.output.path.replace('dist/dist/', 'dist/').replace('dist\\dist\\', 'dist\\')
    return config
  })
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const compiler = webpack(webpackConfig)
  app.use(
    webpackDevMiddleware(compiler, {
      writeToDisk: true,
      publicPath: webpackConfig[0].output.publicPath
    })
  )
  app.use(webpackHotMiddleware(compiler))
}

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(compress())
app.use(express.static('public'))
app.use(express.static('dist'))

app.use('/api/auth', authRouter)
app.use('/api/space', spaceRouter)

app.use('/', (req, res) => {
  render(req.url, req, res)
})

app
  .listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
  })
  .on('error', (error: Error & { code?: string }) => {
    const isPipe = (portOrPipe: number | string) => Number.isNaN(portOrPipe)
    const bind = isPipe(PORT) ? `Pipe ${PORT}` : `Port ${PORT}`
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges')
        process.exit(1)
      case 'EADDRINUSE':
        console.error(bind + ' is already in use')
        process.exit(1)
      default:
        throw error
    }
  })
