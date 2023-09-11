import type { MenuProps } from 'antd'
import { Dropdown } from 'antd'
import { useState, type ReactNode } from 'react'

type Props = {
  items: MenuProps['items']
  trigger?: 'click' | 'hover' | 'contextMenu'
  children?: ReactNode
  statefulKeys?: string[]
}

export function DropDownMenu({ items, children, trigger = 'click', statefulKeys }: Props) {
  const [open, setOpen] = useState(false)

  const handleOnClick: MenuProps['onClick'] = (e) => {
    if (statefulKeys?.includes(e.key)) return
    setOpen(false)
  }

  const handleOpenChange = (flag: boolean) => {
    setOpen(flag)
  }

  return (
    <Dropdown trigger={[trigger]} menu={{ items, onClick: handleOnClick }} onOpenChange={handleOpenChange} open={open}>
      {children}
    </Dropdown>
  )
}
