import type { SharePage } from '@/models/space'
import { type QueryClient, useMutation } from '@tanstack/react-query'
import { type AddTemplateBlockAPIBody, addTemplateBlockAPI } from '@/apis/blocks/templateBlock'

export const addTemplateBlockMutate = (queryClient: QueryClient) => {
  const mutation = useMutation({
    mutationFn: ({ pageId, body }: { pageId: string | undefined; body: AddTemplateBlockAPIBody }) => {
      return addTemplateBlockAPI(pageId, body)
    },

    onSuccess: (data, { pageId }) => {
      const { data: block } = data
      queryClient.setQueryData<SharePage>(['sharePage', pageId], (oldData) => {
        if (!oldData) throw new Error('oldData is undefined')
        return { ...oldData, children: [...oldData.children, block] }
      })
    },

    onError: (_err, _newBlock, context) => {
      // queryClient.setQueryData(['todos'], context)
    }
  })
  return mutation
}
