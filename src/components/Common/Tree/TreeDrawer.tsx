import { BiHomeAlt } from '@react-icons/all-files/bi/BiHomeAlt'
import { Drawer } from 'antd'
import { useEffect, useState, type FormEvent, type Key } from 'react'
import { useBreadCrumb } from '@/hooks/useBreadCrumb'
import FormButton from '../Ui/Button'
import styles from './TreeDrawer.module.scss'
import TreeLayout, { type TreeInfo } from './TreeLayout'

export const TreeDrawer = () => {
  const { breadCrumb } = useBreadCrumb()
  const [open, setOpen] = useState(false)
  const [newFileLocation, setNewFileLocation] = useState<string>('')
  const isButtonDisabled = !newFileLocation
  const fileLocation = ''

  const onSelectTreeNode = (_keys: Key[], info: TreeInfo) => {
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
      <button className={styles.btn} onClick={() => setOpen(true)}>
        저장위치 변경
      </button>
      <Drawer title="저장위치 변경" placement="right" onClose={() => setOpen(false)} open={open}>
        <div className={styles.container}>
          <form className={styles.formBox} onSubmit={submitHandler}>
            <div className={styles.forms}>
              <BiHomeAlt /> 공유페이지
            </div>
            {breadCrumb?.parentId && <TreeLayout spaceId={breadCrumb.parentId} onSelectTreeNode={onSelectTreeNode} />}
          </form>
        </div>
        <FormButton title={'페이지 이동하기'} disabled={isButtonDisabled} />
      </Drawer>
    </>
  )
}
