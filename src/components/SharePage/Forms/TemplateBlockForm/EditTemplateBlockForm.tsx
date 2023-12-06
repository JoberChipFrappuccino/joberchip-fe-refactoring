import { Input, Select, Switch } from 'antd'
import { type BlockBaseWithBlockFormProps } from '@/components/Common/SwitchCases/DrawerEditForm'
import FormButton from '@/components/Common/Ui/Button'
import { useBlockActionStore } from '@/store/blockAction'
import { toast } from '@/utils'
import styles from './EditTemplateBlockForm.module.scss'

/**
 * @description 템플릿 블록은 기획에 포함되지 않은 기능으로, 일부 모양만 구현되어 있습니다.
 */
export function EditTemplateBlockForm({ block }: BlockBaseWithBlockFormProps<TTemplate>) {
  const { setOpenDrawer } = useBlockActionStore()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    toast('수정되었습니다. (템플릿 미구현)', 'success')
    setOpenDrawer(false)
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.templateSettingContainer}>
        <h2>템플릿 설정</h2>
        <div className={styles.inputCover}>
          <p>템플릿 제목 *</p>
          <Input value={block?.title ? block.title : ''} />
        </div>
        <div className={styles.inputCover}>
          <p>템플릿 설명</p>
          <Input value={block?.description ? block.description : ''} />
        </div>
        <div className={styles.inputCover}>
          <p>저장할 폴더를 선택해주세요.</p>
          <Select
            value={'디자인2'}
            style={{
              width: '100%'
            }}
          />
        </div>
        <div className={styles.inputCover}>
          <div className={styles.split}>
            <span>최종 확인</span>
            <Switch />
          </div>
        </div>
      </div>
      <div className={styles.userSettingContainer}>
        <h2>사용자 설정</h2>
        <div className={styles.inputCover}>
          <p>필수 입력 항목</p>
          <Select
            mode="tags"
            style={{
              width: '100%'
            }}
            defaultValue={['생년월일', '근로계약서', '발급용도']}
          />
        </div>
        <div className={styles.inputCover}>
          <p>지정 태그</p>
          <Select
            mode="tags"
            style={{
              width: '100%'
            }}
            defaultValue={['#근로', '#계약서', '#재직자']}
          />
        </div>
        <div className={styles.inputCover}>
          <div className={styles.split}>
            <span>상대방 문서 저장 허용 여부</span>
            <Switch />
          </div>
        </div>
        <div className={styles.inputCover}>
          <div className={styles.split}>
            <span>로그인 필요 여부</span>
            <Switch />
          </div>
        </div>
      </div>
      <FormButton title="수정하기" event={false} />
    </form>
  )
}
