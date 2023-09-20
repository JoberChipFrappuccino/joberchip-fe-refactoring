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
  // previlige는 항상 false이고, 사용자 정보를 기반으로 previlige를 변경합니다.
  data[userId].previlige = {
    edit: false,
    delete: false
  }

  return res.status(200).json(data[userId])
})

export default spaceRouter
