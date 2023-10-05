/**
 * @description 트리 조회 API
 * @see https://www.notion.so/2-cdf1976fd3e641dd84bd77df574fb471?p=559b36ae88944c739ffef14d869e4637&pm=s
 */

import { type Tree } from '@/models/tree'
import { type ResponseBase } from '@/utils/api'
import { backAuthAPI } from './api'

export const fetchTreeAPI = async (spaceId: string): Promise<ResponseBase<Tree>> => {
  const { data } = await backAuthAPI<{
    status: number
    success: boolean
    response: Tree
  }>(`/v1/page/tree?spaceId=${spaceId}`, {
    method: 'GET'
  })
  return {
    data: data.response,
    status: 'success',
    message: '트리정보를 불러왔습니다.'
  }
}
