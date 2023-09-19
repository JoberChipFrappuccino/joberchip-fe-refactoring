import { Drawer } from 'antd'
import React, { useState } from 'react'

export const TreeDrawer: React.FC = () => {
  const [open, setOpen] = useState(false)
  const handleOpenDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  return (
    <>
      <button onClick={handleOpenDrawer}>저장위치 변경</button>
      <Drawer title="Basic Drawer" placement="right" onClose={onClose} open={open}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  )
}
