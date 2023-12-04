import type { BlockBaseWithBlockFormProps } from '@/components/Common/SwitchCases/DrawerEditForm'
import { useQueryClient } from '@tanstack/react-query'
import { useState, type Key } from 'react'
import { useForm } from 'react-hook-form'
import TreeLayout, { type TreeInfo } from '@/components/Common/Tree/TreeLayout'
import FormButton from '@/components/Common/Ui/Button'
import { createPageBlockMutate } from '@/queries/mutates/pageBlockMutate'
import { useSharePageQuery } from '@/queries/useSharePageQuery'
import { useBlockActionStore } from '@/store/blockAction'
import { getNextYOfLastBlock } from '@/utils/api'
import { useBreadCrumb } from '@/hooks/useBreadCrumb'
import styles from './PageBlockForm.module.scss'

interface PageFormInputs {
  title: string
  description: string
}
export function PageBlockForm({ block }: BlockBaseWithBlockFormProps<TPage>) {
  const { sharePage } = useSharePageQuery()
  const { breadCrumb } = useBreadCrumb()
  const [parentPageId, setParentPageId] = useState('')
  const [parentPageTitle, setParentPageTitle] = useState('')
  const { drawerMode, setOpenDrawer } = useBlockActionStore()
  const { register, handleSubmit, watch, reset } = useForm<PageFormInputs>({
    defaultValues: {
      title: block?.title ?? '',
      description: block?.description ?? ''
    }
  })
  const queryClient = useQueryClient()
  const createPageMutation = createPageBlockMutate(queryClient)

  const submitHandler = (data: PageFormInputs) => {
    if (!parentPageId) return
    const body = {
      parentPageId,
      title: data.title,
      description: data.description,
      x: 0,
      y: getNextYOfLastBlock(sharePage.children),
      w: 2,
      h: 1
    }
    createPageMutation.mutate({ body })
    reset()
    setOpenDrawer(false)
  }

  const onSelectTreeNode = (_keys: Key[], info: TreeInfo) => {
    const selectedNode = info.selectedNodes[0]
    if (selectedNode?.pageId) {
      setParentPageId(selectedNode.pageId)
      setParentPageTitle(selectedNode.title)
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.formBox} onSubmit={handleSubmit(submitHandler)}>
        <div className={styles.forms}>
          <h3>페이지 제목</h3>
          <input type="text" placeholder="페이지 제목" {...register('title')} />
          <h3>페이지 설명</h3>
          <input type="text" placeholder="페이지 설명을 입력해주세요." {...register('description')} />
          <h3>페이지 위치 설정</h3>
          <div>
            <input type="text" value={parentPageTitle} readOnly placeholder="페이지 위치를 설정해주세요." />
            <div>
              {breadCrumb?.parentId && <TreeLayout spaceId={breadCrumb.parentId} onSelectTreeNode={onSelectTreeNode} />}
            </div>
          </div>
        </div>
        <FormButton
          title={drawerMode === 'CREATE' ? '페이지 추가하기' : '페이지 수정하기'}
          event={!watch('title') || !watch('description')}
        />
      </form>
    </div>
  )
}
