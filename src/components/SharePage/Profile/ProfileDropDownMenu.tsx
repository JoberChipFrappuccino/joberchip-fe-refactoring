import { BsThreeDotsVertical } from '@react-icons/all-files/bs/BsThreeDotsVertical'
import { Switch } from 'antd'
import { useMemo } from 'react'
import { editPageBlockAPI } from '@/apis/page'
import { TreeDrawer } from '@/components/Common/Tree/TreeDrawer'
import { DropDownMenu } from '@/components/SharePage/DropDownMenu'
import { useSharePageQuery } from '@/hooks/queries/useSharePageQuery'
import { useSpaceListQuery } from '@/hooks/queries/useSpaceListQuery'
import { useSharePageModeStore } from '@/store/sharePage'
import { clip } from '@/utils'
import { getUniqueDivier } from '@/utils/SharePage'
import { useUser } from '@/hooks/useUserQuery'
import styles from './ProfileDropDownMenu.module.scss'

export default function ProfileDropDownMenu() {
  const { sharePage, pageId } = useSharePageQuery()
  const { mode, setSharePageMode } = useSharePageModeStore()
  const { user } = useUser()
  const { spaceList } = useSpaceListQuery(user.userId)
  const rootPage = spaceList?.find((page) => page.mainPageId === pageId)
  const items = useMemo(
    () => [
      {
        key: `${pageId}-profile-1`,
        label: (
          <div className={styles.switchBtn}>
            <Switch
              onChange={() => {
                editPageBlockAPI(pageId, { visible: !sharePage.visible })
              }}
              defaultChecked={sharePage.visible}
            />
          </div>
        ),
        icon: '공개설정'
      },
      getUniqueDivier(),
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
      getUniqueDivier(),
      {
        key: `${pageId}-profile-5`,
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
