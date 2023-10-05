import { backAuthAPI } from './api'

interface RequestTextBlockAddData {
  content: string
  x: number
  y: number
  h: number
  w: number
}

/**
 * @description 텍스트블록 생성 API
 * @see https://www.notion.so/16b3bea33270447fa51a4a06858daac9
 */
export const addTextBlockAPI = async (pageId: string, body: RequestTextBlockAddData) => {
  const response = await backAuthAPI(`/v1/page/${pageId}/textBlock`, {
    method: 'POST',
    data: body
  })
  return {
    status: 'success',
    message: '텍스트블록을 생성했습니다.',
    data: response.data.response
  }
}

interface RequestTextBlockEditData {
  content: string
}

/**
 * @description 텍스트블록 수정 API
 * @see https://www.notion.so/2-cdf1976fd3e641dd84bd77df574fb471?p=de99c95f224848148558741b65871dfa&pm=s
 */
export const editTextBlockAPI = async (pageId: string, blockId: string, content: RequestTextBlockEditData) => {
  const response = await backAuthAPI(`/v1/page/${pageId}/textBlock/${blockId}`, {
    method: 'PUT',
    data: content
  })
  return {
    status: 'success',
    message: '텍스트블록을 수정했습니다.',
    data: response.data.response
  }
}
