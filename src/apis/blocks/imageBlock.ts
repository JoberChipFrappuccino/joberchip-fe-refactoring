import type { ImageBlock, EmbedGoogleMapBlock } from '@/models/block'
import { backAuthAPI } from '../api'

interface AddImageBlockResponse {
  response: EmbedGoogleMapBlock
  status: number
  success: boolean
}
export interface AddImageBlockBody {
  x: ImageBlock['x']
  y: ImageBlock['y']
  w: ImageBlock['w']
  h: ImageBlock['h']
  type: ImageBlock['type']
  title: ImageBlock['title']
  attachedImage: Blob
}
/**
 * @description 이미지 블럭 생성 API
 * @see https://www.notion.so/2ef9f22aad1a4836ad75df5446826013
 */
export const addImageBlockAPI = async (pageId: string | undefined, body: AddImageBlockBody) => {
  if (!pageId) throw new Error('pageId가 없습니다.')
  const form = convertBodyToForm(body)

  const { data } = await backAuthAPI<AddImageBlockResponse>(`/v1/page/${pageId}/imageBlock`, {
    method: 'POST',
    data: form,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return {
    data: data.response,
    status: 'success',
    message: '이미지 블록을 추가했습니다.'
  }
}

interface EditImageBlockResponse {
  response: ImageBlock
  status: number
  success: boolean
}
export interface EditImageBlockBody {
  objectId: ImageBlock['objectId']
  title?: ImageBlock['title']
  attachedImage?: Blob
  visible?: ImageBlock['visible']
}
/**
 * @description 이미지 블럭 수정 API
 * @see https://www.notion.so/73170cb13eba4ac5b5f34ed4ff113214
 */
export const editImageBlockAPI = async (pageId: string | undefined, body: EditImageBlockBody) => {
  const form = convertBodyToForm(body)
  const { data } = await backAuthAPI<EditImageBlockResponse>(`/v1/page/${pageId}/imageBlock/${body.objectId}`, {
    method: 'PUT',
    data: form
  })
  return {
    data: data.response,
    status: 'success',
    message: '이미지 블록을 수정했습니다.'
  }
}

/**
 * @description 이미지 블럭 삭제 API
 * @see https://www.notion.so/5c2a3b2ceb6f4dc5a21c1f878cddcf8a
 */
export const deleteImageBlockAPI = async (pageId: string | undefined, blockId: ImageBlock['objectId']) => {
  if (!pageId) throw new Error('pageId가 없습니다.')
  const response = await backAuthAPI(`/v1/page/${pageId}/imageBlock/${blockId}`, {
    method: 'DELETE'
  })
  return {
    status: 'success',
    message: '이미지 블럭을 삭제했습니다.',
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
