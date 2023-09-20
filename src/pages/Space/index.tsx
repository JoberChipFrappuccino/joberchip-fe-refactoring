import { Drawer } from '@/components/Space/Drawer'
import { Profile } from '@/components/Space/Profile'
import { SpaceViewer } from '@/components/Space/SpaceViewer'
import { SEO, SPACE } from '@/constants'
import useServerSideProps from '@/hooks/serverSideProps'
import { type Space } from '@/models/space'
import { useSpaceStore } from '@/store/space'
import { useUserStore } from '@/store/user'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import styles from './Space.module.scss'

// ! API가 연동 되지 않아 text dose not matched 에러가 서버에서 발생합니다!
// const TreeTest = loadable(async () => await import('../../components/TreeTest'), { ssr: false })
interface PageSource {
  title: Record<string, string>
  description: Record<string, string>
}

type Params = {
  spaceId: string
}

export default function SharePage() {
  const pageSource: PageSource = useServerSideProps(SEO)
  const SSRSpace: Space = useServerSideProps(SPACE)
  const { space, loadSpace, setSpace, isLoaded, isFetching } = useSpaceStore()
  const { isSignedIn } = useUserStore()
  const { spaceId } = useParams<Params>()

  useEffect(() => {
    // * CSR일 경우 space를 로드합니다.
    if (!SSRSpace?.spaceId) {
      loadSpace(spaceId ?? '')
      return
    }

    // * CSR일 경우 스페이스가 변경되었다면 space를 다시 로드합니다.
    if (SSRSpace?.spaceId !== spaceId) {
      loadSpace(spaceId ?? '')
      return
    }

    // * SSR일 경우 SSRSpace를 사용합니다.
    const nextSpace: Space = {
      ...SSRSpace,
      previlige: {
        edit: SSRSpace.spaceId === 'space1',
        delete: SSRSpace.spaceId === 'space1'
      }
    }
    setSpace(nextSpace)

    // * 페이지 권한을 확인합니다. (임시)
  }, [spaceId, isSignedIn])

  useEffect(() => {
    if (!isFetching) {
      const nextSpace: Space = {
        ...space,
        previlige: {
          edit: space.spaceId === 'space1',
          delete: space.spaceId === 'space1'
        }
      }
      setSpace(nextSpace)
    }
  }, [isFetching])

  return (
    <>
      <Helmet>
        {/* todo : default pageSource + SSR일 경우 두 가지로 분기해야함 */}
        <title>{pageSource.title['/']}</title>
      </Helmet>
      {isLoaded && <Profile space={space} />}
      <aside>{<Drawer />}</aside>
      <div className={styles.viewer}>
        <div className={styles.spaceViewer}>
          <section>{isLoaded && <SpaceViewer space={space} />}</section>
        </div>
      </div>
    </>
  )
}
