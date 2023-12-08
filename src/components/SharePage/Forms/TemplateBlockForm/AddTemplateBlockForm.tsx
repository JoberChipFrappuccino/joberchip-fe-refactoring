import classNames from 'classnames'
import { useState } from 'react'
import FormButton from '@/components/Common/Ui/Button'
import { TemplateBlock } from '@/components/SharePage/Blocks/TemplateBlock/TemplateBlock'
import { TemplateSearchBox } from '@/components/SharePage/Forms/TemplateBlockForm/TemplateSearchBox'
import { useAddTemplateBlockMutation } from '@/hooks/mutations/templateBlockMutation'
import { useSharePageQuery } from '@/hooks/queries/useSharePageQuery'
import { useTemplateQuery } from '@/hooks/queries/useTemplateQuery'
import { type BlockWith } from '@/models/block'
import { useBlockActionStore } from '@/store/blockAction'
import { getNextYOfLastBlock } from '@/utils/SharePage'
import { useUser } from '@/hooks/useUserQuery'
import styles from './AddTemplateBlockForm.module.scss'

/**
 * @description 템플릿 블록은 기획에 포함되지 않은 기능으로, 일부 모양만 구현되어 있습니다.
 */
export function AddTemplateBlockForm() {
  const { user, isSuccess } = useUser()
  const { sharePage, pageId } = useSharePageQuery()
  const { templates } = useTemplateQuery(user?.userId)
  const { setOpenDrawer } = useBlockActionStore()
  const addTemplateMutation = useAddTemplateBlockMutation()

  const [templateId, setTemplateId] = useState('')

  const handleOnClick = (block: BlockWith<TTemplate>) => {
    setTemplateId(block.templateId)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const template = templates?.find((template) => template.templateId === templateId)
    if (!template?.title || !template?.description) {
      alert('선택된 템플릿이 없습니다.')
      return
    }
    const body = {
      pageId,
      x: 0,
      y: getNextYOfLastBlock(sharePage.children),
      w: 1,
      h: 2,
      title: template?.title ?? '',
      description: template?.description ?? ''
    }
    addTemplateMutation.mutate({ pageId, body })
    setOpenDrawer(false)
  }

  if (!isSuccess) {
    throw new Error('사용할 수 없는 기능입니다.')
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <TemplateSearchBox />
      <div className={styles.blockViewer}>
        {templates?.map((template) => {
          return (
            <button
              type="button"
              key={`create-form-${template.templateId}`}
              className={classNames(styles.blockCover, [
                {
                  [styles.selected]: templateId === template.templateId
                }
              ])}
              onClick={() => handleOnClick(template)}
            >
              <TemplateBlock block={template} mode={'VIEW'} preview={true} />
            </button>
          )
        })}
      </div>
      <FormButton title="템플릿 추가하기" disabled={!templateId} additionalStyle={styles.formBtn} />
    </form>
  )
}
