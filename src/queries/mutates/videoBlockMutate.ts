import type { EditVideoBlockBody, AddVideoBlockBody } from '@/apis/blocks/videoBlock'
import type { SharePage, VideoBlock } from '@/models/space'
import { type QueryClient, useMutation } from '@tanstack/react-query'
import { deleteImageBlockAPI } from '@/apis/blocks/imageBlock'
import { addVideoBlockAPI, editVideoBlockAPI } from '@/apis/blocks/videoBlock'

export const addVideoBlockMutate = (queryClient: QueryClient) => {
  const mutation = useMutation({
    mutationFn: ({ pageId, body }: { pageId: string | undefined; body: AddVideoBlockBody }) => {
      return addVideoBlockAPI(pageId, body)
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

export const editVideoBlockMutate = (queryClient: QueryClient) => {
  const mutation = useMutation({
    mutationFn: ({ pageId, body }: { pageId: string | undefined; body: EditVideoBlockBody }) => {
      return editVideoBlockAPI(pageId, body)
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

export const deleteVideoBlockMutate = (queryClient: QueryClient) => {
  const mutation = useMutation({
    mutationFn: ({ pageId, objectId }: { pageId: string | undefined; objectId: VideoBlock['objectId'] }) => {
      return deleteImageBlockAPI(pageId, objectId)
    },
    onSuccess: (_data, { pageId, objectId }) => {
      queryClient.setQueryData<SharePage>(['sharePage', pageId], (oldData) => {
        if (!oldData) throw new Error('oldData is undefined')
        const newChildren = oldData.children.filter((item) => item.objectId !== objectId)
        return { ...oldData, children: [...newChildren] }
      })
    },
    onError: (_err, _newBlock, context) => {
      // queryClient.setQueryData(['sharePage', _newBlock], context)
    }
  })
  return mutation
}
