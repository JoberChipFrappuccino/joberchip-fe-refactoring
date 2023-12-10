import type { SharePage } from '@/models/space'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteBlockAPI } from '@/apis/blocks'
import { deletePageAPI } from '@/apis/page'
import { SHARE_PAGE } from '@/constants/querykey'
import { type BlockBase, type BlockType, type blockAPIType } from '@/models/block'

type TblockAPIType = Record<BlockType, blockAPIType>
const BLOCK_API_TYPE: TblockAPIType = {
  TEXT: 'textBlock',
  LINK: 'linkBlock',
  MAP: 'mapBlock',
  VIDEO: 'videoBlock',
  PAGE: 'pageBlock',
  TEMPLATE: 'templateBlock',
  IMAGE: 'imageBlock',
  BLOCK: 'baseBlock'
}

interface DeleteBlockMutationFnParams {
  pageId: string | undefined
  block: BlockBase<BlockType>
}
export const useDeleteBlockMutation = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: ({ pageId, block }: DeleteBlockMutationFnParams) => {
      const type = BLOCK_API_TYPE[block.type]
      const blockId = block.objectId
      if (type === 'pageBlock') return deletePageAPI(blockId)
      return deleteBlockAPI(pageId, type, blockId)
    },
    onSuccess: (_data, { pageId, block }) => {
      queryClient.setQueryData<SharePage>([SHARE_PAGE, pageId], (oldData) => {
        if (!oldData) throw new Error('oldData is undefined')
        const newChildren = oldData.children.filter((item) => item.objectId !== block.objectId)
        return { ...oldData, children: [...newChildren] }
      })
    }
  })
  return mutation
}
