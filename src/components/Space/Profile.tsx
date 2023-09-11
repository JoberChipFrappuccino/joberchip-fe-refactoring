import { useSpaceModeStore } from '@/store/spaceMode'
import { useUserStore } from '@/store/user'
import { Switch } from 'antd'
import { useMemo } from 'react'
import styles from './Profile.module.scss'
import { DropDownMenu } from './ProfileDropDownMenu'

export function Profile() {
  const { user } = useUserStore()
  const { mode, setSpaceMode } = useSpaceModeStore()

  const items = useMemo(
    () => [
      {
        key: '1',
        label: <Switch onChange={() => {}} />,
        icon: <p>공개설정</p>
      },
      {
        key: '2',
        icon: <button>링크 복사</button>
      },
      {
        key: '3',
        label: (
          <Switch
            checkedChildren="공유 화면 미리보기"
            unCheckedChildren="편집 하기"
            onChange={() => {
              setSpaceMode(mode === 'view' ? 'edit' : 'view')
            }}
          />
        )
      },
      {
        key: '4',
        danger: true,
        label: '삭제하기'
      }
    ],
    [mode]
  )

  return (
    <div className={styles.container}>
      <div className={styles.profileImageCover}>
        <img src={user.profileImg} alt={`${user.username} profile`} />
      </div>
      <div className={styles.profile}>
        <h2>{user.username}</h2>
        <p>이 설명란은 아직 추가되지 않음</p>
        <div>
          <div>팔로워 0</div>
          <div>팔로잉 0</div>
        </div>
      </div>
      <div>
        <DropDownMenu statefulKeys={['1', '3']} items={items}>
          <button>kebob btn</button>
        </DropDownMenu>
      </div>
    </div>
  )
}
