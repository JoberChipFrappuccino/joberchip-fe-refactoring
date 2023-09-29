import { type BlockWith } from '@/models/space'
import { useBlockAction } from '@/store/blockAction'
import { Input, Select, Switch } from 'antd'
import FormButton from '../Ui/Button'
import styles from './TemplateBlockEditForm.module.scss'

type Props = {
  block: BlockWith<TTemplate>
}

export function TemplateBlockEditForm({ block }: Props) {
  const { setOpenDrawer } = useBlockAction()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    alert('수정되었습니다. (템플릿 미구현)')
    setOpenDrawer(false)
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.templateSettingContainer}>
        <h2>템플릿 설정</h2>
        <div className={styles.inputCover}>
          <p>템플릿 제목 *</p>
          <Input value={block.title} />
        </div>
        <div className={styles.inputCover}>
          <p>템플릿 설명</p>
          <Input value={block.description} />
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
