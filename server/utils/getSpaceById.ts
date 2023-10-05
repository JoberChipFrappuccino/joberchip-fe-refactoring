import fs from 'fs'
import path from 'path'

type Space = {
  title: string
  description: string
  privilege: PrivilegeType
}

type SpaceMockData = Record<string, Space>

export function getSpaceBySpaceId(spaceId: string) {
  const data: SpaceMockData = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, `../mocks/${process.env.NODE_ENV}/space.json`), 'utf8')
  )
  if (!data[spaceId]) {
    console.error(`[ERROR] Space not found: ${spaceId}`)
    return {}
  }
  // * Privilege check
  // 사용자 아이디가 없으면 권한 없음

  data[spaceId].privilege = 'EDIT'
  return data[spaceId]
}
