import axios from 'axios'
import { authAPI } from './api'
import { Space } from '@/models/space'

type SpaceAPIResponse = {
  status: 'success' | 'failure'
  message: string
  data?: Space
}

export const getSpaceAPI = async (userId: string): Promise<SpaceAPIResponse> => {
  try {
    const { data } = await authAPI<Space>('/api/space', {
      method: 'GET',
      params: {
        id: userId
      }
    })
    return {
      data: data,
      status: 'success',
      message: '공간을 불러왔습니다.'
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
