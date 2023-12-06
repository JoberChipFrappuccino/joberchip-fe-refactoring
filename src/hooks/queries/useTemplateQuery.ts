import { useQuery } from '@tanstack/react-query'
import { getTemplatesAPI } from '@/apis/blocks/templateBlock'

export const useTemplateQuery = (userId: string) => {
  const { data } = useQuery(['template', userId], () => getTemplatesAPI(userId))
  return { templates: data }
}
