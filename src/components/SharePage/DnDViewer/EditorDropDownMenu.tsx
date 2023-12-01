import { BsThreeDotsVertical } from '@react-icons/all-files/bs/BsThreeDotsVertical'
import { Switch } from 'antd'
import { useMemo } from 'react'
import { editGoogleMapBlockAPI, editImageBlockAPI, editLinkBlockAPI, editVideoBlockAPI } from '@/apis/blocks'
import { editPageProfileAPI } from '@/apis/space'
import { editTextBlockAPI } from '@/apis/textblock'
import { DropDownMenu } from '@/components/SharePage/DropDownMenu'
import { DROPDOWN_TRIGGER_ICON_ID } from '@/constants'
import { IMAGE, LINK, TEXT, BLOCK, MAP, PAGE, TEMPLATE, VIDEO } from '@/constants/blockTypeConstant'
import { BLOCK_TO } from '@/constants/drawerConstant'
import { type BlockBase, type BlockType, type BlockWith } from '@/models/space'
import { useSharePageQuery } from '@/queries/useSharePageQuery'
import { useBlockActionStore } from '@/store/blockAction'
import { clip, toast } from '@/utils'
import styles from './EditorDropDownMenu.module.scss'

interface EditorDropDownMenuProps {
  block: BlockBase<BlockType>
  onDelete: (pageId: string | undefined, block: BlockBase<BlockType>) => void
}
export default function EditorDropDownMenu({ block, onDelete }: EditorDropDownMenuProps) {
  const { activeBlockId } = useBlockActionStore()
  const { sharePage, pageId } = useSharePageQuery()
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
              switchToggleAPIByBlockType(pageId, block)
              for (let i = 0; i < sharePage.children.length; i++) {
                if (sharePage.children[i].objectId === block.objectId) {
                  sharePage.children[i].visible = !sharePage.children[i].visible
                  break
                }
              }
            }}
          />
        ),
        icon: '공개 설정'
      },
      getUniqueDivierItem(`${block.objectId}-ViewerBlockBase-divier-1`),
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
      getUniqueDivierItem(`${block.objectId}-ViewerBlockBase-divier-2`),
      {
        key: `${block.objectId}-view-block-3`,
        label: (
          <button className={styles.kebobBtn} onClick={() => clip((block as BlockWith<TTemplate>).url)}>
            링크 복사
          </button>
        )
      },
      getUniqueDivierItem(`${block.objectId}-ViewerBlockBase-divier-3`),
      {
        key: `${block.objectId}-view-block-4`,
        label: <button className={styles.kebobBtn}>템플릿 상세 설정</button>
      }
    ]

    const deleteItem = [
      getUniqueDivierItem(`${block.objectId}-ViewerBlockBase-divier-4`),
      {
        key: `${block.objectId}-view-block-5`,
        danger: true,
        label: <p className={styles.delBtn}>삭제하기</p>,
        onClick: () => {
          onDelete(pageId, block)
          //   setConfirmModal(true)
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

function getUniqueDivierItem(key: string) {
  return {
    key,
    type: 'divider'
  }
}

function switchToggleAPIByBlockType(pageId: string | undefined, block: BlockBase<BlockType>) {
  if (!pageId) return toast("잘못된 접근입니다. 'pageId'가 존재하지 않습니다.", 'failure')
  const form = new FormData()
  switch (block.type) {
    case TEXT:
      return editTextBlockAPI(pageId, block.objectId, { visible: !block.visible })
    case IMAGE:
      form.append('visible', String(!block.visible))
      return editImageBlockAPI(pageId, block.objectId, form)
    case LINK:
      return editLinkBlockAPI(pageId, block.objectId, { visible: !block.visible })
    case PAGE:
      form.append('visible', String(!block.visible))
      return editPageProfileAPI(pageId, form)
    case VIDEO:
      form.append('visible', String(!block.visible))
      return editVideoBlockAPI(pageId, block.objectId, form)
    case MAP:
      return editGoogleMapBlockAPI(pageId, block.objectId, { visible: !block.visible })
    case TEMPLATE:
      return toast('템플릿 공개 설정은 아직 지원하지 않습니다.', 'success')
    default:
      return toast('잘못된 입력입니다.', 'failure')
  }
}