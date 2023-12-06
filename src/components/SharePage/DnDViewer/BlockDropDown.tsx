import { BsThreeDotsVertical } from '@react-icons/all-files/bs/BsThreeDotsVertical'
import { Switch } from 'antd'
import { useMemo } from 'react'
import { DropDownMenu } from '@/components/SharePage/DropDownMenu'
import { DROPDOWN_TRIGGER_ICON_ID } from '@/constants'
import { BLOCK, PAGE, TEMPLATE, BLOCK_TO } from '@/constants/block'
import { type BlockBase, type BlockType, type BlockWith } from '@/models/block'
import { useSharePageQuery } from '@/queries/useSharePageQuery'
import { useBlockActionStore } from '@/store/blockAction'
import { clip } from '@/utils'
import { editBlockAPIByType, getUniqueDivier } from '@/utils/SharePage'
import styles from './BlockDropDown.module.scss'

interface BlockDropDownProps {
  block: BlockBase<BlockType>
  onDelete: (pageId: string | undefined, block: BlockBase<BlockType>) => void
}
export default function BlockDropDown({ block, onDelete }: BlockDropDownProps) {
  const { activeBlockId } = useBlockActionStore()
  const { pageId } = useSharePageQuery()
  const { setOpenDrawer, setFormType, setDrawerMode, setBlockType } = useBlockActionStore()

  const items = useMemo(() => {
    const publickSwitchItem = [
      {
        key: `${block.objectId}-view-block-1`,
        label: (
          <Switch
            className={styles.switchBtn}
            defaultChecked={block.visible}
            onChange={() => {
              editBlockAPIByType(pageId, block)
            }}
          />
        ),
        icon: '공개 설정'
      },
      getUniqueDivier(),
      {
        key: `${block.objectId}-view-block-2`,
        label: (
          <button
            className={styles.kebobBtn}
            onClick={() => {
              setDrawerMode('EDIT')
              setBlockType(block.type)
              if (block.type === TEMPLATE || block.type === PAGE) {
                setFormType(block.type)
              } else {
                setFormType(BLOCK)
              }
              setOpenDrawer(true)
            }}
          >
            {`${BLOCK_TO.KR[block.type]} 정보 수정`}
          </button>
        )
      }
    ]

    const TemplateSwitchItem = [
      getUniqueDivier(),
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

    const deleteItem = [
      getUniqueDivier(),
      {
        key: `${block.objectId}-view-block-5`,
        danger: true,
        label: <p className={styles.delBtn}>삭제하기</p>,
        onClick: () => {
          onDelete(pageId, block)
        }
      }
    ]

    if (block.type === 'TEMPLATE') {
      return [...publickSwitchItem, ...TemplateSwitchItem, ...deleteItem]
    }
    return [...publickSwitchItem, ...deleteItem]
  }, [])

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
