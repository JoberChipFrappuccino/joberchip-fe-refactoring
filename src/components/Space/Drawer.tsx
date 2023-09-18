import SwtichCreateActionBlock from '@/components/SwitchCase/SwitchActionBlock'
import { useDrawerFormType } from '@/store/formMode'
import { Drawer as AntdDrawer } from 'antd'

export function Drawer() {
  const { openDrawer, setOpenDrawer, drawerMode } = useDrawerFormType()

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
      <SwtichCreateActionBlock />
    </AntdDrawer>
  )
}
