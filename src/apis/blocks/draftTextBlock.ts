import { type ITextBlock } from '@/models/block'
import { backAuthAPI } from '../api'

export interface RequestTextBlockAddData {
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
export const addTextBlockAPI = async (pageId: string | undefined, body: RequestTextBlockAddData) => {
  if (!pageId) throw new Error('pageId가 없습니다.')
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

export interface RequestTextBlockEditData {
  objectId: ITextBlock['objectId']
  content?: string
  visible?: boolean
}
/**
 * @description 텍스트블록 수정 API
 * @see https://www.notion.so/2-cdf1976fd3e641dd84bd77df574fb471?p=de99c95f224848148558741b65871dfa&pm=s
 */
export const editTextBlockAPI = async (pageId: string | undefined, data: RequestTextBlockEditData) => {
  if (!pageId) throw new Error('pageId가 없습니다.')
  const response = await backAuthAPI(`/v1/page/${pageId}/textBlock/${data.objectId}`, {
    method: 'PUT',
    data
  })
  return {
    status: 'success',
    message: '텍스트블록을 수정했습니다.',
    data: response.data.response
  }
}
