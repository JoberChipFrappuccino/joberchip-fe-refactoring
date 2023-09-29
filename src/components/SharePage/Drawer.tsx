import { PAGE, TEMPLATE } from '@/constants/BlockType'
import { useBlockAction } from '@/store/blockAction'
import { useSharePageStore } from '@/store/sharePage'
import { Drawer as AntdDrawer } from 'antd'
import { useEffect, useState, type ReactNode } from 'react'
import { DrawerCreateForm } from '../SwitchCase/DrawerCreateForm'
import { DrawerEditForm } from '../SwitchCase/DrawerEditForm'
import { ActionBlockFormBase } from './ActionBlockFormBase'

export function Drawer() {
  const { openDrawer, setOpenDrawer, drawerMode, blockType } = useBlockAction()
  const { sharePage } = useSharePageStore()
  const { activeBlockId } = useBlockAction()
  const [title, setTitle] = useState('')

  const block = sharePage.children.find((item) => item.objectId === activeBlockId)

  let BaseComponent = ActionBlockFormBase

  if (blockType === PAGE || blockType === TEMPLATE) {
    // * 페이지, 템플릿의 BaseComponent를 바꿔야합니다요.
    // eslint-disable-next-line react/display-name, react/jsx-no-useless-fragment
    BaseComponent = ({ children }: { children: ReactNode }) => <>{children}</>
  }

  useEffect(() => {
    let nextTitle = drawerMode === 'edit' ? ' 수정' : ' 추가'
    switch (blockType) {
      case PAGE:
        nextTitle = '페이지' + nextTitle
        break
      case TEMPLATE:
        nextTitle = '템플릿' + nextTitle
        break
      default:
        nextTitle = '블록' + nextTitle
        break
    }
    setTitle(nextTitle)
  }, [drawerMode, blockType])

  return (
    <AntdDrawer
      title={title}
      placement="right"
      bodyStyle={{ padding: '0' }}
      width={500}
      onClose={() => {
        setOpenDrawer(false)
      }}
      open={openDrawer}
    >
      <BaseComponent>
        {drawerMode === 'create' && <DrawerCreateForm blockType={blockType} />}
        {drawerMode === 'edit' && block && <DrawerEditForm block={block} mode={drawerMode} />}
      </BaseComponent>
    </AntdDrawer>
  )
}
