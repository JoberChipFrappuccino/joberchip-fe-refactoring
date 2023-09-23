import { getTemplates } from '@/api/template'
import { type BlockWith } from '@/models/space'
import { useUserStore } from '@/store/user'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { TemplateBlock } from '../Blocks/TemplateBlock'
import { TemplateSearchBox } from '../Space/TemplateSearchBox'
import FormButton from '../Ui/Button'
import styles from './TemplateBlockCreateForm.module.scss'

export function TemplateBlockCreateForm() {
  const { user } = useUserStore()
  const { data: templates } = useQuery(['template', user.userId], () => getTemplates(user.userId), {
    staleTime: 1000 * 60 * 5
  })
  const [templateId, setTemplateId] = useState('')

  const handleOnClick = (block: BlockWith<'template'>) => {
    setTemplateId(block.templateId)
  }

  return (
    <div className={styles.container}>
      <TemplateSearchBox />
      <div className={styles.blockViewer}>
        {templates?.map((template) => {
          return (
            <div
              key={`create-form-${template.templateId}`}
              className={[styles.blockCover, templateId === template.templateId ? styles.selected : ''].join(' ')}
              onClick={() => {
                handleOnClick(template)
              }}
            >
              <TemplateBlock block={template} mode={'view'} preview={true} />
            </div>
          )
        })}
      </div>
      <FormButton title="템플릿 추가하기" event={!templateId} />
    </div>
  )
}
