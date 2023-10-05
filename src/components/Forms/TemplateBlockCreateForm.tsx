import { addTemplateBlockAPI } from '@/api/blocks'
import { getTemplates } from '@/api/template'
import { DEFAULT_CACHE_TIME } from '@/constants'
import { type BlockWith } from '@/models/space'
import { useBlockAction } from '@/store/blockAction'
import { useSharePageStore } from '@/store/sharePage'
import { useUserStore } from '@/store/user'
import { getNextYOfLastBlock } from '@/utils/api'
import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { useState } from 'react'
import { TemplateBlock } from '../Blocks/TemplateBlock'
import { TemplateSearchBox } from '../SharePage/TemplateSearchBox'
import FormButton from '../Ui/Button'
import styles from './TemplateBlockCreateForm.module.scss'

export function TemplateBlockCreateForm() {
  const { user } = useUserStore()
  const { sharePage } = useSharePageStore()
  const { setOpenDrawer } = useBlockAction()
  const { data: templates } = useQuery(['template', user.userId], () => getTemplates(user.userId), {
    staleTime: DEFAULT_CACHE_TIME
  })
  const [templateId, setTemplateId] = useState('')

  const handleOnClick = (block: BlockWith<TTemplate>) => {
    setTemplateId(block.templateId)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    alert('추가되었습니다. (템플릿 미구현)')
    const template = templates?.find((template) => template.templateId === templateId)
    if (!template?.title || !template?.description) {
      alert('선택된 템플릿이 없습니다.')
      return
    }
    await addTemplateBlockAPI({
      pageId: sharePage.pageId,
      x: 0,
      y: getNextYOfLastBlock(sharePage.children),
      w: 2,
      h: 2,
      title: template?.title ?? '',
      description: template?.description ?? ''
    })
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
              <TemplateBlock block={template} mode={'view'} preview={true} />
            </button>
          )
        })}
      </div>
      <FormButton title="템플릿 추가하기" event={!templateId} additionalStyle={styles.formBtn} />
    </form>
  )
}
