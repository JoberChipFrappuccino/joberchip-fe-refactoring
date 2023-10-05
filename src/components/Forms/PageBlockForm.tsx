import { createPageAPI } from '@/api/page'
import { useBlockAction } from '@/store/blockAction'
import { useSharePageStore } from '@/store/sharePage'
import { getNextYOfLastBlock } from '@/utils/api'
import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { type BlockBaseWithBlockFormProps } from '../SwitchCase/DrawerEditForm'
import TreeLayout from '../Tree/TreeLayout'
import FormButton from '../Ui/Button'
import styles from './PageBlockForm.module.scss'

export function PageBlockForm({ block }: BlockBaseWithBlockFormProps<TPage>) {
  const { sharePage } = useSharePageStore()
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [parentPageId, setParentPageId] = useState<string>('')
  const [parentPageTitle, setParentPageTitle] = useState<string>('')
  const [isLocationVisible, setLocationVisible] = useState<boolean>(false)
  const [treeLayoutToggle, setTreeLayoutToggle] = useState<boolean>(false)
  const { drawerMode } = useBlockAction()
  const isButtonDisabled = !title || !description || !location

  const titleValue = block?.title
  const descriptionValue = block?.description
  const locationValue = block?.location

  useEffect(() => {
    setTitle(titleValue ?? '')
    setDescription(descriptionValue ?? '')
    setParentPageId(locationValue ?? '')
  }, [titleValue, descriptionValue, locationValue])

  const toggleLocation = () => {
    setLocationVisible(!isLocationVisible)
    setTreeLayoutToggle(!treeLayoutToggle)
  }

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const body = {
      title,
      description,
      parentPageId,
      x: 0,
      y: getNextYOfLastBlock(sharePage.children),
      w: 2,
      h: 2
    }
    createPageAPI(body)
      .then(({ message }) => {
        alert(message)
      })
      .catch(({ message }) => {
        alert(message)
      })
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
    if (selectedNode?.pageId) {
      setParentPageId(selectedNode.pageId)
      setParentPageTitle(selectedNode.title)
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
              value={parentPageTitle}
              onClick={toggleLocation}
              readOnly
              placeholder="페이지 위치를 설정해주세요."
            />
            {isLocationVisible && (
              <div>
                <TreeLayout onSelectTreeNode={onSelectTreeNode} drawerMode={drawerMode === 'edit'} />
              </div>
            )}
          </div>
        </div>
        <FormButton title={drawerMode === 'create' ? '페이지 추가하기' : '페이지 수정하기'} event={isButtonDisabled} />
      </form>
    </div>
  )
}
