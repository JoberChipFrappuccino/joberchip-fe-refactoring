import { ConfirmModal } from '@/components/Modal/ConfirmModal'
import { DropDownMenu } from '@/components/SharePage/DropDownMenu'
import { TreeDrawer } from '@/components/Tree/TreeDrawer'
import { useSharePageStore } from '@/store/sharePage'
import { ModalPortal } from '@/templates/ModalPortal'
import { Switch } from 'antd'
import { useMemo, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import styles from './Profile.module.scss'
import { ProfileForm } from './ProfileForm'

export function Profile() {
  const [openConfirmModal, setConfirmModal] = useState(false)
  const { mode, setSharePageMode, sharePage } = useSharePageStore()
  const items = useMemo(
    () => [
      {
        key: `${sharePage.pageId}-profile-1`,
        label: <Switch className={styles.switchBtn} onChange={() => {}} />,
        icon: '공개설정'
      },
      {
        key: 'Profile-divider-1',
        type: 'divider'
      },
      {
        key: `${sharePage.pageId}-profile-2`,
        icon: <TreeDrawer />
      },
      {
        key: 'Profile-divider-2',
        type: 'divider'
      },
      {
        key: `${sharePage.pageId}-profile-4`,
        label: (
          <Switch
            checkedChildren="공유 화면 미리보기"
            unCheckedChildren="편집 하기"
            onChange={() => setSharePageMode(mode === 'view' ? 'edit' : 'view')}
          />
        )
      }
      // {
      //   key: 'Profile-divider-4',
      //   type: 'divider'
      // },
      // {
      //   key: `${sharePage.pageId}-profile-5`,
      //   danger: true,
      //   label: '삭제하기',
      //   onClick: () => setConfirmModal(true)
      // }
    ],
    [mode]
  )

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.profileCover}>
          <div className={styles.profileImageCover}>
            <img src={sharePage.pageProfileImage ?? '/default_profile.png'} alt={`${sharePage.title} thumbnail`} />
          </div>
          <div className={styles.profile}>
            {mode === 'view' ? (
              <>
                <h2>{sharePage.title}</h2>
                <p>{sharePage.description}</p>{' '}
              </>
            ) : (
              <ProfileForm />
            )}
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
              <Link to="/">{'스페이스 홈 바로가기 >'}</Link>
            </nav>
          </div>
          <div>
            {sharePage.previlige?.edit && (
              <DropDownMenu
                statefulKeys={[
                  `${sharePage.pageId}-profile-1`,
                  `${sharePage.pageId}-profile-4`,
                  `${sharePage.pageId}-profile-5`
                ]}
                items={items}
              >
                <div className={styles.iconCover}>
                  <BsThreeDotsVertical className={styles.icon} />
                </div>
              </DropDownMenu>
            )}
          </div>
        </div>
        {/* // CASE : 이 부분은 Root Page일 경우 또는 편집 권한이 있는 경우만 나와야합니다  */}
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
        {openConfirmModal && (
          <ModalPortal>
            <ConfirmModal
              onConfirm={(isConfirm) => {
                alert(isConfirm ? '삭제 되었어요 (미구현)' : '취소 되었어요 (미구현)')
                setConfirmModal(false)
              }}
              cancelBtnText="취소"
              confirmBtnText="삭제하기"
            >
              <p
                style={{
                  margin: 0,
                  marginBottom: '10px'
                }}
              >
                진짜 지웁니다?
              </p>
              <p
                style={{
                  margin: 0
                }}
              >
                복구 못해요?
              </p>
            </ConfirmModal>
          </ModalPortal>
        )}
      </div>
    </div>
  )
}
