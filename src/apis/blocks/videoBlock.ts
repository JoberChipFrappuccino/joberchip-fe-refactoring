import { type VideoBlock } from '@/models/block'
import { backAuthAPI } from '../api'

interface AddVideoBlockResponse {
  response: VideoBlock
  status: number
  success: boolean
}
export interface AddVideoBlockBody {
  x: VideoBlock['x']
  y: VideoBlock['y']
  w: VideoBlock['w']
  h: VideoBlock['h']
  title: VideoBlock['title']
  videoLink?: string
  attachedVideo?: Blob
}
/**
 * @description 비디오 블럭 생성 API
 * @see https://www.notion.so/b3c240148be4470abb5ac0895de28575
 */
export const addVideoBlockAPI = async (pageId: string | undefined, body: AddVideoBlockBody) => {
  if (!pageId) throw new Error('pageId가 없습니다.')
  const form = convertBodyToForm(body)
  const { data } = await backAuthAPI<AddVideoBlockResponse>(`/v1/page/${pageId}/videoBlock`, {
    method: 'POST',
    data: form,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return {
    data: data.response,
    status: 'success',
    message: '비디오 블록을 추가했습니다.'
  }
}

interface EditVideoBlockResponse {
  response: VideoBlock
  status: number
  success: boolean
}
export interface EditVideoBlockBody {
  objectId: VideoBlock['objectId']
  title?: VideoBlock['title']
  attachedVideo?: Blob
  videoLink?: string
  visible?: VideoBlock['visible']
}
/**
 * @description 비디오 블럭 수정 API
 * @see https://www.notion.so/131f17790b8c4606891e4ca075f35f01
 */
export const editVideoBlockAPI = async (pageId: string | undefined, body: EditVideoBlockBody) => {
  const form = convertBodyToForm(body)
  const { data } = await backAuthAPI<EditVideoBlockResponse>(`/v1/page/${pageId}/videoBlock/${body.objectId}`, {
    method: 'PUT',
    data: form
  })
  return {
    data: data.response,
    status: 'success',
    message: '비디오 블록을 수정했습니다.'
  }
}

/**
 * @description 비디오 블럭 삭제 API
 * @see https://www.notion.so/5c2a3b2ceb6f4dc5a21c1f878cddcf8a
 */
export const deleteVideoBlockAPI = async (pageId: string | undefined, blockId: VideoBlock['objectId']) => {
  if (!pageId) throw new Error('pageId가 없습니다.')
  const response = await backAuthAPI(`/v1/page/${pageId}/videoBlock/${blockId}`, {
    method: 'DELETE'
  })
  return {
    status: 'success',
    message: '비디오 블럭을 삭제했습니다.',
    data: response.data.response
  }
}

function convertBodyToForm<T>(body: T) {
  type TKey = keyof T
  const form = new FormData()
  for (const key in body) {
    const value = body[key as TKey]
    if (typeof value === 'string') {
      form.append(key, value)
    } else if (value instanceof Blob) {
      form.append(key, value, 'image.png')
    } else {
      form.append(key, String(value))
    }
  }
  return form
}
