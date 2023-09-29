import { BACK_MOCK_ACCESS_TOKEN } from '@/constants'
import { type SharePage, type SpaceList } from '@/models/space'
import axios from 'axios'
import { authAPI, backAuthAPI } from './api'

interface SpaceAPIResponse {
  status: 'success' | 'failure'
  message: string
  data?: SharePage
}

/**
 * @description 스페이스 상세내용 조회 API
 * @see https://www.notion.so/72d474ef1cfd45cf81feaade1ce4b9fc
 */
export const getSpaceFromBackAPI = async (pageId: string): Promise<SpaceAPIResponse> => {
  try {
    const { data } = await backAuthAPI<{
      status: number
      message: string
      response: SharePage
    }>(`/v1/page/${pageId}`, {
      method: 'GET',
      headers: {
        Authorization: localStorage.getItem(BACK_MOCK_ACCESS_TOKEN)
      }
    })
    return {
      data: data.response,
      status: 'success',
      message: '스페이스를 불러왔습니다.'
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        status: 'failure',
        message: error.response?.data.message
      }
    }
    return {
      status: 'failure',
      message: '네트워크 오류가 발생했습니다. 다시 시도해주세요.'
    }
  }
}

/**
 * @description 스페이스 상세내용 조회 API (FRONT MOCK API)
 * @see https://www.notion.so/72d474ef1cfd45cf81feaade1ce4b9fc
 */
export const getSpaceAPI = async (spaceId: string): Promise<SpaceAPIResponse> => {
  try {
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
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        status: 'failure',
        message: error.response?.data.message
      }
    }
    return {
      status: 'failure',
      message: '네트워크 오류가 발생했습니다. 다시 시도해주세요.'
    }
  }
}

interface SpaceCreateAPIResponse {
  message: string
  success: boolean
}
/**
 * @description 스페이스 생성 API
 * @see https://www.notion.so/735e12d33bc9430d83ab6adce6e4fd87?v=57e9219345b349a8b5b0644e808f3cd0&p=58bfac2f0f3341bcb93261f0023f2555&pm=s
 */
export const createSpaceAPI = async (): Promise<SpaceCreateAPIResponse> => {
  try {
    type Response = {
      status: number
      success: boolean
    }
    const { data } = await backAuthAPI<Response>('/v1/space/new', {
      method: 'POST'
    })
    return {
      success: data.success,
      message: '스페이스를 생성했습니다.'
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error)
      return {
        success: false,
        message: error.response?.data.error.message
      }
    }
    return {
      success: false,
      message: '네트워크 오류가 발생했습니다. 다시 시도해주세요.'
    }
  }
}

interface SpaceListAPIResponse {
  spaceList: SpaceList[]
  message: string
  success: boolean
}

/**
 * @description 스페이스 리스트 조회 API
 * @see https://www.notion.so/e893a51ab9cd4b609020c3abe0ed5cb7
 */
export const getSpaceListAPI = async (): Promise<SpaceListAPIResponse> => {
  try {
    type Response = {
      status: number
      success: boolean
      response: SpaceList[]
    }
    const { data } = await backAuthAPI<Response>('/v1/space/list', {
      method: 'GET'
    })
    return {
      success: true,
      message: '스페이스 리스트를 불러왔습니다.',
      spaceList: data.response
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (process.env.NODE_ENV === 'development') console.error(error)
      return {
        success: false,
        message: error.response?.data.error.message,
        spaceList: []
      }
    }
    return {
      success: false,
      message: '네트워크 오류가 발생했습니다. 다시 시도해주세요.',
      spaceList: []
    }
  }
}
