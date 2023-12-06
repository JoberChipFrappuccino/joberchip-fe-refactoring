import type { AddGoogleMapBlockBody, EditGoogleMapBlockBody } from '@/apis/blocks/mapBlock'
import type { SharePage } from '@/models/space'
import { type QueryClient, useMutation } from '@tanstack/react-query'
import { addGoogleMapBlockAPI, editGoogleMapBlockAPI, deleteMapBlockAPI } from '@/apis/blocks/mapBlock'
import { SHARE_PAGE } from '@/constants/querykey'
import { type EmbedGoogleMapBlock } from '@/models/block'

export const useAddMapBlockMutation = (queryClient: QueryClient) => {
  const mutation = useMutation({
    mutationFn: ({ pageId, newBlock }: { pageId: string | undefined; newBlock: AddGoogleMapBlockBody }) => {
      return addGoogleMapBlockAPI(pageId, newBlock)
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

export const useEditMapBlockMutation = (queryClient: QueryClient) => {
  const mutation = useMutation({
    mutationFn: ({ pageId, editBlock }: { pageId: string | undefined; editBlock: EditGoogleMapBlockBody }) => {
      return editGoogleMapBlockAPI(pageId, editBlock)
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

interface DeleteMapBlockParams {
  pageId: string | undefined
  objectId: EmbedGoogleMapBlock['objectId']
}
export const deleteMapBlockMutate = (queryClient: QueryClient) => {
  const mutation = useMutation({
    mutationFn: ({ pageId, objectId }: DeleteMapBlockParams) => {
      return deleteMapBlockAPI(pageId, objectId)
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
