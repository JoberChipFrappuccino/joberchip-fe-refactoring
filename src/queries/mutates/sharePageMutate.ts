import type { SharePage } from '@/models/space'
import { useMutation, type QueryClient } from '@tanstack/react-query'
import { deleteBlockAPI } from '@/apis/blocks'
import { deletePageAPI } from '@/apis/page/page'
import { type BlockBase, type BlockType, type blockAPIType } from '@/models/block'

// TODO : 이거 어떻게 해결할지 고민해보기
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
export const deleteBlockMutation = (queryClient: QueryClient) => {
  const mutation = useMutation({
    mutationFn: ({ pageId, block }: DeleteBlockMutationFnParams) => {
      const type = BLOCK_API_TYPE[block.type]
      const blockId = block.objectId
      if (type === 'pageBlock') return deletePageAPI(blockId)
      return deleteBlockAPI(pageId, type, blockId)
    },
    onSuccess: (_data, { pageId, block }) => {
      queryClient.setQueryData<SharePage>(['sharePage', pageId], (oldData) => {
        if (!oldData) throw new Error('oldData is undefined')
        const newChildren = oldData.children.filter((item) => item.objectId !== block.objectId)
        return { ...oldData, children: [...newChildren] }
      })
    },
    onError: (_err, _newBlock, context) => {
      // queryClient.setQueryData(['sharePage', _newBlock], context)
    }
  })
  return mutation
}
