import type { BlockType, PageBlock } from '@/models/block'
import { type SharePage } from '@/models/space'
import { type ResponseBase } from '@/utils'
import { type ITree } from '@/hooks/tree'
import { backAuthAPI } from '../api'

/**
 * @description 페이지 주소 경로 조히 (BreadCrumb) API
 * @see https://www.notion.so/Back-End-987b88625bae4cae90cf32fee45534b4?p=b76e833f9067409da16a5e376e740f8a&pm=s
 */
export async function getBreadCrumb(pageId?: string): Promise<ResponseBase<BreadCrumbItems>> {
  const { data } = await backAuthAPI<FetchBreadCrumbAPIResponse>(`/v1/page/${pageId}/breadCrumbBar`)
  return {
    status: 'success',
    message: 'BreadCrumb 조회 성공',
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
 * @description 페이지 생성 API
 * @see https://www.notion.so/2-cdf1976fd3e641dd84bd77df574fb471?p=43d4eeb0c66c4ac0aa95438de93022b1&pm=s
 */
export const createPageAPI = async (body: CreatePageAPIBody) => {
  const { data } = await backAuthAPI<CreatePageAPIResponse>('/v1/page/new', {
    method: 'POST',
    data: body
  })
  if (!data.success) throw new Error('페이지 생성에 실패했습니다.')
  return {
    data: data.response,
    status: 'success',
    message: '페이지를 생성했습니다.'
  }
}
export interface NewPage {
  parentPageId: string
  title: string
  description: string
}
export interface CreatePageAPIBody {
  parentPageId: string
  title: string
  description: string
  x: number
  y: number
  w: number
  h: number
}
export interface CreatePageAPIResponse {
  status: number
  success: boolean
  response: PageBlock
}

/**
 * @description 페이지 편집 권한 확인 page/privilege
 * @see https://www.notion.so/b91b17cc89dd4e1aa18357da0e3cd95e
 */
export const checkPagePrivilegeAPI = async (pageId: string) => {}

/**
 * @description 페이지 트리 조회 API
 * @see https://www.notion.so/2-cdf1976fd3e641dd84bd77df574fb471?p=559b36ae88944c739ffef14d869e4637&pm=s
 */
export const getTreeAPI = async (spaceId: string): Promise<ResponseBase<ITree>> => {
  const { data } = await backAuthAPI<{
    status: number
    success: boolean
    response: ITree
  }>(`/v1/page/tree?spaceId=${spaceId}`, {
    method: 'GET'
  })
  return {
    data: data.response,
    status: 'success',
    message: '트리정보를 불러왔습니다.'
  }
}

/**
 * @description 페이지 상세 조회 (공유 페이지)
 * @see https://www.notion.so/72d474ef1cfd45cf81feaade1ce4b9fc
 */
export const getSpaceFromBackAPI = async (pageId: string): Promise<SharePage> => {
  const { data } = await backAuthAPI<SharePageResponse>(`/v1/page/${pageId}`)
  return data.response
}

interface SharePageResponse {
  status: number
  success: boolean
  response: SharePage
}

/**
 * @description 페이지 삭제 API
 * @see https://www.notion.so/b838c5881ed64725840df303c0c9b23f
 */
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

/**
 * @description 페이지 프로필(title, description) / 공개 여부(visible) / 위치 (parentId) 수정 API
 * @see https://www.notion.so/9cf94562cc7b483d8cc75da7a5c0db19
 */
export async function editPageBlockAPI(
  pageId: string | undefined,
  body: EditPageBlockBody
): Promise<ResponseBase<PageBlock>> {
  if (!pageId) throw new Error('pageId가 없습니다.')
  const form = convertBodyToForm(body)
  const { data } = await backAuthAPI(`/v1/page/${pageId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: form
  })
  return {
    status: 'success',
    message: '페이지 프로필이 수정 되었습니다.',
    data: data.response
  }
}
/**
 * @property parentPageId 부모 페이지 ID, 부모 페이지의 하위 페이지로 이동합니다.
 * @property profileImage 프로필 이미지, *.png, *.jpeg, *.jpg 지원합니다.
 */
export interface EditPageBlockBody {
  parentPageId?: string
  title?: SharePage['title']
  description?: SharePage['description']
  profileImage?: File
  visible?: SharePage['visible']
}

/**
 * @description 페이지 내 블록 위치 / 형태 수정
 * @see https://www.notion.so/954491d9c292452c8fb13fe95280c3d7
 */
export async function fetchLayout(
  pageId: string,
  blocks: FetchLayoutBlocksParam[]
): Promise<ResponseBase<FetchLayoutResponse>> {
  const { data } = await backAuthAPI<FetchLayoutResponse>(`/v1/page/${pageId}/blocks`, {
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
export interface FetchLayoutBlocksParam {
  blockId: string // blockId
  blockType: BlockType // BlockType
  x: number
  y: number
  w: number
  h: number
}
interface FetchLayoutResponse {
  status: number
  success: boolean
  response: boolean
}

function convertBodyToForm<T>(body: T) {
  type TKey = keyof T
  const form = new FormData()
  for (const key in body) {
    const value = body[key as TKey]
    if (typeof value === 'string') {
      form.append(key, value)
    } else if (value instanceof Blob) {
      form.append(key, value, 'image.png')
    } else {
      form.append(key, String(value))
    }
  }
  return form
}
