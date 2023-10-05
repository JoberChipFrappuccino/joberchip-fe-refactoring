import { Drawer } from 'antd'
import React, { useEffect, useState, type FormEvent } from 'react'
import { BiHomeAlt } from 'react-icons/bi'
import FormButton from '../Ui/Button'
import styles from './TreeDrawer.module.scss'
import TreeLayout from './TreeLayout'

export const TreeDrawer: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [newFileLocation, setNewFileLocation] = useState<string>('')
  const isButtonDisabled = !newFileLocation
  const fileLocation = ''
  const onOpen = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  const onSelectTreeNode = (selectedKeys?: React.Key[], info?: any) => {
    const selectedNode = info.selectedNodes[0]
    if (selectedNode?.key) {
      setNewFileLocation(selectedNode.key)
    }
  }

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const body = {
      location: newFileLocation
    }
    alert(JSON.stringify(body))
  }

  useEffect(() => {
    setNewFileLocation(fileLocation ?? '')
  }, [fileLocation])

  return (
    <>
      <button className={styles.btn} onClick={onOpen}>
        저장위치 변경
      </button>
      <Drawer title="저장위치 변경" placement="right" onClose={onClose} open={open}>
        <div className={styles.container}>
          <form className={styles.formBox} onSubmit={submitHandler}>
            <div className={styles.forms}>
              <BiHomeAlt /> 공유페이지
            </div>
            <TreeLayout onSelectTreeNode={onSelectTreeNode} />
          </form>
        </div>
        <FormButton title={'페이지 이동하기'} event={isButtonDisabled} />
      </Drawer>
    </>
  )
}
