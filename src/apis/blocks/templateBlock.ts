import { type BlockWith, type TemplateBlock } from '@/models/block'
import { authAPI, backAuthAPI } from '../api'

export const getTemplatesAPI = async (userId: string | undefined): Promise<Array<BlockWith<TTemplate>>> => {
  if (!userId) throw new Error('userId가 없습니다.')
  const { data } = await authAPI<Array<BlockWith<TTemplate>>>('/api/template', {
    method: 'GET',
    params: {
      id: userId
    }
  })
  return data
}

/**
 * @description 템플릿 블럭 생성 API
 * @see  https://www.notion.so/8c67208f17a84c4d9e20bc5ee4a79935
 */
export const addTemplateBlockAPI = async (pageId: string | undefined, body: AddTemplateBlockAPIBody) => {
  const { data } = await backAuthAPI(`/v1/page/${pageId}/templateBlock`, {
    method: 'POST',
    data: body
  })
  return {
    data: data.response,
    status: 'success',
    message: '블록을 추가했습니다.'
  }
}
export type AddTemplateBlockAPIBody = {
  x: TemplateBlock['x']
  y: TemplateBlock['y']
  w: TemplateBlock['w']
  h: TemplateBlock['h']
  title: TemplateBlock['title']
  description: TemplateBlock['description']
}
