import fs from 'fs'
import path from 'path'

type Previlige = {
  edit: boolean
  delete: boolean
}
type SpaceMockData = Record<string, { previlige: Previlige }>

export function getSpaceBySpaceId(spaceId: string) {
  const data: SpaceMockData = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, `../mocks/${process.env.NODE_ENV}/space.json`), 'utf8')
  )
  if (!data[spaceId]) {
    throw new Error('Invalid space id')
  }
  // * Privilege check
  // 사용자 아이디가 없으면 권한 없음

  data[spaceId].previlige = {
    edit: false,
    delete: false
  }
  return data[spaceId]
}
