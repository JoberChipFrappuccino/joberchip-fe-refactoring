import classNames from 'classnames'
import { Helmet } from 'react-helmet'
import { GroupSpace } from '@/components/Space/GroupSpace'
import { GroupSpaceItem } from '@/components/Space/GroupSpaceItem'
import { Search } from '@/components/Space/Search'
import { UserProfile } from '@/components/Space/UserProfile'
import { type SpaceList } from '@/models/space'
import { type User } from '@/models/user'
import { useUserStore } from '@/store/user'
import { toast } from '@/utils/toast'
import { useSpaceList } from '@/hooks/spaceList'
import styles from './Space.module.scss'

export default function Space() {
  const { user, isSignedIn } = useUserStore()
  const { data, status, message, isLoaded } = useSpaceList(user.userId)

  if (isLoaded && status === 'failure') toast(message, status)

  return (
    <div className={styles.container}>
      <Helmet>
        <title>Jober Chip</title>
      </Helmet>
      <div className={styles.cover}>
        <Search />
        {isSignedIn && <UserProfile />}
        <GroupSpace key="personal-space" title="개인 스페이스">
          {GroupItemsByParticipationType('OWNER', data, user)}
        </GroupSpace>
        <GroupSpace title="단체 스페이스">
          <GroupSpaceItem key="group-space" text="자버 회사 소개 스페이스" link="/" />
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
            link={`/space/${space.mainPageId}`}
            text={space.mainPageTitle}
          />
          <div className={classNames(spaces.length - 1 !== i && styles.divider)} />
        </>
      )
    })
}
