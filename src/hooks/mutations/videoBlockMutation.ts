import type { EditVideoBlockBody, AddVideoBlockBody } from '@/apis/blocks/videoBlock'
import type { SharePage } from '@/models/space'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addVideoBlockAPI, editVideoBlockAPI } from '@/apis/blocks/videoBlock'
import { SHARE_PAGE } from '@/constants/querykey'

export const useAddVideoBlockMutation = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: ({ pageId, body }: { pageId: string | undefined; body: AddVideoBlockBody }) => {
      return addVideoBlockAPI(pageId, body)
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

export const useEditVideoBlockMutation = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: ({ pageId, body }: { pageId: string | undefined; body: EditVideoBlockBody }) => {
      return editVideoBlockAPI(pageId, body)
    },
    onSuccess: (data, { pageId }) => {
      const { data: block } = data
      queryClient.setQueryData<SharePage>([SHARE_PAGE, pageId], (oldData) => {
        if (!oldData) throw new Error('oldData is undefined')
        const newChildren = oldData.children.map((item) => {
          if (item.objectId === block.objectId) return block
          return item
        })
        return { ...oldData, children: [...newChildren] }
      })
    }
  })
  return mutation
}
