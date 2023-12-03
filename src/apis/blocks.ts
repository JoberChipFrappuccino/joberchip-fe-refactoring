import { type BlockWith } from '@/models/space'
import { backAuthAPI } from './api'

export type blockAPIType =
  | 'mapBlock'
  | 'linkBlock'
  | 'videoBlock'
  | 'pageBlock'
  | 'textBlock'
  | 'templateBlock'
  | 'imageBlock'
  | 'baseBlock'

export type AddTemplateBlockAPIParams = Pick<BlockWith<TTemplate>, 'title' | 'description'> & {
  pageId: string | undefined
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
  const { data } = await backAuthAPI(`/v1/page/${pageId}/templateBlock`, {
    method: 'POST',
    data: res
  })

  return {
    data: data.response,
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
/**
 * @description 링크 블럭 생성 API
 * @see https://www.notion.so/8bbf5e1b6e974bd89e78874644e320b7
 */
export const addLinkBlockAPI = async (pageId: any, body: AddLinkBlockParams) => {
  const response = await backAuthAPI(`/v1/page/${pageId}/linkBlock`, {
    method: 'POST',
    data: body
  })
  return {
    data: response.data.response,
    status: 'success',
    message: '링크 블록을 추가했습니다.'
  }
}

export type EditLinkBlockParams = {
  title?: string
  link?: string
  visible?: boolean
}
/**
 * @description 링크 블럭 수정 API
 * @see https:www.notion.so/107bc7366c3142f28b58b331989506fe
 */
export const editLinkBlockAPI = async (pageId: any, blockId: any, body: EditLinkBlockParams) => {
  const response = await backAuthAPI(`/v1/page/${pageId}/linkBlock/${blockId}`, {
    method: 'PUT',
    data: body
  })
  return {
    data: response.data.response,
    status: 'success',
    message: '링크 블록을 수정했습니다.'
  }
}
