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
