import type { SharePage } from '@/models/space'
import { type QueryClient, useMutation } from '@tanstack/react-query'
import {
  type AddLinkBlockBody,
  addLinkBlockAPI,
  type EditLinkBlockBody,
  editLinkBlockAPI
} from '@/apis/blocks/linkBlock'

export const addLinkBlockMutate = (queryClient: QueryClient) => {
  const mutation = useMutation({
    mutationFn: ({ pageId, body }: { pageId: string | undefined; body: AddLinkBlockBody }) => {
      return addLinkBlockAPI(pageId, body)
    },

    onSuccess: (data, { pageId }) => {
      const { data: block } = data
      queryClient.setQueryData<SharePage>(['sharePage', pageId], (oldData) => {
        if (!oldData) throw new Error('해당 페이지에 대한 정보가 없습니다.')
        return { ...oldData, children: [...oldData.children, block] }
      })
    },

    onError: (_err, _newBlock, context) => {
      // queryClient.setQueryData(['todos'], context)
    }
  })
  return mutation
}

export const editLinkBlockMutate = (queryClient: QueryClient) => {
  const mutation = useMutation({
    mutationFn: ({ pageId, body }: { pageId: string | undefined; body: EditLinkBlockBody }) => {
      return editLinkBlockAPI(pageId, body)
    },
    onSuccess: (data, { pageId }) => {
      const { data: block } = data
      queryClient.setQueryData<SharePage>(['sharePage', pageId], (oldData) => {
        if (!oldData) throw new Error('해당 페이지에 대한 정보가 없습니다.')
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

// export const deleteImageBlockMutate = (queryClient: QueryClient) => {
//   const mutation = useMutation({
//     mutationFn: ({ pageId, objectId }: { pageId: string | undefined; objectId: EmbedGoogleMapBlock['objectId'] }) => {
//       return deleteImageBlockAPI(pageId, objectId)
//     },
//     onSuccess: (_data, { pageId, objectId }) => {
//       queryClient.setQueryData<SharePage>(['sharePage', pageId], (oldData) => {
//         if (!oldData) throw new Error('해당 페이지에 대한 정보가 없습니다.')
//         const newChildren = oldData.children.filter((item) => item.objectId !== objectId)
//         return { ...oldData, children: [...newChildren] }
//       })
//     },
//     onError: (_err, _newBlock, context) => {
//       // queryClient.setQueryData(['sharePage', _newBlock], context)
//     }
//   })
//   return mutation
// }
