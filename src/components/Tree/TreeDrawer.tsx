import { Drawer } from 'antd'
import React, { useState } from 'react'
import { BiHomeAlt } from 'react-icons/bi'
import TreeLayout from './TreeLayout'

export const TreeDrawer: React.FC = () => {
  const [open, setOpen] = useState(false)
  const onOpen = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  return (
    <>
      <button
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: 0
        }}
        onClick={onOpen}
      >
        저장위치 변경
      </button>
      <Drawer title="저장위치 변경" placement="right" onClose={onClose} open={open}>
        <div className="mr-4 prose">
          <h3>
            <BiHomeAlt /> 어쩌구의 공유페이지
          </h3>
          <TreeLayout/>
        </div>
      </Drawer>
    </>
  )
}
