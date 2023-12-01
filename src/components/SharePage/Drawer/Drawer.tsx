import { Drawer as AntdDrawer } from 'antd'
import { useEffect, useState } from 'react'
import { DrawerCreateForm } from '@/components/Common/SwitchCases/DrawerCreateForm'
import { DrawerEditForm } from '@/components/Common/SwitchCases/DrawerEditForm'
import { BlockFormBase } from '@/components/SharePage/Drawer/BlockFormBase'
import { PAGE, TEMPLATE } from '@/constants/blockTypeConstant'
import { BLOCK_TO } from '@/constants/drawerConstant'
import { type BlockType } from '@/models/space'
import { useSharePageQuery } from '@/queries/useSharePageQuery'
import { useBlockActionStore } from '@/store/blockAction'

export function Drawer() {
  const { openDrawer, setOpenDrawer, drawerMode, blockType } = useBlockActionStore()
  const { sharePage } = useSharePageQuery()
  const { activeBlockId } = useBlockActionStore()
  const [title, setTitle] = useState('')

  const block = sharePage.children.find((item) => item.objectId === activeBlockId)

  useEffect(() => {
    setTitle(getDrawerTitle(drawerMode, blockType))
  }, [drawerMode, blockType])

  return (
    <AntdDrawer
      title={title}
      placement="right"
      bodyStyle={{ padding: '0' }}
      width={500}
      onClose={() => setOpenDrawer(false)}
      open={openDrawer}
    >
      <BlockFormBase>
        {drawerMode === 'create' && <DrawerCreateForm blockType={blockType} />}
        {drawerMode === 'EDIT' && block && <DrawerEditForm block={block} mode={drawerMode} />}
      </BlockFormBase>
    </AntdDrawer>
  )
}

function getDrawerTitle(drawerMode: DrawerMode, blockType: BlockType) {
  const postfix = drawerMode === 'EDIT' ? '정보 수정' : '추가하기'
  if (blockType === PAGE || blockType === TEMPLATE) return `${BLOCK_TO.KR[blockType]} ${postfix}`
  return `블럭 ${postfix}`
}
