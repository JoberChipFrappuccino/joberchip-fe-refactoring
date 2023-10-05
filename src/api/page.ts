import { type BlockWith } from '@/models/space'
import { type ResponseBase } from '@/utils/api'
import { backAuthAPI } from './api'

/**
 * @description 페이지 생성 API
 * @see https://www.notion.so/2-cdf1976fd3e641dd84bd77df574fb471?p=43d4eeb0c66c4ac0aa95438de93022b1&pm=s
 */

export interface NewPage {
  parentPageId: string
  title: string
  description: string
}
export type CreatePageAPIParams = Pick<BlockWith<TPage>, 'title' | 'description' | 'x' | 'y' | 'h' | 'w'>

export const createPageAPI = async (body: CreatePageAPIParams): Promise<ResponseBase<null>> => {
  type Response = {
    status: number
    success: boolean
  }
  const { data } = await backAuthAPI<Response>('/v1/page/new', {
    method: 'POST',
    data: body
  })
  if (!data.success) throw new Error('페이지 생성에 실패했습니다.')
  return {
    status: 'success',
    message: '페이지를 생성했습니다.',
    data: null
  }
}
