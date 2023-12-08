import { TiDeleteOutline } from '@react-icons/all-files/ti/TiDeleteOutline'
import { useForm } from 'react-hook-form'
import { type BlockBaseWithBlockFormProps } from '@/components/Common/SwitchCases/DrawerEditForm'
import FormButton from '@/components/Common/Ui/Button'
import { useBlockActionStore } from '@/store/blockAction'
import styles from './LinkBlockForm.module.scss'

export interface LinkBlockFromInputs {
  title: string
  link: string
}

type LinkBlockFormProps = BlockBaseWithBlockFormProps<TLink> & {
  onSubmit: (data: LinkBlockFromInputs) => void
}

export function LinkBlockForm({ block, onSubmit: onSubmitForm }: LinkBlockFormProps) {
  const { drawerMode } = useBlockActionStore()
  const { register, handleSubmit, watch, resetField } = useForm<LinkBlockFromInputs>({
    defaultValues: {
      title: block?.title ?? '',
      link: block?.src ?? ''
    }
  })

  const onSubmit = (data: LinkBlockFromInputs) => {
    onSubmitForm(data)
  }

  return (
    <div className={styles.container}>
      <form className={styles.formBox} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.forms}>
          <h3>URL 링크 주소 제목*</h3>
          <div className={styles.inputbox}>
            <input
              className={styles.input}
              type="text"
              placeholder="링크 제목을 입력해주세요."
              {...register('title')}
            />
            {watch('title') && (
              <button
                type="button"
                className={styles.delTitle}
                onClick={() => resetField('title', { defaultValue: '' })}
              >
                <TiDeleteOutline />
              </button>
            )}
          </div>
          <h3 className={styles.formTexts}>URL 링크 주소 삽입*</h3>
          <div className={styles.inputbox}>
            <input className={styles.input} type="text" placeholder="링크 주소를 입력해주세요." {...register('link')} />
            {watch('link') && (
              <button type="button" className={styles.delLink} onClick={() => resetField('link', { defaultValue: '' })}>
                <TiDeleteOutline />
              </button>
            )}
          </div>
        </div>
        <FormButton
          title={drawerMode === 'CREATE' ? '링크 추가하기' : '링크 수정하기'}
          disabled={!watch('link') || !watch('title')}
        />
      </form>
    </div>
  )
}
