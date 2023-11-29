import { type BlockType, type SharePage, type SpaceList } from '@/models/space'
import { type ResponseBase } from './../utils/api'
import { authAPI, backAuthAPI } from './api'

/**
 * @description 스페이스 상세내용 조회 API
 * @see https://www.notion.so/72d474ef1cfd45cf81feaade1ce4b9fc
 */
export const getSpaceFromBackAPI = async (pageId: string): Promise<ResponseBase<SharePage>> => {
  const { data } = await backAuthAPI<{
    status: number
    message: string
    response: SharePage
  }>(`/v1/page/${pageId}`)
  return {
    data: data.response,
    status: 'success',
    message: '스페이스를 불러왔습니다.'
  }
}

/**
 * @description 스페이스 상세내용 조회 API (FRONT MOCK API)
 * @see https://www.notion.so/72d474ef1cfd45cf81feaade1ce4b9fc
 */
export const getSpaceAPI = async (spaceId: string): Promise<ResponseBase<SharePage>> => {
  const { data } = await authAPI<SharePage>('/api/space', {
    method: 'GET',
    params: {
      id: spaceId
    }
  })
  return {
    data,
    status: 'success',
    message: '스페이스를 불러왔습니다.'
  }
}

/**
 * @description 스페이스 생성 API
 * @see https://www.notion.so/735e12d33bc9430d83ab6adce6e4fd87?v=57e9219345b349a8b5b0644e808f3cd0&p=58bfac2f0f3341bcb93261f0023f2555&pm=s
 */
export const createSpaceAPI = async (): Promise<ResponseBase<null>> => {
  type Response = {
    status: number
    success: boolean
  }
  const { data } = await backAuthAPI<Response>('/v1/space/new', {
    method: 'POST'
  })
  if (!data.success) throw new Error('스페이스 생성에 실패했습니다.')

  return {
    status: 'success',
    message: '스페이스를 생성했습니다.',
    data: null
  }
}

interface FetchSpaceListAPIResponse {
  status: number
  success: boolean
  response: SpaceList[]
}
/**
 * @description 스페이스 리스트 조회 API
 * @see https://www.notion.so/e893a51ab9cd4b609020c3abe0ed5cb7
 */
export const fetchSpaceListAPI = async (): Promise<ResponseBase<SpaceList[]>> => {
  const { data } = await backAuthAPI<FetchSpaceListAPIResponse>('/v1/space/list', {
    method: 'GET'
  })

  if (!data.success) throw new Error('스페이스 리스트를 불러오는데 실패했습니다.')

  return {
    status: 'success',
    message: '스페이스 리스트를 불러왔습니다.',
    data: data.response
  }
}

export interface BreadCrumbItems {
  parentId?: string
  pageId: string
  title: string | JSX.Element
  children?: BreadCrumbItems[]
}
interface FetchBreadCrumbAPIResponse {
  status: number
  success: boolean
  response: BreadCrumbItems
}
/**
 * @description BreadCrumb 조회 API
 * @see https://www.notion.so/Back-End-987b88625bae4cae90cf32fee45534b4?p=b76e833f9067409da16a5e376e740f8a&pm=s
 */
export async function fetchBreadCrumb(pageId?: string): Promise<ResponseBase<BreadCrumbItems>> {
  const { data } = await backAuthAPI<FetchBreadCrumbAPIResponse>(`/v1/page/${pageId}/breadCrumbBar`)
  return {
    status: 'success',
    message: 'BreadCrumb 조회 성공',
    data: data.response
  }
}

interface EditPageProfileParams {
  title?: SharePage['title']
  description?: SharePage['description']
  visible?: SharePage['visible']
  parentId?: string
}
/**
 * @description 페이지 프로필(title, description) / 공개 여부(visible) / 위치 (parentId) 수정 API
 * @see https://www.notion.so/9cf94562cc7b483d8cc75da7a5c0db19
 */
export async function editPageProfileAPI(
  pageId: string,
  formData: FormData
): Promise<ResponseBase<EditPageProfileParams>> {
  const { data } = await backAuthAPI(`/v1/page/${pageId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: formData
  })
  return {
    status: 'success',
    message: '페이지 프로필이 수정 되었습니다.',
    data: data.response
  }
}

export interface FetchBlockPositionBlocksParam {
  blockId: string // blockId
  blockType: BlockType // BlockType
  x: number
  y: number
  w: number
  h: number
}

interface FetchBlockPosition {
  status: number
  success: boolean
  response: boolean
}
/**
 * @description 페이지 내 블록 위치 / 형태 수정
 * @see https://www.notion.so/954491d9c292452c8fb13fe95280c3d7
 */
export async function fetchBlockPosition(
  pageId: string,
  blocks: FetchBlockPositionBlocksParam[]
): Promise<ResponseBase<FetchBlockPosition>> {
  const { data } = await backAuthAPI<FetchBlockPosition>(`/v1/page/${pageId}/blocks`, {
    method: 'POST',
    data: {
      blocks
    }
  })
  return {
    status: 'success',
    message: '블록 위치가 수정 되었습니다.',
    data
  }
}
