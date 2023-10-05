import { type BlockWith } from '@/models/space'
import { type ResponseBase } from '@/utils/api'
import { backAuthAPI } from './api'

export type AddTemplateBlockAPIParams = Pick<BlockWith<TTemplate>, 'title' | 'description'> & {
  pageId: string
  x: number
  y: number
  w: number
  h: number
}
/**
 * @description 템플릿 블럭 생성 API
 * @see  https://www.notion.so/8c67208f17a84c4d9e20bc5ee4a79935
 */
export const addTemplateBlockAPI = async (body: AddTemplateBlockAPIParams) => {
  const { pageId, ...res } = body
  const response = await backAuthAPI<ResponseBase<BlockWith<TTemplate>>>(`/v1/page/${pageId}/templateBlock`, {
    method: 'POST',
    data: res
  })
  return {
    data: response.data.data,
    status: 'success',
    message: '블록을 추가했습니다.'
  }
}

export type AddLinkBlockParams = {
  x?: number
  y?: number
  w?: number
  h?: number
  title: string
  link: string
}
export const addLinkBlockAPI = async (pageId: any, body: AddLinkBlockParams) => {
  const response = await backAuthAPI(`/v1/page/${pageId}/linkBlock`, {
    method: 'POST',
    data: body
  })
  // eslint-disable-next-line no-console
  return {
    data: response.data.response,
    status: 'success',
    message: '링크 블록을 추가했습니다.'
  }
}

export type addGoogleMapBlockParams = {
  x: number
  y: number
  w: number
  h: number
  address?: string
  latitude: number
  longitude: number
}

export const addGoogleMapBlockAPI = async (pageId: any, body: addGoogleMapBlockParams) => {
  const response = await backAuthAPI(`/v1/page/${pageId}/mapBlock`, {
    method: 'POST',
    data: body
  })
  // eslint-disable-next-line no-console
  return {
    data: response.data.response,
    status: 'success',
    message: '구글 맵 블록을 추가했습니다.'
  }
}
export type editGoogleMapBlockParams = {
  address?: string
  latitude: number
  longitude: number
}

export const editGoogleMapBlockAPI = async (pageId: any, blockId: any, body: editGoogleMapBlockParams) => {
  const response = await backAuthAPI(`/v1/page/${pageId}/mapBlock/${blockId}`, {
    method: 'PUT',
    data: body
  })
  return {
    data: response.data.response,
    status: 'success',
    message: '구글 맵 블록을 수정했습니다.'
  }
}
