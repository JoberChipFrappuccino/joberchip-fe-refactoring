import { useQueryClient } from '@tanstack/react-query'
import { type BlockBase, type BlockType } from '@/models/block'
import { deleteBlockMutation } from '@/queries/mutates/sharePageMutate'
import { useBlockActionStore } from '@/store/blockAction'
import { toast } from '@/utils'
import styles from './DropdownDeleteItem.module.scss'

interface DropDownDeleteItemProps {
  pageId: string | undefined
  block: BlockBase<BlockType>
}
export const DropdownDeleteItem = ({ pageId, block }: DropDownDeleteItemProps) => {
  const { setActiveBlockId } = useBlockActionStore()
  const queryClient = useQueryClient()
  const deleteMutation = deleteBlockMutation(queryClient)

  const deleteBlock = () => {
    deleteMutation.mutate({ pageId, block })
    setActiveBlockId('')
    toast('블록이 삭제되었습니다.', 'success')
  }

  return [
    {
      key: `${block.objectId}-view-block-5`,
      danger: true,
      label: <p className={styles.delBtn}>삭제하기</p>,
      onClick: deleteBlock
    }
  ]
}