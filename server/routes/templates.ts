import express from 'express'
import fs from 'fs'
import path from 'path'
const templateRouter = express.Router()

interface Templates {
  id: string
  title: string
  description: string
  sampleImage: string
}
interface TemplatesMockData {
  templates: Templates[]
}

templateRouter.get('/', (req, res) => {
  // 실제 서버는 userId를 받아야합니다요
  // const userId = req.query.id
  const data: TemplatesMockData = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, `../mocks/${process.env.NODE_ENV}/templates.json`), 'utf8')
  )
  return res.status(200).json(data)
})

export default templateRouter
