import { type SharePage, type SpaceList } from '@/models/space'
import { type ResponseBase } from './../utils/api'
import { authAPI, backAuthAPI } from './api'

/**
 * @description 스페이스 상세내용 조회 API
 * @see https://www.notion.so/72d474ef1cfd45cf81feaade1ce4b9fc
 */
export const getSpaceFromBackAPI = async (pageId: string): Promise<ResponseBase<SharePage>> => {
  const { data } = await backAuthAPI<{
    status: number
    message: string
    response: SharePage
  }>(`/v1/page/${pageId}`)
  return {
    data: data.response,
    status: 'success',
    message: '스페이스를 불러왔습니다.'
  }
}

/**
 * @description 스페이스 상세내용 조회 API (FRONT MOCK API)
 * @see https://www.notion.so/72d474ef1cfd45cf81feaade1ce4b9fc
 */
export const getSpaceAPI = async (spaceId: string): Promise<ResponseBase<SharePage>> => {
  const { data } = await authAPI<SharePage>('/api/space', {
    method: 'GET',
    params: {
      id: spaceId
    }
  })
  return {
    data,
    status: 'success',
    message: '스페이스를 불러왔습니다.'
  }
}

/**
 * @description 스페이스 생성 API
 * @see https://www.notion.so/735e12d33bc9430d83ab6adce6e4fd87?v=57e9219345b349a8b5b0644e808f3cd0&p=58bfac2f0f3341bcb93261f0023f2555&pm=s
 */
export const createSpaceAPI = async (): Promise<ResponseBase<null>> => {
  type Response = {
    status: number
    success: boolean
  }
  const { data } = await backAuthAPI<Response>('/v1/space/new', {
    method: 'POST'
  })
  if (!data.success) throw new Error('스페이스 생성에 실패했습니다.')

  return {
    status: 'success',
    message: '스페이스를 생성했습니다.',
    data: null
  }
}

interface FetchSpaceListAPIResponse {
  status: number
  success: boolean
  response: SpaceList[]
}

/**
 * @description 스페이스 리스트 조회 API
 * @see https://www.notion.so/e893a51ab9cd4b609020c3abe0ed5cb7
 */
export const fetchSpaceListAPI = async (): Promise<ResponseBase<SpaceList[]>> => {
  const { data } = await backAuthAPI<FetchSpaceListAPIResponse>('/v1/space/list', {
    method: 'GET'
  })

  if (!data.success) throw new Error('스페이스 리스트를 불러오는데 실패했습니다.')

  return {
    status: 'success',
    message: '스페이스 리스트를 불러왔습니다.',
    data: data.response
  }
}
