import { BsThreeDotsVertical } from '@react-icons/all-files/bs/BsThreeDotsVertical'
import { DropDownMenu } from '@/components/SharePage/DropDownMenu'
import { DROPDOWN_TRIGGER_ICON_ID } from '@/constants'
import { type BlockBase, type BlockType } from '@/models/block'
import { useBlockActionStore } from '@/store/blockAction'
import styles from './BlockDropDown.module.scss'
import { DropdownDeleteItem } from './DropdownDeleteItem'
import { DropdownPublicItems } from './DropdownPublicItems'
import { DropdownTemplateItems } from './DrowDownTemplateItems'

interface BlockDropDownProps {
  pageId: string | undefined
  block: BlockBase<BlockType>
}

export const BlockDropDown = ({ pageId, block }: BlockDropDownProps) => {
  const { activeBlockId } = useBlockActionStore()
  const publickSwitchItems = DropdownPublicItems({ pageId, block })
  const templateSwtichItems = DropdownTemplateItems({ block })
  const deleteItem = DropdownDeleteItem({ pageId, block })

  const items = []

  switch (block.type) {
    case 'TEMPLATE':
      items.push(...publickSwitchItems)
      items.push(...templateSwtichItems)
      items.push(...deleteItem)
      break
    default:
      items.push(...publickSwitchItems)
      items.push(...deleteItem)
      break
  }

  return (
    <DropDownMenu
      trigger="click"
      items={items}
      statefulKeys={[`${block.objectId}-view-block-1`, `${block.objectId}-view-block-5`]}
    >
      <button id={DROPDOWN_TRIGGER_ICON_ID} className={styles.iconCover}>
        <BsThreeDotsVertical
          id={DROPDOWN_TRIGGER_ICON_ID}
          className={activeBlockId === block.objectId ? styles.activeIcon : styles.inactiveIcon}
        />
      </button>
    </DropDownMenu>
  )
}
