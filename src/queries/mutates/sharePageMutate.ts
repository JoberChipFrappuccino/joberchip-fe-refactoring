import { useMutation, type QueryClient } from '@tanstack/react-query'
import { type Layout } from 'react-grid-layout'
import { type FetchLayoutBlocksParam, fetchLayout } from '@/apis/space'
import { type SharePage } from '@/models/space'
interface MutationFnParams {
  pageId: string
  blockLayout: FetchLayoutBlocksParam[]
}

export const layoutChangeMutation = (queryClient: QueryClient) => {
  const mutation = useMutation({
    mutationFn: ({ pageId, blockLayout }: MutationFnParams) => {
      return fetchLayout(pageId, blockLayout)
    },
    onMutate: ({ pageId, blockLayout }) => {
      /**
       * @description refetch 되는 것을 막기 위해 캐시를 지웁니다.
       * @see https://tanstack.com/query/v4/docs/react/guides/optimistic-updates
       */
      queryClient.cancelQueries(['sharePage', pageId], { exact: true })

      // Snapshot the previous value
      const previousSharePage = queryClient.getQueryData<SharePage>(['sharePage', pageId])
      const layout: Layout[] = blockLayout.map((item) => ({ ...item, i: item.blockId }))
      if (typeof previousSharePage === 'undefined') throw new Error('previousSharePage is undefined')
      return { ...previousSharePage, children: updateBlockPosition(layout, previousSharePage.children) }
    }
    // onError: (err, newTodo, context) => {
    //     queryClient.setQueryData(['todos'], context.previousTodos)
    //   },
  })

  return mutation
}

function updateBlockPosition(changedLayout: Layout[], blocks: SharePage['children']) {
  changedLayout.forEach((item) => {
    const block = blocks.find((block) => block.objectId === item.i)
    if (!block) return block
    block.x = item.x
    block.y = item.y
    block.w = item.w
    block.h = item.h
    return block
  })
  return blocks
}
