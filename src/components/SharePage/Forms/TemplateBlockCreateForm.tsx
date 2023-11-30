import { useQuery } from '@tanstack/react-query'
import classNames from 'classnames'
import { useState } from 'react'
import { addTemplateBlockAPI } from '@/apis/blocks'
import { getTemplates } from '@/apis/template'
import { type BlockWith } from '@/models/space'
import { useSharePageQuery } from '@/queries/useSharePageQuery'
import { useBlockActionStore } from '@/store/blockAction'
import { getNextYOfLastBlock } from '@/utils/api'
import { toast } from '@/utils/toast'
import { useUser } from '@/hooks/useUser'
import FormButton from '../../Common/Ui/Button'
import { TemplateBlock } from '../Blocks/TemplateBlock'
import { TemplateSearchBox } from '../TemplateSearchBox'
import styles from './TemplateBlockCreateForm.module.scss'

export function TemplateBlockCreateForm() {
  const { user } = useUser()
  const { sharePage, pageId } = useSharePageQuery()
  const { setOpenDrawer } = useBlockActionStore()
  const { data: templates } = useQuery(['template', user.userId], () => getTemplates(user.userId))
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
    addTemplateBlockAPI(body).then((res) => {
      // HACK : 시간 관계상 에러처리를 하지 않습니다.
      if (res.data) {
        // setSharePage({ ...sharePage, children: [...sharePage.children, res.data] })
        toast(res.message, 'success', { autoClose: 500 })
      } else toast(res.message, 'failure', { autoClose: 500 })
      setOpenDrawer(false)
    })

    // setSharePage({ ...sharePage, children: [...sharePage.children] })
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
