import { ConfirmModal } from '@/components/Modal/ConfirmModal'
import { DropDownMenu } from '@/components/SharePage/DropDownMenu'
import { TreeDrawer } from '@/components/Tree/TreeDrawer'
import { useSharePageStore } from '@/store/sharePage'
import ModalPortal from '@/templates/ModalPortal'
import { clip } from '@/utils/copy'
import { Switch } from 'antd'
import { useMemo, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import styles from './Profile.module.scss'

export function Profile() {
  const [openConfirmModal, setConfirmModal] = useState(false)
  const { mode, setSpaceMode, sharePage } = useSharePageStore()
  const items = useMemo(
    () => [
      {
        key: `${sharePage.pageId}-profile-1`,
        label: <Switch onChange={() => {}} />,
        icon: <p>공개설정</p>
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
        key: `${sharePage.pageId}-profile-3`,
        label: '링크 복사',
        onClick: () => {
          clip(`http://localhost:5173/space/${sharePage.pageId}`)
        }
      },
      {
        key: 'Profile-divider-3',
        type: 'divider'
      },
      {
        key: `${sharePage.pageId}-profile-4`,
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
        key: 'Profile-divider-4',
        type: 'divider'
      },
      {
        key: `${sharePage.pageId}-profile-5`,
        danger: true,
        label: '삭제하기',
        onClick: () => {
          setConfirmModal(true)
        }
      }
    ],
    [mode]
  )

  return (
    <div className={styles.container}>
      <div className={styles.profileCover}>
        <div className={styles.profileImageCover}>
          <img src={sharePage.pageProfileImage} alt={`${sharePage.title} thumbnail`} />
        </div>
        <div className={styles.profile}>
          <h2>{sharePage.title}</h2>
          <p>{sharePage.description}</p>
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
            <Link to="/">{'스페이스 홈 바로가기 >'}</Link>
          </nav>
        </div>
        <div>
          {sharePage.previlige.edit && (
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
  )
}
