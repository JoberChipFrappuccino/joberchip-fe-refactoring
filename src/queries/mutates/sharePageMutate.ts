import { useMutation, type QueryClient } from '@tanstack/react-query'
import { type blockAPIType, editGoogleMapBlockAPI, addBlockAPI } from '@/apis/blocks'
import { deleteBlockAPI, deletePageAPI } from '@/apis/delete'
import { type BlockBase, type BlockType, type BlockItem, type SharePage } from '@/models/space'

interface AddBlockMutationFnParams {
  pageId: string | undefined
  blockType: blockAPIType
  newBlock: Partial<BlockItem>
}
export const addBlockMutation = (queryClient: QueryClient) => {
  const mutation = useMutation({
    mutationFn: ({ pageId, blockType, newBlock }: AddBlockMutationFnParams) => {
      return addBlockAPI(pageId, blockType, newBlock)
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

interface EditBlockMutationFnParams {
  pageId: string | undefined
  blockId: string
  body: Partial<BlockItem>
}
export const editBlockMutation = (queryClient: QueryClient) => {
  const mutation = useMutation({
    mutationFn: ({ pageId, blockId, body }: EditBlockMutationFnParams) => {
      if (body.type === 'MAP') {
        return editGoogleMapBlockAPI(pageId, blockId, body)
      }
      return editGoogleMapBlockAPI(pageId, blockId, body)
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
