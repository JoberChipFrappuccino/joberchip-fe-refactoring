import type { LinkBlock } from '@/models/block'
import { backAuthAPI } from '../api'

export type AddLinkBlockBody = {
  x?: LinkBlock['x']
  y?: LinkBlock['y']
  w?: LinkBlock['w']
  h?: LinkBlock['h']
  title: LinkBlock['title']
  link: LinkBlock['link']
}
/**
 * @description 링크 블럭 생성 API
 * @see https://www.notion.so/8bbf5e1b6e974bd89e78874644e320b7
 */
export const addLinkBlockAPI = async (pageId: string | undefined, body: AddLinkBlockBody) => {
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

export type EditLinkBlockBody = {
  objectId: LinkBlock['objectId']
  title?: LinkBlock['title']
  link?: LinkBlock['link']
  visible?: LinkBlock['visible']
}
/**
 * @description 링크 블럭 수정 API
 * @see https:www.notion.so/107bc7366c3142f28b58b331989506fe
 */
export const editLinkBlockAPI = async (pageId: string | undefined, body: EditLinkBlockBody) => {
  const response = await backAuthAPI(`/v1/page/${pageId}/linkBlock/${body.objectId}`, {
    method: 'PUT',
    data: body
  })
  return {
    data: response.data.response,
    status: 'success',
    message: '링크 블록을 수정했습니다.'
  }
}
