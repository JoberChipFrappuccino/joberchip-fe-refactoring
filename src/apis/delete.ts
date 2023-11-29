import { backAuthAPI } from './api'

/**
 * @description 블럭 삭제 API
 */
export const deleteBlockAPI = async (pageId: string, blockType: string, blockId: string) => {
  const response = await backAuthAPI(`/v1/page/${pageId}/${blockType}/${blockId}`, {
    method: 'DELETE'
  })
  return {
    status: 'success',
    message: '블럭을 삭제했습니다.',
    data: response.data.response
  }
}

export const deletePageAPI = async (pageId: string) => {
  const response = await backAuthAPI(`/v1/page/${pageId}`, {
    method: 'DELETE'
  })
  return {
    status: 'success',
    message: '페이지 블럭을 삭제했습니다.',
    data: response.data.response
  }
}
