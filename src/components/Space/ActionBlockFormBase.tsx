import { type BlockType } from '@/models/space'
import { useDrawerFormType } from '@/store/formMode'
import type { ReactNode } from 'react'
import styles from './ActionBlockFormBase.module.scss'

// todo block type을 알아야하는지 논의가 필요합니당.
interface Props {
  children: ReactNode
}

export function ActionBlockFormBase({ children }: Props) {
  const { blockType, setBlockType } = useDrawerFormType()

  type FormType = {
    title: string
    type: BlockType
    icon: string | ReactNode
  }
  const formTypes: FormType[] = [
    {
      type: 'link',
      title: '링크',
      icon: 'icon'
    },
    {
      type: 'image',
      title: '사진',
      icon: 'icon'
    },
    {
      type: 'video',
      title: '동영상',
      icon: 'icon'
    },
    {
      type: 'googleMap',
      title: '지도',
      icon: 'icon'
    },
    {
      type: 'text',
      title: '텍스트',
      icon: 'icon'
    }
  ]
  return (
    <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
      <div>
        <h1>{formTypes.find((form) => form.type === blockType)?.title} 추가하기</h1>
        <div className={styles.navigation}>
          {formTypes.map((form) => {
            return (
              <div key={form.type}>
                <button
                  className={form.type === blockType ? styles.active : ''}
                  onClick={() => {
                    setBlockType(form.type)
                  }}
                >
                  <div>{form.icon}</div>
                  <div>{form.title}</div>
                </button>
              </div>
            )
          })}
        </div>
      </div>
      <div style={{ display: 'flex', height: '100%', width: '100%' }}>{children}</div>
    </div>
  )
}
