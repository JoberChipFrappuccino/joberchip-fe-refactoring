import { useQueryClient } from '@tanstack/react-query'
import { Switch } from 'antd'
import { BLOCK, BLOCK_TO, PAGE, TEMPLATE } from '@/constants/block'
import { SHARE_PAGE } from '@/constants/querykey'
import { type BlockBase, type BlockType } from '@/models/block'
import { useBlockActionStore } from '@/store/blockAction'
import { to } from '@/utils'
import { editBlockAPIByType, getUniqueDivier } from '@/utils/SharePage'
import styles from './DropdownPublicItems.module.scss'

interface BlockDropDownProps {
  pageId: string | undefined
  block: BlockBase<BlockType>
}
export const DropdownPublicItems = ({ pageId, block }: BlockDropDownProps) => {
  const { setOpenDrawer, setFormType, setDrawerMode, setBlockType } = useBlockActionStore()
  const queryClient = useQueryClient()
  return [
    {
      key: `${block.objectId}-view-block-1`,
      label: (
        <Switch
          className={styles.switchBtn}
          defaultChecked={block.visible}
          onChange={() => {
            to(editBlockAPIByType(pageId, block)).then((res) => {
              if (res.status === 'success') queryClient.invalidateQueries([SHARE_PAGE, pageId])
            })
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
}
