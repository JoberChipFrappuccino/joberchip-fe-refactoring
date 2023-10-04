import { Drawer } from '@/components/SharePage/Drawer'
import { Profile } from '@/components/SharePage/Profile'
import { BlocksViewer } from '@/components/SharePage/SharePageBlocksViewer'
import { SEO, SPACE } from '@/constants'
import useServerSideProps from '@/hooks/serverSideProps'
import { type SharePage } from '@/models/space'
import { useSharePageStore } from '@/store/sharePage'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import styles from './SharePage.module.scss'

interface PageSource {
  title: Record<string, string>
  description: Record<string, string>
}

type Params = {
  spaceId: string
}

export default function ShareableSpace() {
  const pageSource: PageSource = useServerSideProps(SEO)
  const SSRSpace: SharePage = useServerSideProps(SPACE)
  const { sharePage, loadSharePage, setSharePage, isLoaded, isFetching, setSharePageMode } = useSharePageStore()
  const { spaceId } = useParams<Params>()
  useEffect(() => {
    // CASE : CSR
    // react 내부적으로 주소를 이동할 경우 space를 다시 로드합니다.
    if (!SSRSpace?.pageId) {
      loadSharePage(spaceId ?? '')
      return
    }

    // CASE : CSR
    // SSR로 로드한 spaceId와 이동할 space가 다르다면 space를 다시 로드합니다.
    if (SSRSpace?.pageId !== spaceId) {
      loadSharePage(spaceId ?? '')
      return
    }

    // CASE : SSR
    // HACK : 권한은 임시로 업데이트하는 척 합니다.
    const nextSpace: SharePage = {
      ...SSRSpace,
      privilege: {
        edit: SSRSpace.pageId === 'space1',
        delete: SSRSpace.pageId === 'space1'
      }
    }
    if (nextSpace?.privilege?.edit) setSharePageMode('edit')
    // HACK : width, height를 number로 변환합니다. 10/6 이전까지 backend API연동 후 삭제합니다.
    nextSpace.children.forEach((block) => {
      block.w = Number(block.width)
      block.h = Number(block.height)
    })
    setSharePage(nextSpace)
  }, [spaceId])

  useEffect(() => {
    // CASE : CSR
    // HACK : fetch가 완료되면 페이지 권한을 체크 후 업데트합니다.
    if (!isFetching) {
      const nextSpace: SharePage = {
        ...sharePage,
        privilege: {
          edit: sharePage.pageId === 'space1',
          delete: sharePage.pageId === 'space1'
        }
      }
      if (nextSpace?.privilege?.edit) setSharePageMode('edit')
      setSharePage(nextSpace)
    }
  }, [isFetching])

  if (sharePage?.pageId !== spaceId) return <div>...loading</div>

  return (
    <>
      <Helmet>
        {/* // TODO : default pageSource + SSR일 경우 두 가지로 분기해야함 */}
        <title>{pageSource.title['/']}</title>
      </Helmet>
      {isLoaded && <Profile />}
      <aside>{<Drawer />}</aside>
      <div className={styles.viewer}>
        <div className={styles.spaceViewer}>
          <section>{isLoaded && <BlocksViewer />}</section>
        </div>
      </div>
    </>
  )
}
