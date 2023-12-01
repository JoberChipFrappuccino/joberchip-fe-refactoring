import { useMutation, type QueryClient } from '@tanstack/react-query'
import { addGoogleMapBlockAPI, editGoogleMapBlockAPI } from '@/apis/blocks'
import { deleteBlockAPI, deletePageAPI } from '@/apis/delete'
import { IMAGE, LINK, MAP, PAGE, TEMPLATE, TEXT, VIDEO } from '@/constants/blockTypeConstant'
import { type BlockBase, type BlockType, type BlockItem, type SharePage } from '@/models/space'

interface AddBlockMutationFnParams {
  pageId: string | undefined
  newBlock: Partial<BlockItem>
}
export const addBlockMutation = (queryClient: QueryClient) => {
  const mutation = useMutation({
    mutationFn: ({ pageId, newBlock }: AddBlockMutationFnParams) => {
      if (newBlock.type === 'MAP') {
        return addGoogleMapBlockAPI(pageId, newBlock)
      }
      return addGoogleMapBlockAPI(pageId, newBlock)
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

interface DeleteBlockMutationFnParams {
  pageId: string | undefined
  block: BlockBase<BlockType>
}
export const deleteBlockMutation = (queryClient: QueryClient) => {
  const mutation = useMutation({
    mutationFn: ({ pageId, block }: DeleteBlockMutationFnParams) => {
      return switchDeleteAPIByBlockType(pageId, block)
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

// HACK : 파라메터 상수로 변경 필요
function switchDeleteAPIByBlockType(pageId: string | undefined, block: BlockBase<BlockType>) {
  if (!pageId) throw new Error("Can't find pageId")
  switch (block.type) {
    case TEXT:
      return deleteBlock('textBlock', block.objectId, pageId)
    case IMAGE:
      return deleteBlock('imageBlock', block.objectId, pageId)
    case LINK:
      return deleteBlock('linkBlock', block.objectId, pageId)
    case PAGE:
      return deleteBlock('pageBlock', block.objectId, pageId)
    case VIDEO:
      return deleteBlock('videoBlock', block.objectId, pageId)
    case MAP:
      return deleteBlock('mapBlock', block.objectId, pageId)
    case TEMPLATE:
      return deleteBlock('templateBlock', block.objectId, pageId)
    default:
      throw new Error("Can't find block type")
  }
}

function deleteBlock(deleteBlockName: string, blockId: string, pageId: string) {
  if (deleteBlockName === 'pageBlock') {
    return deletePageAPI(blockId)
  }
  return deleteBlockAPI(pageId, deleteBlockName, blockId)
}
