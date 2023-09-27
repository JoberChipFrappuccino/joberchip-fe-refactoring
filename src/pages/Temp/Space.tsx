import { Drawer } from '@/components/Space/Drawer'
import { Profile } from '@/components/Space/Profile'
import { SpaceViewer } from '@/components/Space/SpaceViewer'
import { SEO, SPACE } from '@/constants'
import useServerSideProps from '@/hooks/serverSideProps'
import { type Space } from '@/models/space'
import { useSpaceStore } from '@/store/space'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import styles from './Space.module.scss'

// ! API가 연동 되지 않아 text dose not matched 에러가 서버에서 발생합니다!
interface PageSource {
  title: Record<string, string>
  description: Record<string, string>
}

type Params = {
  spaceId: string
}

export default function TempShareableSpace() {
  const pageSource: PageSource = useServerSideProps(SEO)
  const SSRSpace: Space = useServerSideProps(SPACE)
  const { space, loadSpaceFromBack, setSpace, isLoaded, isFetching, setSpaceMode } = useSpaceStore()
  const { spaceId } = useParams<Params>()

  useEffect(() => {
    // * react 내부적으로 주소를 이동할 경우 space를 다시 로드합니다.
    if (!SSRSpace?.spaceId) {
      loadSpaceFromBack(spaceId ?? '')
      return
    }

    // * react 내부적으로 주소를 이동할 경우
    // * SSR로 로드한 spaceId와 이동할 space가 다르다면 space를 다시 로드합니다.
    if (SSRSpace?.spaceId !== spaceId) {
      loadSpaceFromBack(spaceId ?? '')
      return
    }

    // * SSR일 경우 SSRSpace를 사용합니다.
    // * 권한은 임시로 업데이트하는 척 합니다. (임시)
    const nextSpace: Space = {
      ...SSRSpace,
      previlige: {
        edit: SSRSpace.spaceId === 'space1',
        delete: SSRSpace.spaceId === 'space1'
      }
    }
    if (nextSpace.previlige.edit) setSpaceMode('edit')
    setSpace(nextSpace)
  }, [spaceId])

  useEffect(() => {
    // * fetching이 완료되면 페이지 권한을 체크 후 업데트합니다. (임시)
    if (!isFetching) {
      const nextSpace: Space = {
        ...space,
        previlige: {
          edit: space.spaceId === 'space1',
          delete: space.spaceId === 'space1'
        }
      }
      // console.log('nextSpace :', nextSpace)
      if (nextSpace.previlige.edit) setSpaceMode('edit')
      setSpace(nextSpace)
    }
  }, [isFetching])

  return (
    <>
      <Helmet>
        {/* todo : default pageSource + SSR일 경우 두 가지로 분기해야함 */}
        <title>{pageSource.title['/']}</title>
      </Helmet>
      {isLoaded && <Profile />}
      <aside>{<Drawer />}</aside>
      <div className={styles.viewer}>
        <div className={styles.spaceViewer}>
          <section>{isLoaded && <SpaceViewer />}</section>
        </div>
      </div>
    </>
  )
}
