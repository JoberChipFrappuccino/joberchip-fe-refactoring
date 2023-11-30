import { Drawer as AntdDrawer } from 'antd'
import { useEffect, useState, type ReactNode } from 'react'
import { DrawerCreateForm } from '@/components/Common/SwitchCases/DrawerCreateForm'
import { DrawerEditForm } from '@/components/Common/SwitchCases/DrawerEditForm'
import { ActionBlockFormBase } from '@/components/SharePage/ActionBlockFormBase'
import { PAGE, TEMPLATE } from '@/constants/blockTypeConstant'
import { BLOCK_TYPE_TO_KOR } from '@/constants/drawerConstant'
import { type BlockType } from '@/models/space'
import { useBlockActionStore } from '@/store/blockAction'
import { useSharePage } from '@/hooks/useSharePageManager'

export function Drawer() {
  const { openDrawer, setOpenDrawer, drawerMode, blockType } = useBlockActionStore()
  const { sharePage } = useSharePage()
  const { activeBlockId } = useBlockActionStore()
  const [title, setTitle] = useState('')

  const block = sharePage.children.find((item) => item.objectId === activeBlockId)

  let BaseComponent = ActionBlockFormBase

  if (blockType === PAGE || blockType === TEMPLATE) {
    // eslint-disable-next-line react/display-name, react/jsx-no-useless-fragment
    BaseComponent = ({ children }: { children: ReactNode }) => <>{children}</>
  }

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
      <BaseComponent>
        {drawerMode === 'create' && <DrawerCreateForm blockType={blockType} />}
        {drawerMode === 'EDIT' && block && <DrawerEditForm block={block} mode={drawerMode} />}
      </BaseComponent>
    </AntdDrawer>
  )
}

function getDrawerTitle(drawerMode: DrawerMode, blockType: BlockType) {
  const postfix = drawerMode === 'EDIT' ? '정보 수정' : '추가하기'
  if (blockType === PAGE || blockType === TEMPLATE) return `${BLOCK_TYPE_TO_KOR[blockType]} ${postfix}`
  return `블럭 ${postfix}`
}
