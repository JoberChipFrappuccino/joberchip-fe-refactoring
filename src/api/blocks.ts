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
  //   console.log('ADD TEMPLATE BLOCK API BODY : ', body)
  const response = await backAuthAPI<ResponseBase<BlockWith<TTemplate>>>('/v1/page/{pageId}/templateBlock', {
    method: 'POST',
    data: body
  })
  //   console.log('ADD TEMPLATE BLOCK API RESPONSE : ', response)
  return {
    data: response.data.data,
    status: 'success',
    message: '블록을 추가했습니다.'
  }
}
