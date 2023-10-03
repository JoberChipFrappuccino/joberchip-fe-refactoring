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
      // const nodePath = selectedNode.keyPath.map((key: string) => key.toString()).join(' > ')
      // setSelectedFile(nodePath) // 클릭한 파일의 경로를 상태에 저장
      setNewFileLocation(selectedNode.key)
    }
  }

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const body = {
      location: newFileLocation
    }
    // body에 data를 담아 post 전달 알림창으로 체크
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
              <h3>
                <BiHomeAlt /> 어쩌구의 공유페이지
              </h3>
            </div>
            <TreeLayout onSelectTreeNode={onSelectTreeNode} />
          </form>
        </div>
        <FormButton title={'페이지 이동하기'} event={isButtonDisabled} />
      </Drawer>
    </>
  )
}
