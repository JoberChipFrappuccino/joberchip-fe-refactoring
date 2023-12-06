import { backAuthAPI } from '../api'

export * from './imageBlock'
export * from './linkBlock'
export * from './mapBlock'
export * from './templateBlock'
export * from './textblock'
export * from './videoBlock'

/**
 * @description 블럭 & 페이지 삭제 API
 */
export const deleteBlockAPI = async (pageId: string | undefined, blockType: string, blockId: string) => {
  if (!pageId) throw new Error('pageId가 없습니다.')
  const response = await backAuthAPI(`/v1/page/${pageId}/${blockType}/${blockId}`, {
    method: 'DELETE'
  })
  return {
    status: 'success',
    message: '블럭을 삭제했습니다.',
    data: response.data.response
  }
}
