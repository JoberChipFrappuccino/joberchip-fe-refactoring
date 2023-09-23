import { type BlockWith } from '@/models/space'
import { authAPI } from './api'

export const getTemplates = async (userId: string): Promise<Array<BlockWith<'template'>>> => {
  const { data } = await authAPI<Array<BlockWith<'template'>>>('/api/template', {
    method: 'GET',
    params: {
      id: userId
    }
  })
  return data
}
