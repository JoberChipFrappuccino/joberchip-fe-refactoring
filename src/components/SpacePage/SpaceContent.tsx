import classNames from 'classnames'
import { useSpaceListQuery } from '@/hooks/queries/useSpaceListQuery'
import { type SpaceList } from '@/models/space'
import { GroupSpace } from './GroupSpace'
import { GroupSpaceItem } from './GroupSpaceItem'
import { Search } from './Search'
import styles from './SpaceContent.module.scss'
import { UserProfile } from './UserProfile'

export default function SpaceContent() {
  const { spaceList } = useSpaceListQuery()

  return (
    <div className={styles.container}>
      <Search />
      <UserProfile />
      <GroupSpace key="personal-space" title="개인 스페이스">
        {GetGroupItemsByParticipationType('OWNER', spaceList)}
      </GroupSpace>
      <GroupSpace title="단체 스페이스">
        <GroupSpaceItem key="group-space" text="자버 회사 소개 스페이스" link="/" />
        {GetGroupItemsByParticipationType('PARTICIPANT', spaceList)}
      </GroupSpace>
    </div>
  )
}

function GetGroupItemsByParticipationType(type: ParticipationType, spaceList: SpaceList | null) {
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
