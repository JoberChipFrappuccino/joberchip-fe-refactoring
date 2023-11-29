import { Switch } from 'antd'
import { useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { editPageProfileAPI } from '@/api/space'
import { ConfirmModal } from '@/components/Modal/ConfirmModal'
import { DropDownMenu } from '@/components/SharePage/DropDownMenu'
import { TreeDrawer } from '@/components/Tree/TreeDrawer'
import { useSharePageStore } from '@/store/sharePage'
import { useUserStore } from '@/store/user'
import { ModalPortal } from '@/templates/ModalPortal'
import { clip } from '@/utils/copy'
import { toast } from '@/utils/toast'
import { useSpaceList } from '@/hooks/spaceList'
import styles from './Profile.module.scss'
import { ProfileForm } from './ProfileForm'
import { ProfileImageForm } from './ProfileImageForm'

export function Profile() {
  const [openConfirmModal, setConfirmModal] = useState(false)
  const { mode, setSharePageMode, sharePage } = useSharePageStore()
  const { user } = useUserStore()
  const { data } = useSpaceList(user.userId)

  const rootPage = data?.find((page) => page.mainPageId === sharePage.pageId)

  const items = [
    {
      key: `${sharePage.pageId}-profile-1`,
      label: (
        <Switch
          className={styles.switchBtn}
          onChange={() => {
            const form = new FormData()
            form.append('visible', !sharePage.visible ? 'true' : 'false')
            editPageProfileAPI(sharePage.pageId, form)
          }}
          defaultChecked={sharePage.visible}
        />
      ),
      icon: '공개설정'
    },
    {
      key: 'Profile-divider-1',
      type: 'divider'
    },
    rootPage?.mainPageId
      ? {
          key: `${sharePage.pageId}-profile-4`,
          label: (
            <button className={styles.kebobBtn} onClick={() => clip(window.location.href)}>
              링크 복사
            </button>
          )
        }
      : {
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
  ]

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.profileCover}>
          <div className={styles.profileImageCover}>
            {mode === 'view' ? (
              <img src={sharePage.profileImageLink} alt={`${sharePage.title} thumbnail`} />
            ) : (
              <ProfileImageForm />
            )}
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
            {rootPage?.mainPageId && sharePage.privilege === 'EDIT' && (
              <>
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
                  <a href="/">
                    스페이스 홈 바로가기
                    <MdOutlineKeyboardArrowRight />
                  </a>
                </nav>
              </>
            )}
          </div>
          <div>
            {sharePage.privilege === 'EDIT' && (
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
        {rootPage?.mainPageId && sharePage.privilege === 'EDIT' && (
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
        )}
        {openConfirmModal && (
          <ModalPortal>
            <ConfirmModal
              onConfirm={(isConfirm) => {
                toast(isConfirm ? '삭제 되었습니다.' : '취소 되었습니다.', 'success', { autoClose: 500 })
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
