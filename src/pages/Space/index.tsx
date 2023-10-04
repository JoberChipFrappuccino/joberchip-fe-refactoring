import { GroupSpace } from '@/components/Space/GroupSpace'
import { GroupSpaceItem } from '@/components/Space/GroupSpaceItem'
import { Search } from '@/components/Space/Search'
import { UserProfile } from '@/components/Space/UserProfile'
import { useSpaceList } from '@/hooks/spaceList'
import { type SpaceList } from '@/models/space'
import { type User } from '@/models/user'
import { useUserStore } from '@/store/user'
import classNames from 'classnames'
import styles from './Space.module.scss'

export default function Space() {
  const { user } = useUserStore()
  const { data, status, message, isLoaded } = useSpaceList(user.userId)

  // TODO : TOAST UI로 수정하기
  if (isLoaded && status === 'failure') alert(message)

  return (
    <div className={styles.container}>
      <div className={styles.cover}>
        <Search />
        <UserProfile />
        <GroupSpace key="personal-space" title="개인 스페이스 (백엔드 서버 API를 호출)">
          {GroupItemsByParticipationType('OWNER', data, user)}
        </GroupSpace>
        <GroupSpace title="단체 스페이스">
          <GroupSpaceItem key="group-space" text="자버 회사 소개 스페이스 (임시)" link="/space/space1" />
          {GroupItemsByParticipationType('PARTICIPANT', data, user)}
        </GroupSpace>
      </div>
    </div>
  )
}

function GroupItemsByParticipationType(type: ParticipationType, spaceList: SpaceList[] | null, user: User) {
  return spaceList
    ?.filter((space) => space.participationType === type)
    .map((space, i, spaces) => {
      return (
        <>
          <GroupSpaceItem
            key={`${type}-item-${space.spaceId}`}
            link={`/temp/space/${space.mainPageId}`}
            text={space.mainPageTitle}
          />
          <div className={classNames(spaces.length - 1 !== i && styles.divider)} />
        </>
      )
    })
}
