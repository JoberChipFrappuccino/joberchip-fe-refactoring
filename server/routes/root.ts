import express from 'express'
import render from '~/render/render'
import authRouter from '~/routes/auth'

const router = express.Router()

router.use('/auth', authRouter)

// * Render React Application with SSR
router.get('/', async (req, res) => {
  await render(req.url, req, res)
})

export default router
