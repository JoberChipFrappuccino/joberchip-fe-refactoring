import { useBlockAction } from '@/store/blockAction'
import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import TreeLayout from '../Tree/TreeLayout'
import FormButton from '../Ui/Button'
import styles from './PageBlockForm.module.scss'

type Props = {
  block?: {
    title?: string
    description?: string
    location?: string
  }
}

export default function PageBlockForm(block: Props) {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [location, setLocation] = useState<string>('')
  const [isLocationVisible, setLocationVisible] = useState<boolean>(false)
  const [treeLayoutToggle, setTreeLayoutToggle] = useState<boolean>(false)
  const { drawerMode } = useBlockAction()
  // const [selectedFile, setSelectedFile] = useState<string>('')
  const isButtonDisabled = !title || !description || !location

  const titleValue = block.block?.title
  const descriptionValue = block.block?.description
  const locationValue = block.block?.location

  useEffect(() => {
    setTitle(titleValue ?? '')
    setDescription(descriptionValue ?? '')
    setLocation(locationValue ?? '')
  }, [titleValue, descriptionValue, locationValue])

  const toggleLocation = () => {
    setLocationVisible(!isLocationVisible)
    setTreeLayoutToggle(!treeLayoutToggle)
  }
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const body = {
      text: title,
      description,
      location: isLocationVisible ? location : ''
    }
    // body에 data를 담아 post 전달 알림창으로 체크
    alert(JSON.stringify(body))
  }

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setTitle(e.target.value)
  }
  const onChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setDescription(e.target.value)
  }

  const onSelectTreeNode = (selectedKeys?: React.Key[], info?: any) => {
    const selectedNode = info.selectedNodes[0]
    if (selectedNode?.key) {
      // const nodePath = selectedNode.keyPath.map((key: string) => key.toString()).join(' > ')
      // setSelectedFile(nodePath) // 클릭한 파일의 경로를 상태에 저장
      setLocation(selectedNode.key)
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.formBox} onSubmit={submitHandler}>
        <div className={styles.forms}>
          <h3>페이지 제목</h3>
          <input type="text" value={title} onChange={onChangeTitle} placeholder="페이지제목" />
          <h3>페이지 설명</h3>
          <input
            type="text"
            value={description}
            onChange={onChangeDescription}
            placeholder="페이지 설명을 입력해주세요."
          />
          <h3>페이지 위치 설정</h3>
          <div>
            <input
              type="text"
              value={location}
              onClick={toggleLocation}
              readOnly
              placeholder="페이지 위치를 설정해주세요."
            />
            {isLocationVisible && (
              <div>
                <TreeLayout onSelectTreeNode={onSelectTreeNode} drawerMode={drawerMode === 'edit'}/>
              </div>
            )}
          </div>
        </div>
        <FormButton title={drawerMode === 'create' ? '페이지 추가하기' : '페이지 수정하기'} event={isButtonDisabled} />
      </form>
    </div>
  )
}
