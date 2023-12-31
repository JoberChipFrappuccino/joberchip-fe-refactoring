import { type EditPageBlockBody } from '@/apis/page'
import { type BlockBaseWithBlockFormProps } from '@/components/Common/SwitchCases/DrawerEditForm'
import { useEditPageBlockMutation } from '@/hooks/mutations/pageBlockMutation'
import { PageBlockForm, type PageBlockSubmitData } from './PageBlockForm'
import styles from './PageBlockForm.module.scss'

export const EditPageBlock = ({ block }: BlockBaseWithBlockFormProps<TPage>) => {
  const editPageMutate = useEditPageBlockMutation()

  const handleSubmit = (data: PageBlockSubmitData) => {
    const { parentPageId, title, description } = data
    if (parentPageId === block?.objectId) {
      // TODO : 같은 페이지 이동 선택이 불가능하도록 수정하기
      alert('동일한 페이지로 이동할 수 없습니다.')
      return
    }
    const body: EditPageBlockBody = {
      parentPageId,
      title,
      description
    }
    editPageMutate.mutate({ pageId: block?.objectId, body })
  }

  return (
    <div className={styles.container}>
      <PageBlockForm block={block} onSubmit={handleSubmit} />
    </div>
  )
}
