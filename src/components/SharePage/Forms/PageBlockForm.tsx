import { Input } from 'antd'
import { useState, type ChangeEvent, type FormEvent } from 'react'
import { createPageAPI } from '@/apis/page'
import { editPageProfileAPI } from '@/apis/space'
import { BLOCK_SIZE } from '@/constants/blockSizeConstant'
import { PAGE } from '@/constants/blockTypeConstant'
import { useSharePageQuery } from '@/queries/useSharePageQuery'
import { useBlockActionStore } from '@/store/blockAction'
import { getNextYOfLastBlock } from '@/utils/api'
import { toast } from '@/utils/toast'
import { type BlockBaseWithBlockFormProps } from '../../Common/SwitchCases/DrawerEditForm'
import TreeLayout from '../../Common/Tree/TreeLayout'
import FormButton from '../../Common/Ui/Button'
import styles from './PageBlockForm.module.scss'

export function PageBlockForm({ block }: BlockBaseWithBlockFormProps<TPage>) {
  const { sharePage } = useSharePageQuery()
  const [title, setTitle] = useState(block?.title ?? '')
  const [description, setDescription] = useState(block?.description ?? '')
  const [parentPageId, setParentPageId] = useState('')
  const [parentPageTitle, setParentPageTitle] = useState('')
  const [isLocationVisible, setLocationVisible] = useState(false)
  const { drawerMode, setOpenDrawer } = useBlockActionStore()
  const isButtonDisabled = !title || !description || !location

  const toggleLocation = () => {
    setLocationVisible((prev) => !prev)
  }

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (drawerMode === 'CREATE') {
      const body = {
        title,
        description,
        parentPageId,
        x: 2,
        y: getNextYOfLastBlock(sharePage.children),
        w: 1,
        h: BLOCK_SIZE[PAGE].minHeight
      }
      createPageAPI(body).then((res) => {
        const pageBlock = res.data
        if (pageBlock) {
          // setSharePage({
          //   ...sharePage,
          //   children: [...sharePage.children, pageBlock]
          // })
        }
        toast(res.message, res.status, { autoClose: 500 })
      })
    } else {
      const form = new FormData()
      form.append('title', title)
      form.append('description', description)
      form.append('parentPageId', parentPageId)
      editPageProfileAPI(block?.objectId ?? '', form).then((res) => {
        toast(res.message, res.status, { autoClose: 500 })
      })
    }
    setOpenDrawer(false)
    window.location.reload()
  }

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const onChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
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
          <Input type="text" value={title} onChange={onChangeTitle} placeholder="페이지제목" />
          <h3>페이지 설명</h3>
          <Input
            type="text"
            value={description}
            onChange={onChangeDescription}
            placeholder="페이지 설명을 입력해주세요."
          />
          <h3>페이지 위치 설정</h3>
          <div>
            <Input
              type="text"
              value={parentPageTitle}
              onClick={toggleLocation}
              readOnly
              placeholder="페이지 위치를 설정해주세요."
            />
            {isLocationVisible && (
              <div>
                <TreeLayout onSelectTreeNode={onSelectTreeNode} drawerMode={drawerMode === 'EDIT'} />
              </div>
            )}
          </div>
        </div>
        <FormButton title={drawerMode === 'CREATE' ? '페이지 추가하기' : '페이지 수정하기'} event={isButtonDisabled} />
      </form>
    </div>
  )
}
