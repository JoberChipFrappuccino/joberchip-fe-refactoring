import { useQueryClient } from '@tanstack/react-query'
import classNames from 'classnames'
import { useState } from 'react'
import FormButton from '@/components/Common/Ui/Button'
import { TemplateBlock } from '@/components/SharePage/Blocks/TemplateBlock/TemplateBlock'
import { TemplateSearchBox } from '@/components/SharePage/Forms/TemplateBlockForm/TemplateSearchBox'
import { type BlockWith } from '@/models/block'
import { useAddTemplateBlockMutation } from '@/queries/mutates/templateBlockMutation'
import { useSharePageQuery } from '@/queries/useSharePageQuery'
import { useTemplateQuery } from '@/queries/useTemplateQuery'
import { useBlockActionStore } from '@/store/blockAction'
import { getNextYOfLastBlock } from '@/utils/SharePage'
import { useUser } from '@/hooks/useUser'
import styles from './AddTemplateBlockForm.module.scss'

/**
 * @description 템플릿 블록은 기획에 포함되지 않은 기능으로, 일부 모양만 구현되어 있습니다.
 */
export function AddTemplateBlockForm() {
  const { user } = useUser()
  const { sharePage, pageId } = useSharePageQuery()
  const { setOpenDrawer } = useBlockActionStore()
  const { templates } = useTemplateQuery(user.userId)
  const queryClient = useQueryClient()
  const addTemplateMutation = useAddTemplateBlockMutation(queryClient)
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
      <FormButton title="템플릿 추가하기" event={!templateId} additionalStyle={styles.formBtn} />
    </form>
  )
}
