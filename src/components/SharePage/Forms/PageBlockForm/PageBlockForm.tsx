import type { BlockBaseWithBlockFormProps } from '@/components/Common/SwitchCases/DrawerEditForm'
import { useState, type Key } from 'react'
import { useForm } from 'react-hook-form'
import { type BreadCrumbItems } from '@/apis/page/page'
import TreeLayout, { type TreeInfo } from '@/components/Common/Tree/TreeLayout'
import FormButton from '@/components/Common/Ui/Button'
import { useBlockActionStore } from '@/store/blockAction'
import { useBreadCrumb } from '@/hooks/useBreadCrumb'
import styles from './PageBlockForm.module.scss'

interface PageFormInputs {
  title: string
  description: string
}
export type PageBlockSubmitData = PageFormInputs & {
  parentPageId: string
}
type PageBlockFromProps = BlockBaseWithBlockFormProps<TPage> & {
  onSubmit: (data: PageBlockSubmitData) => void
}
export function PageBlockForm({ block, onSubmit }: PageBlockFromProps) {
  const { breadCrumb, pageId } = useBreadCrumb()
  const [parentPageId, setParentPageId] = useState(pageId)
  const [pageTitle, setPageTitle] = useState(getTitle(breadCrumb, pageId)) // pageId의 title을 넣어야함
  const { drawerMode, setOpenDrawer } = useBlockActionStore()
  const { register, handleSubmit, watch, reset } = useForm<PageFormInputs>({
    defaultValues: {
      title: block?.title ?? '',
      description: block?.description ?? ''
    }
  })

  const submitHandler = (data: PageFormInputs) => {
    if (!parentPageId) return
    onSubmit({ ...data, parentPageId })
    reset()
    setOpenDrawer(false)
  }

  const onSelectTreeNode = (_keys: Key[], info: TreeInfo) => {
    const selectedNode = info.selectedNodes[0]
    if (selectedNode?.pageId) {
      setParentPageId(selectedNode.pageId)
      setPageTitle(selectedNode.title)
    }
  }
  return (
    <form className={styles.formBox} onSubmit={handleSubmit(submitHandler)}>
      <div className={styles.forms}>
        <h3>페이지 제목</h3>
        <input type="text" placeholder="페이지 제목" {...register('title')} />
        <h3>페이지 설명</h3>
        <input type="text" placeholder="페이지 설명을 입력해주세요." {...register('description')} />
        <h3>페이지 위치 설정</h3>
        <div>
          <input
            className={styles.treeInput}
            type="text"
            value={pageTitle}
            readOnly
            placeholder="페이지 위치를 설정해주세요."
          />
          <div>
            {breadCrumb?.parentId && (
              <TreeLayout spaceId={breadCrumb.parentId} pageId={pageId} onSelectTreeNode={onSelectTreeNode} />
            )}
          </div>
        </div>
      </div>
      <FormButton
        title={drawerMode === 'CREATE' ? '페이지 추가하기' : '페이지 수정하기'}
        event={!watch('title') || !watch('description')}
      />
    </form>
  )
}

function getTitle(breadCrumb?: BreadCrumbItems | null, pageId?: string): string {
  if (!breadCrumb || pageId) return ''
  if (breadCrumb.pageId === pageId) return breadCrumb.title as string
  if (!breadCrumb.children) return ''

  for (let i = 0; i < breadCrumb.children.length; i++) {
    const title = getTitle(breadCrumb.children[i], pageId)
    if (title) return title
  }
  return ''
}
