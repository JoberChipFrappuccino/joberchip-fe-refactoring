import classNames from 'classnames'
import { Helmet } from 'react-helmet'
import { GroupSpace } from '@/components/SpacePage/GroupSpace'
import { GroupSpaceItem } from '@/components/SpacePage/GroupSpaceItem'
import { Search } from '@/components/SpacePage/Search'
import { UserProfile } from '@/components/SpacePage/UserProfile'
import { type SpaceList } from '@/models/space'
import { type User } from '@/models/user'
import { toast } from '@/utils/toast'
import { useSpaceList } from '@/hooks/spaceList'
import { useUser } from '@/hooks/user'
import styles from './Space.module.scss'

export default function Space() {
  const { user, isSignedIn } = useUser()
  const { data, status, message, isLoaded } = useSpaceList(user.userId)

  // TODO : Controller 로직 hooks로 이동
  if (isLoaded && status === 'failure') {
    toast(message, status)
  }

  if (!isSignedIn) return null

  return (
    <div className={styles.container}>
      <Helmet>
        <title>Jober Chip</title>
      </Helmet>
      <div className={styles.cover}>
        <Search />
        <UserProfile />
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
        <div key={`${type}-item-${space.spaceId}`}>
          <GroupSpaceItem link={`/space/${space.mainPageId}`} text={space.mainPageTitle} />
          <div className={classNames(spaces.length - 1 !== i && styles.divider)} />
        </div>
      )
    })
}
