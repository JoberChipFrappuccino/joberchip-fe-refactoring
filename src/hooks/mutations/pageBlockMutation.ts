import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type CreatePageAPIBody, createPageAPI, editPageBlockAPI, type EditPageBlockBody } from '@/apis/page'
import { BREAD_CRUMB, SHARE_PAGE, TREE } from '@/constants/querykey'

export const useCreatePageBlockMutation = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: ({ body }: { body: CreatePageAPIBody }) => {
      return createPageAPI(body)
    },

    onSuccess: () => {
      queryClient.invalidateQueries([SHARE_PAGE])
      queryClient.invalidateQueries([BREAD_CRUMB])
      queryClient.invalidateQueries([TREE])
    }
  })
  return mutation
}

export const useEditPageBlockMutation = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: ({ pageId, body }: { pageId: string | undefined; body: EditPageBlockBody }) => {
      return editPageBlockAPI(pageId, body)
    },
    onSuccess: () => {
      queryClient.invalidateQueries([SHARE_PAGE])
      queryClient.invalidateQueries([BREAD_CRUMB])
      queryClient.invalidateQueries([TREE])
    }
  })
  return mutation
}
