import type { AddImageBlockBody, EditImageBlockBody } from '@/apis/blocks/imageBlock'
import type { ImageBlock } from '@/models/block'
import type { SharePage } from '@/models/space'
import { type QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import { addImageBlockAPI, deleteImageBlockAPI, editImageBlockAPI } from '@/apis/blocks/imageBlock'
import { SHARE_PAGE } from '@/constants/querykey'

export const useAddImageBlockMutation = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: ({ pageId, body }: { pageId: string | undefined; body: AddImageBlockBody }) => {
      return addImageBlockAPI(pageId, body)
    },

    onSuccess: (data, { pageId }) => {
      const { data: block } = data
      queryClient.setQueryData<SharePage>([SHARE_PAGE, pageId], (oldData) => {
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

export const useEditImageBlockMutation = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: ({ pageId, body }: { pageId: string | undefined; body: EditImageBlockBody }) => {
      return editImageBlockAPI(pageId, body)
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
    },
    onError: (_err, _newBlock, context) => {
      // queryClient.setQueryData([SHARE_PAGE, _newBlock], context)
    }
  })
  return mutation
}

export const deleteImageBlockMutate = (queryClient: QueryClient) => {
  const mutation = useMutation({
    mutationFn: ({ pageId, objectId }: { pageId: string | undefined; objectId: ImageBlock['objectId'] }) => {
      return deleteImageBlockAPI(pageId, objectId)
    },
    onSuccess: (_data, { pageId, objectId }) => {
      queryClient.setQueryData<SharePage>([SHARE_PAGE, pageId], (oldData) => {
        if (!oldData) throw new Error('oldData is undefined')
        const newChildren = oldData.children.filter((item) => item.objectId !== objectId)
        return { ...oldData, children: [...newChildren] }
      })
    },
    onError: (_err, _newBlock, context) => {
      // queryClient.setQueryData([SHARE_PAGE, _newBlock], context)
    }
  })
  return mutation
}
