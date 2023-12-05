import fs from 'fs'
import path from 'path'
import express from 'express'

const authRouter = express.Router()

export type UserMockData = Record<string, MockProfile>

type MockProfile = {
  user_id: string
  email: string
  username: string
  profile_image: string
  access_token: string
}

authRouter.get('/', (req, res) => {
  if (!req.headers.authorization || !req.headers.authorization.includes('token-example')) {
    return res.status(400).json({
      message: 'Invalid authorization header'
    })
  }

  const token = req.headers.authorization.split('token-example:')[1]
  const data: UserMockData = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, `../mocks/${process.env.NODE_ENV}/user.json`), 'utf8')
  )

  if (!data[token]) {
    return res.status(400).json({ message: 'Invalid authorization header' })
  }

  return res.json(data[token])
})

// * auth/signin?email=xxx
authRouter.post('/signin', (req, res) => {
  interface Body {
    username: string
    password: string
  }
  const body = req.body as unknown as Body
  const data: UserMockData = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, `../mocks/${process.env.NODE_ENV}/user.json`), 'utf8')
  )

  if (!data[body.username]) {
    return res.status(400).json({
      message: '존재하지 않는 이메일입니다.\n 아이디 또는 패스워드를 확인해주세요.'
    })
  }
  return res.json(data[body.username])
})

authRouter.get('/space', (req, res) => {
  res.send('')
})

export default authRouter
