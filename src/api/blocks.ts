import { type BlockWith } from '@/models/space'
import { backAuthAPI } from './api'

export type addGoogleMapBlockParams = {
  x: number
  y: number
  w: number
  h: number
  address?: string
  latitude: number
  longitude: number
}

/**
 * @description 지도 블럭 생성 API
 * @see https://www.notion.so/ee4e2a88bd384a2ab031fc5593fbc93a
 */
export const addGoogleMapBlockAPI = async (pageId: any, body: addGoogleMapBlockParams) => {
  const response = await backAuthAPI(`/v1/page/${pageId}/mapBlock`, {
    method: 'POST',
    data: body
  })
  return {
    data: response.data.response,
    status: 'success',
    message: '구글 맵 블록을 추가했습니다.'
  }
}

export type editGoogleMapBlockParams = {
  address?: string
  latitude?: number
  longitude?: number
  visible?: boolean
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

export type AddImageBlockParams = {
  x?: number
  y?: number
  w?: number
  h?: number
  title: string
  attachedImage: File
}

export const addImageBlockAPI = async (pageId: any, form: any) => {
  const response = await backAuthAPI(`/v1/page/${pageId}/imageBlock`, {
    method: 'POST',
    data: form,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return {
    data: response.data.response,
    status: 'success',
    message: '이미지 블록을 추가했습니다.'
  }
}

export type EditImageBlockParams = {
  title: string
  attachedImage: File
}

export const editImageBlockAPI = async (pageId: any, blockId: any, form: any) => {
  const response = await backAuthAPI(`/v1/page/${pageId}/imageBlock/${blockId}`, {
    method: 'PUT',
    data: form
  })
  return {
    data: response.data.response,
    status: 'success',
    message: '이미지 블록을 수정했습니다.'
  }
}

export type AddVideoBlockParams = {
  x?: number
  y?: number
  w?: number
  h?: number
  title: string
  videoLink?: string
  attachedImage?: File
}

export const addVideoBlockAPI = async (pageId: any, form: any) => {
  const response = await backAuthAPI(`/v1/page/${pageId}/videoBlock`, {
    method: 'POST',
    data: form,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return {
    data: response.data.response,
    status: 'success',
    message: '비디오 블록을 추가했습니다.'
  }
}

export type EditVideoBlockParams = {
  title: string
  videoLink: string
  attachedImage: File
}

export const editVideoBlockAPI = async (pageId: any, blockId: any, form: any) => {
  const response = await backAuthAPI(`/v1/page/${pageId}/videoBlock/${blockId}`, {
    method: 'PUT',
    data: form
  })
  return {
    data: response.data.response,
    status: 'success',
    message: '비디오 블록을 수정했습니다.'
  }
}
