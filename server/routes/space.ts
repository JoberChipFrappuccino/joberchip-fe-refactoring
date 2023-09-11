import express from 'express'
import fs from 'fs'
import path from 'path'
const spaceRouter = express.Router()

type Previlige = {
  edit: boolean
  delete: boolean
}
type SpaceMockData = Record<string, { previlige: Previlige }>

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
  // * Privilege check
  // 원래는 access token을 통해 privilege를 체크해야 하지만, mock data이므로 특정 아이디에 대해서만 제한
  if (userId === 'user2') {
    data[userId].previlige = {
      edit: false,
      delete: false
    }
  } else {
    data[userId].previlige = {
      edit: true,
      delete: true
    }
  }

  return res.status(200).json(data[userId])
})

export default spaceRouter
