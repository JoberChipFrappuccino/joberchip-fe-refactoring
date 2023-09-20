import { DropDownMenu } from '@/components/Space/DropDownMenu'
import { type Space } from '@/models/space'
import { useSpaceModeStore } from '@/store/spaceMode'
import { Switch } from 'antd'
import { useMemo } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { TreeDrawer } from '../Tree/TreeDrawer'
import styles from './Profile.module.scss'

type Props = {
  space: Space
}
export function Profile({ space }: Props) {
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
        icon: <TreeDrawer />
      },
      {
        key: '3',
        icon: <button>링크 복사</button>
      },
      {
        key: '4',
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
        key: '5',
        danger: true,
        label: '삭제하기'
      }
    ],
    [mode]
  )

  return (
    <div className={styles.container}>
      <div className={styles.profileCover}>
        <div className={styles.profileImageCover}>
          <img src={space.profileImage} alt={`${space.title} thumbnail`} />
        </div>
        <div className={styles.profile}>
          <h2>{space.title}</h2>
          <p>{space.description}</p>
          <ul className={styles.followCover}>
            <li>
              <span>팔로워</span>
              <span>0</span>
            </li>
            <li>
              <span>팔로잉</span>
              <span>0</span>
            </li>
          </ul>
          <nav className={styles.navCover}>
            {/* 이거 하드코딩한 장식용임 이 녀석의 처우는 나중에 생각하자 */}
            <a href="">{'스페이스 홈 바로가기 >'}</a>
          </nav>
        </div>
        <div>
          {space.previlige.edit && (
            <DropDownMenu statefulKeys={['1', '3']} items={items}>
              <div className={styles.iconCover}>
                <BsThreeDotsVertical className={styles.icon} />
              </div>
            </DropDownMenu>
          )}
        </div>
      </div>
      {/* 이 부분은 Space Home일 경우 && Admin일 경우만 나와야합니다  */}
      <ul className={styles.messageCover}>
        <li>
          <p>3</p>
          <p>발송전</p>
        </li>
        <li>
          <p>5</p>
          <p>발송후</p>
        </li>
        <li>
          <p>1</p>
          <p>미확인</p>
        </li>
      </ul>
    </div>
  )
}
