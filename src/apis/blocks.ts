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
