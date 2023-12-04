import type { AddGoogleMapBlockBody, EditGoogleMapBlockBody } from '@/apis/blocks/mapBlock'
import type { SharePage } from '@/models/space'
import { type QueryClient, useMutation } from '@tanstack/react-query'
import { editGoogleMapBlockAPI } from '@/apis/blocks/mapBlock'
import { createPageAPI } from '@/apis/page/page'

export const createPageBlockMutate = (queryClient: QueryClient) => {
  const mutation = useMutation({
    mutationFn: ({ pageId, newBlock }: { pageId: string | undefined; newBlock: AddGoogleMapBlockBody }) => {
      return createPageAPI(pageId, newBlock)
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

export const editPageBlockMutate = (queryClient: QueryClient) => {
  const mutation = useMutation({
    mutationFn: ({ pageId, editBlock }: { pageId: string | undefined; editBlock: EditGoogleMapBlockBody }) => {
      return editGoogleMapBlockAPI(pageId, editBlock)
    },
    onSuccess: (data, { pageId }) => {
      const { data: block } = data
      queryClient.setQueryData<SharePage>(['sharePage', pageId], (oldData) => {
        if (!oldData) throw new Error('oldData is undefined')
        const newChildren = oldData.children.map((item) => {
          if (item.objectId === block.objectId) return block
          return item
        })
        return { ...oldData, children: [...newChildren] }
      })
    },
    onError: (_err, _newBlock, context) => {
      // queryClient.setQueryData(['sharePage', _newBlock], context)
    }
  })
  return mutation
}
