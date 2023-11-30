import { TiDeleteOutline } from '@react-icons/all-files/ti/TiDeleteOutline'
import { Input } from 'antd'
import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { editLinkBlockAPI } from '@/apis/blocks'
// import { addLinkBlockAPI, editLinkBlockAPI } from '@/apis/blocks'
import { useSharePageQuery } from '@/queries/useSharePageQuery'
import { useBlockActionStore } from '@/store/blockAction'
// import { getNextYOfLastBlock } from '@/utils/api'
import { type BlockBaseWithBlockFormProps } from '../../Common/SwitchCases/DrawerEditForm'
import FormButton from '../../Common/Ui/Button'
import styles from './LinkBlockForm.module.scss'

export function LinkBlockForm({ block }: BlockBaseWithBlockFormProps<TLink>) {
  const { sharePage, pageId } = useSharePageQuery()
  const [link, setLink] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const isButtonDisabled = !link || !title
  const { drawerMode } = useBlockActionStore()
  const { setOpenDrawer } = useBlockActionStore()

  const titleValue = block?.title ?? ''
  const linkValue = block?.src ?? ''
  const blockId = block?.objectId ?? ''

  useEffect(() => {
    setTitle(titleValue ?? '')
    setLink(linkValue ?? '')
  }, [titleValue, linkValue])

  /** 링크 블록 정보 API 전달 함수 */
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // const addData = {
    //   x: 0,
    //   y: getNextYOfLastBlock(sharePage.children),
    //   w: 1,
    //   h: 2,
    //   title,
    //   link,
    //   type: 'LINK',
    //   visible: true
    // }
    const editData = {
      title,
      link
    }
    try {
      if (drawerMode === 'create') {
        // const { data: responseData } = await addLinkBlockAPI(pageId, addData)
        // const updatedSharePage = {
        //   ...sharePage,
        //   children: [...sharePage.children, { ...responseData }]
        // }
        // setSharePage(updatedSharePage)
        setOpenDrawer(false)
      } else if (drawerMode === 'EDIT') {
        const { data: responseData } = await editLinkBlockAPI(pageId, blockId, editData)
        const existingBlockIndex = sharePage.children.findIndex((block) => block.objectId === responseData.objectId)
        const updatedChildren = [...sharePage.children]
        if (existingBlockIndex !== -1) {
          updatedChildren[existingBlockIndex] = responseData
        } else {
          updatedChildren.push(responseData)
        }
        // const updatedSharePage = {
        //   ...sharePage,
        //   children: updatedChildren
        // }
        // setSharePage(updatedSharePage)
        setOpenDrawer(false)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const onChangeLink = (e: ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value)
  }

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const deleteTitle = () => {
    setTitle('')
  }

  const deleteLink = () => {
    setLink('')
  }

  return (
    <div className={styles.container}>
      <form className={styles.formBox} onSubmit={drawerMode === 'create' ? submitHandler : submitHandler}>
        <div className={styles.forms}>
          <h3>URL 링크 주소 제목*</h3>
          <div className={styles.inputbox}>
            <Input
              className={styles.input}
              type="text"
              value={title}
              onChange={onChangeTitle}
              placeholder="링크 제목을 입력해주세요."
            />
            {title && (
              <button type="button" className={styles.delTitle} onClick={deleteTitle}>
                <TiDeleteOutline />
              </button>
            )}
          </div>
          <h3 className={styles.formTexts}>URL 링크 주소 삽입*</h3>
          <div className={styles.inputbox}>
            <Input
              className={styles.input}
              type="text"
              value={link}
              onChange={onChangeLink}
              placeholder="링크 주소를 입력해주세요."
            />
            {link && (
              <button type="button" className={styles.delLink} onClick={deleteLink}>
                <TiDeleteOutline />
              </button>
            )}
          </div>
        </div>
        <FormButton title={drawerMode === 'create' ? '링크 추가하기' : '링크 수정하기'} event={isButtonDisabled} />
      </form>
    </div>
  )
}
