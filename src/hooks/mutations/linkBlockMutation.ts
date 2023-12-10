import type { SharePage } from '@/models/space'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type AddLinkBlockBody, type EditLinkBlockBody } from '@/apis/blocks/linkBlock'
import { addLinkBlockAPI, editLinkBlockAPI } from '@/apis/blocks/linkBlock'
import { SHARE_PAGE } from '@/constants/querykey'

export const useAddLinkBlockMutate = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: ({ pageId, body }: { pageId: string | undefined; body: AddLinkBlockBody }) => {
      return addLinkBlockAPI(pageId, body)
    },

    onSuccess: (data, { pageId }) => {
      const { data: block } = data
      queryClient.setQueryData<SharePage>([SHARE_PAGE, pageId], (oldData) => {
        if (!oldData) throw new Error('해당 페이지에 대한 정보가 없습니다.')
        return { ...oldData, children: [...oldData.children, block] }
      })
    }
  })
  return mutation
}

export const useEditLinkBlockMutate = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: ({ pageId, body }: { pageId: string | undefined; body: EditLinkBlockBody }) => {
      return editLinkBlockAPI(pageId, body)
    },
    onSuccess: (data, { pageId }) => {
      const { data: block } = data
      queryClient.setQueryData<SharePage>([SHARE_PAGE, pageId], (oldData) => {
        if (!oldData) throw new Error('해당 페이지에 대한 정보가 없습니다.')
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
