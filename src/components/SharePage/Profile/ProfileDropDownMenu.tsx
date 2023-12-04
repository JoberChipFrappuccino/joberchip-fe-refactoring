import { BsThreeDotsVertical } from '@react-icons/all-files/bs/BsThreeDotsVertical'
import { Switch } from 'antd'
import { useMemo } from 'react'
import { editPageBlockAPI } from '@/apis/page/page'
import { TreeDrawer } from '@/components/Common/Tree/TreeDrawer'
import { DropDownMenu } from '@/components/SharePage/DropDownMenu'
import { useSharePageQuery } from '@/queries/useSharePageQuery'
import { useSharePageModeStore } from '@/store/sharePage'
import { clip } from '@/utils'
import { useUser } from '@/hooks/useUser'
import styles from './ProfileDropDownMenu.module.scss'

export default function ProfileDropDownMenu() {
  const { sharePage, pageId } = useSharePageQuery()
  const { mode, setSharePageMode } = useSharePageModeStore()
  const { spaceList } = useUser()
  const rootPage = spaceList?.find((page) => page.mainPageId === pageId)

  const items = useMemo(
    () => [
      {
        key: `${pageId}-profile-1`,
        label: (
          <Switch
            className={styles.switchBtn}
            onChange={() => {
              editPageBlockAPI(pageId, { visible: !sharePage.visible })
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
            key: `${pageId}-profile-4`,
            label: (
              <button className={styles.kebobBtn} onClick={() => clip(window.location.href)}>
                링크 복사
              </button>
            )
          }
        : {
            key: `${pageId}-profile-2`,
            icon: <TreeDrawer />
          },
      {
        key: 'Profile-divider-2',
        type: 'divider'
      },
      {
        key: `${pageId}-profile-4`,
        label: (
          <Switch
            checkedChildren="공유 화면 미리보기"
            unCheckedChildren="편집 하기"
            onChange={() => setSharePageMode(mode === 'VIEW' ? 'EDIT' : 'VIEW')}
          />
        )
      }
    ],
    [pageId, mode]
  )

  return (
    <DropDownMenu statefulKeys={[`${pageId}-profile-1`, `${pageId}-profile-4`, `${pageId}-profile-5`]} items={items}>
      <div className={styles.iconCover}>
        <BsThreeDotsVertical className={styles.icon} />
      </div>
    </DropDownMenu>
  )
}
