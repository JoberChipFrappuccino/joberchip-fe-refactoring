import { type QueryClient, useMutation } from '@tanstack/react-query'
import { type CreatePageAPIBody, createPageAPI } from '@/apis/page/page'
import { BREAD_CRUMB, SHARE_PAGE, TREE } from '@/constants/querykey'

export const createPageBlockMutate = (queryClient: QueryClient) => {
  const mutation = useMutation({
    mutationFn: ({ body }: { body: CreatePageAPIBody }) => {
      return createPageAPI(body)
    },

    onSuccess: () => {
      queryClient.invalidateQueries([SHARE_PAGE])
      queryClient.invalidateQueries([BREAD_CRUMB])
      queryClient.invalidateQueries([TREE])
    },

    onError: (_err, _newBlock, context) => {
      // queryClient.setQueryData(['todos'], context)
    }
  })
  return mutation
}

// export const editPageBlockMutate = (queryClient: QueryClient) => {
//   const mutation = useMutation({
//     mutationFn: ({ pageId, editBlock }: { pageId: string | undefined; editBlock: EditGoogleMapBlockBody }) => {
//       return editGoogleMapBlockAPI(pageId, editBlock)
//     },
//     onSuccess: (data, { pageId }) => {
//       const { data: block } = data
//       queryClient.setQueryData<SharePage>([SHARE_PAGE, pageId], (oldData) => {
//         if (!oldData) throw new Error('oldData is undefined')
//         const newChildren = oldData.children.map((item) => {
//           if (item.objectId === block.objectId) return block
//           return item
//         })
//         return { ...oldData, children: [...newChildren] }
//       })
//     },
//     onError: (_err, _newBlock, context) => {
//       // queryClient.setQueryData([SHARE_PAGE, _newBlock], context)
//     }
//   })
//   return mutation
// }
