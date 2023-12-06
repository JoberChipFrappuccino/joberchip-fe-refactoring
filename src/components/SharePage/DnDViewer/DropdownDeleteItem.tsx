import { type BlockBase, type BlockType } from '@/models/block'
import { useDeleteBlockMutation } from '@/queries/mutates/sharePageMutation'
import { useBlockActionStore } from '@/store/blockAction'
import { toast } from '@/utils'
import styles from './DropdownDeleteItem.module.scss'

interface DropDownDeleteItemProps {
  pageId: string | undefined
  block: BlockBase<BlockType>
}
export const DropdownDeleteItem = ({ pageId, block }: DropDownDeleteItemProps) => {
  const { setActiveBlockId } = useBlockActionStore()
  const deleteMutation = useDeleteBlockMutation()

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
