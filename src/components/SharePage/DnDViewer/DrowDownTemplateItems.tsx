import { type BlockWith, type BlockBase, type BlockType } from '@/models/block'
import { clip } from '@/utils'
import { getUniqueDivier } from '@/utils/SharePage'
import styles from './DropdownTemplateItems.module.scss'

interface BlockDropDownProps {
  block: BlockBase<BlockType>
}
export const DropdownTemplateItems = ({ block }: BlockDropDownProps) => {
  return [
    {
      key: `${block.objectId}-view-block-3`,
      label: (
        <button className={styles.kebobBtn} onClick={() => clip((block as BlockWith<TTemplate>).url)}>
          링크 복사
        </button>
      )
    },
    getUniqueDivier(),
    {
      key: `${block.objectId}-view-block-4`,
      label: <button className={styles.kebobBtn}>템플릿 상세 설정</button>
    }
  ]
}
