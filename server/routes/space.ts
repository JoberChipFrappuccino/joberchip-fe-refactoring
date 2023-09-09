import express from 'express'
import fs from 'fs'
import path from 'path'
const spaceRouter = express.Router()

type SpaceMockData = {
  [key: string]: string
}

spaceRouter.get('/', (req, res) => {
  const userId = req.query.id
  if (typeof userId !== 'string') {
    return res.status(400).json({
      message: 'Invalid user id'
    })
  }
  const data: SpaceMockData = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, `../mocks/${process.env.NODE_ENV}/space.json`), 'utf8')
  )
  if (!data[userId]) {
    return res.status(400).json({ message: 'Invalid user id' })
  }

  return res.status(200).json(data[userId])
})

export default spaceRouter
