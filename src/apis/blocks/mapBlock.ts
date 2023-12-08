import type { EmbedGoogleMapBlock } from '@/models/block'
import { backAuthAPI } from '../api'

/**
 * @description 지도 블럭 생성 API
 * @see https://www.notion.so/ee4e2a88bd384a2ab031fc5593fbc93a
 */
export const addGoogleMapBlockAPI = async (pageId: string | undefined, body: AddGoogleMapBlockBody) => {
  if (!pageId) throw new Error('pageId가 없습니다.')
  const { data } = await backAuthAPI<AddGoogleMapBlockResponse>(`/v1/page/${pageId}/mapBlock`, {
    method: 'POST',
    data: body
  })
  return {
    data: data.response,
    status: 'success',
    message: '지도 블록을 추가했습니다.'
  }
}
interface AddGoogleMapBlockResponse {
  response: EmbedGoogleMapBlock
  status: number
  success: boolean
}
export interface AddGoogleMapBlockBody {
  x: EmbedGoogleMapBlock['x']
  y: EmbedGoogleMapBlock['y']
  w: EmbedGoogleMapBlock['w']
  h: EmbedGoogleMapBlock['h']
  latitude: EmbedGoogleMapBlock['latitude']
  longitude: EmbedGoogleMapBlock['longitude']
  address: EmbedGoogleMapBlock['address']
  type: EmbedGoogleMapBlock['type']
}

/**
 * @description 지도 블럭 수정 API
 * @see https://www.notion.so/6489900f63984b38be7b8be3b55c2a35
 */
export const editGoogleMapBlockAPI = async (pageId: string | undefined, block: EditGoogleMapBlockBody) => {
  const response = await backAuthAPI<EditGoogleMapBlockResponse>(`/v1/page/${pageId}/mapBlock/${block.objectId}`, {
    method: 'PUT',
    data: block
  })
  return {
    data: response.data.response,
    status: 'success',
    message: '지도 블록을 수정했습니다.'
  }
}
interface EditGoogleMapBlockResponse {
  response: EmbedGoogleMapBlock
  status: number
  success: boolean
}
export interface EditGoogleMapBlockBody {
  objectId: EmbedGoogleMapBlock['objectId']
  latitude?: EmbedGoogleMapBlock['latitude']
  longitude?: EmbedGoogleMapBlock['longitude']
  address?: EmbedGoogleMapBlock['address']
  visible?: EmbedGoogleMapBlock['visible']
}

/**
 * @description 지도 블럭 삭제 API
 * @see https://www.notion.so/5c2a3b2ceb6f4dc5a21c1f878cddcf8a
 */
export const deleteMapBlockAPI = async (pageId: string | undefined, blockId: EmbedGoogleMapBlock['objectId']) => {
  if (!pageId) throw new Error('pageId가 없습니다.')
  const response = await backAuthAPI(`/v1/page/${pageId}/mapBlock/${blockId}`, {
    method: 'DELETE'
  })
  return {
    status: 'success',
    message: '블럭을 삭제했습니다.',
    data: response.data.response
  }
}
