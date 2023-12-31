import { type QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import { type AddGoogleMapBlockBody, type EditGoogleMapBlockBody } from '@/apis/blocks/mapBlock'
import { addGoogleMapBlockAPI, editGoogleMapBlockAPI, deleteMapBlockAPI } from '@/apis/blocks/mapBlock'
import { SHARE_PAGE } from '@/constants/querykey'
import { type EmbedGoogleMapBlock } from '@/models/block'
import { type SharePage } from '@/models/space'

export const useAddMapBlockMutation = () => {
  const queryClient = useQueryClient()
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
    }
  })
  return mutation
}

export const useEditMapBlockMutation = () => {
  const queryClient = useQueryClient()
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
    }
  })
  return mutation
}
