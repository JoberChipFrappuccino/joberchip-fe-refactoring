import { DropDownMenu } from '@/components/Space/DropDownMenu'
import { useSpaceModeStore } from '@/store/spaceMode'
import { Switch } from 'antd'
import { useMemo, type ReactNode } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import styles from './ViewerBlockBase.module.scss'

type Props = {
  children: ReactNode
}
export default function ViewerBlockBase({ children }: Props) {
  const { mode } = useSpaceModeStore()

  const items = useMemo(
    () => [
      {
        key: '1',
        label: <Switch onChange={() => {}} />,
        icon: <p>공개 설정</p>
      },
      {
        key: '2',
        icon: <button>페이지 정보 수정</button>
      },
      {
        key: '3',
        danger: true,
        label: '배치 (배치 버튼은 onFocus로 대체하겠습니다.\n (feat. 미구현))'
      },
      {
        key: '3',
        danger: true,
        label: '삭제하기'
      }
    ],
    [mode]
  )

  return (
    <div className={styles.container}>
      <aside>
        <DropDownMenu items={items}>
          <BsThreeDotsVertical className={styles.icon} />
        </DropDownMenu>
      </aside>
      {children}
    </div>
  )
}
