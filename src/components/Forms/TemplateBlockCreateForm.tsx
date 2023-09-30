import { getTemplates } from '@/api/template'
import { type BlockWith } from '@/models/space'
import { useBlockAction } from '@/store/blockAction'
import { useUserStore } from '@/store/user'
import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { useState } from 'react'
import { TemplateBlock } from '../Blocks/TemplateBlock'
import { TemplateSearchBox } from '../SharePage/TemplateSearchBox'
import FormButton from '../Ui/Button'
import styles from './TemplateBlockCreateForm.module.scss'

export function TemplateBlockCreateForm() {
  const { user } = useUserStore()
  const { setOpenDrawer } = useBlockAction()
  const { data: templates } = useQuery(['template', user.userId], () => getTemplates(user.userId), {
    staleTime: 1000 * 60 * 5
  })
  const [templateId, setTemplateId] = useState('')

  const handleOnClick = (block: BlockWith<TTemplate>) => {
    setTemplateId(block.templateId)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    alert('추가되었습니다. (템플릿 미구현)')
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
      <FormButton title="템플릿 추가하기" event={!templateId} />
    </form>
  )
}
