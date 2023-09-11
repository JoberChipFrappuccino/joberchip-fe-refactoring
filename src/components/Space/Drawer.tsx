import { useDrawerFormType } from '@/store/formMode'
import { Drawer as AntdDrawer } from 'antd'
import SwtichActionBlock from './SwitchActionBlock'
import SwtichActionForm from './SwitchActionForm'

export function Drawer() {
  const { formType, openDrawer, setOpenDrawer } = useDrawerFormType()

  return (
    <AntdDrawer
      title="Basic AntdDrawer"
      placement="right"
      onClose={() => {
        setOpenDrawer(false)
      }}
      open={openDrawer}
    >
      {formType === 'block' ? <SwtichActionBlock /> : <SwtichActionForm />}
    </AntdDrawer>
  )
}
