import { useActiveBlock } from '@/store/activeBlock'
import { useDrawerFormType } from '@/store/formMode'
import { useSpaceStore } from '@/store/space'
import { Drawer as AntdDrawer } from 'antd'
import { type ReactNode } from 'react'
import { DrawerCreateForm } from '../SwitchCase/DrawerCreateForm'
import { DrawerEditForm } from '../SwitchCase/DrawerEditForm'
import { ActionBlockFormBase } from './ActionBlockFormBase'

export function Drawer() {
  const { openDrawer, setOpenDrawer, drawerMode, blockType } = useDrawerFormType()
  const { space } = useSpaceStore()
  const { activeBlockId } = useActiveBlock()
  const block = space.blocks.find((item) => item.blockId === activeBlockId)

  if (typeof block === 'undefined') {
    if (process.env.NODE_ENV === 'development') throw new Error('Please add a component')
    setOpenDrawer(false)
    return null // * production에서도 에러를 사용자에게 알려야할까요? 일단, block이 undefined인 경우가 없을 것 같긴합니다..
  }
  let BaseComponent = ActionBlockFormBase
  if (block.type === 'template' || block.type === 'page') {
    // * 페이지, 템플릿의 BaseComponent를 바꿔야합니다요.
    // eslint-disable-next-line react/display-name, react/jsx-no-useless-fragment
    BaseComponent = ({ children }: { children: ReactNode }) => <>{children}</>
  }
  return (
    <AntdDrawer
      title={drawerMode === 'create' ? '블록 추가' : '블록 수정'}
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
        {drawerMode === 'edit' && <DrawerEditForm block={block} mode={drawerMode} />}
      </BaseComponent>
    </AntdDrawer>
  )
}
