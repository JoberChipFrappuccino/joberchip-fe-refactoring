import type { SharePage } from '@/models/space'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  type RequestTextBlockAddData,
  addTextBlockAPI,
  editTextBlockAPI,
  type RequestTextBlockEditData
} from '@/apis/blocks/draftTextBlock'
import { SHARE_PAGE } from '@/constants/querykey'

export const useAddTextBlockMutation = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: ({ pageId, block }: { pageId: string | undefined; block: RequestTextBlockAddData }) => {
      return addTextBlockAPI(pageId, block)
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

export const useEditTextBlockMutation = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: ({ pageId, block }: { pageId: string | undefined; block: RequestTextBlockEditData }) => {
      return editTextBlockAPI(pageId, block)
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
