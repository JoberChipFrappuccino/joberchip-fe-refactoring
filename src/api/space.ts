import { type Space, type SpaceList } from '@/models/space'
import axios from 'axios'
import { authAPI, backAuthAPI } from './api'

interface SpaceAPIResponse {
  status: 'success' | 'failure'
  message: string
  data?: Space
}

// https:// www.notion.so/72d474ef1cfd45cf81feaade1ce4b9fc
export const getSpaceFromBackAPI = async (pageId: string): Promise<SpaceAPIResponse> => {
  try {
    const { data } = await backAuthAPI<Space>(`/v1/page/${pageId}`, {
      method: 'GET'
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

// https:// www.notion.so/72d474ef1cfd45cf81feaade1ce4b9fc
export const getSpaceAPI = async (spaceId: string): Promise<SpaceAPIResponse> => {
  try {
    const { data } = await authAPI<Space>('/api/space', {
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
// https://www.notion.so/735e12d33bc9430d83ab6adce6e4fd87?v=57e9219345b349a8b5b0644e808f3cd0&p=58bfac2f0f3341bcb93261f0023f2555&pm=s
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
  data: SpaceList[]
  message: string
  success: boolean
}

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
      data: data.response
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (process.env.NODE_ENV === 'development') console.error(error)
      return {
        success: false,
        message: error.response?.data.error.message,
        data: []
      }
    }
    return {
      success: false,
      message: '네트워크 오류가 발생했습니다. 다시 시도해주세요.',
      data: []
    }
  }
}
