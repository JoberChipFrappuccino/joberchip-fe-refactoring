import type { SharePage } from '@/models/space'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type AddTemplateBlockAPIBody, addTemplateBlockAPI } from '@/apis/blocks/templateBlock'
import { SHARE_PAGE } from '@/constants/querykey'

export const useAddTemplateBlockMutation = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: ({ pageId, body }: { pageId: string | undefined; body: AddTemplateBlockAPIBody }) => {
      return addTemplateBlockAPI(pageId, body)
    },

    onSuccess: (data, { pageId }) => {
      const { data: block } = data
      queryClient.setQueryData<SharePage>([SHARE_PAGE, pageId], (oldData) => {
        if (!oldData) throw new Error('oldData is undefined')
        return { ...oldData, children: [...oldData.children, block] }
      })
    }
  })
  return mutation
}
