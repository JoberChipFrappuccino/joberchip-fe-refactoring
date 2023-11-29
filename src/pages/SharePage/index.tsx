import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import { Drawer } from '@/components/SharePage/Drawer'
import { Profile } from '@/components/SharePage/Profile'
import { BlocksViewer } from '@/components/SharePage/SharePageBlocksViewer'
import { SEO, SPACE } from '@/constants'
import { type SharePage } from '@/models/space'
import { useSharePageStore } from '@/store/sharePage'
import useServerSideProps from '@/hooks/serverSideProps'
import styles from './SharePage.module.scss'

interface PageSource {
  title: string
  description: string
}

type Params = {
  pageId: string
}

export default function ShareableSpace() {
  const pageSource: PageSource = useServerSideProps(SEO)
  const SSRSpace: SharePage = useServerSideProps(SPACE)
  const { sharePage, loadSharePage, setSharePage, isLoaded, isFetching, setSharePageMode } = useSharePageStore()
  const { pageId } = useParams<Params>()

  useEffect(() => {
    // CASE : CSR
    // react 내부적으로 주소를 이동할 경우 space를 다시 로드합니다.
    if (!SSRSpace?.pageId) {
      loadSharePage(pageId ?? '')
      return
    }

    // CASE : CSR
    // SSR로 로드한 pageId와 이동할 space가 다르다면 space를 다시 로드합니다.
    if (SSRSpace?.pageId !== pageId) {
      loadSharePage(pageId ?? '')
      return
    }

    // CASE : SSR
    // HACK : 권한은 임시로 업데이트하는 척 합니다.
    const nextSpace: SharePage = {
      ...SSRSpace
    }
    if (nextSpace?.privilege === 'EDIT') setSharePageMode('edit')
    setSharePage(nextSpace)
  }, [pageId])

  useEffect(() => {
    // CASE : CSR
    // HACK : fetch가 완료되면 페이지 권한을 체크 후 업데트합니다.
    if (!isFetching) {
      const nextSpace: SharePage = {
        ...sharePage
      }
      if (nextSpace?.privilege === 'EDIT') setSharePageMode('edit')
      setSharePage(nextSpace)
    }
  }, [isFetching])

  return (
    <>
      <Helmet>
        {/* // TODO : default pageSource + SSR일 경우 두 가지로 분기해야함 */}
        <title>{pageSource.title ? `Jober chip | ${pageSource.title}` : 'Jober'}</title>
      </Helmet>
      {isLoaded && <Profile />}
      <aside>{<Drawer />}</aside>
      <div className={styles.viewer}>
        <div className={styles.spaceViewer}>
          <section>{sharePage?.pageId === pageId && isLoaded && <BlocksViewer />}</section>
        </div>
      </div>
    </>
  )
}
