import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import { BreadCrumbBox, Header, LeftMenu } from '@/components/Common/Menus'
import { Drawer } from '@/components/SharePage/Drawer'
import { Profile } from '@/components/SharePage/Profile'
import { BlocksViewer } from '@/components/SharePage/SharePageBlocksViewer'
import { SEO, SPACE } from '@/constants'
import { type SharePage } from '@/models/space'
import { useSharePageStore } from '@/store/sharePage'
import useServerSideProps from '@/hooks/serverSideProps'

interface PageSource {
  title: string
  description: string
  profileImageLink: string
}

export default function ShareableSpace() {
  const pageSource: PageSource = useServerSideProps(SEO)
  const SSRSpace: SharePage = useServerSideProps(SPACE)
  const { sharePage, loadSharePageFromBack, setSharePage, isLoaded, isFetching, setSharePageMode } = useSharePageStore()
  const { pageId } = useParams<Record<string, string>>()

  useEffect(() => {
    // CASE : CSR
    // react 내부적으로 주소를 이동할 경우 space를 다시 로드합니다.
    // SSR시 데이터가 없는 경우도 여기에서 처리합니다.
    if (!SSRSpace?.pageId) {
      loadSharePageFromBack(pageId ?? '')
      return
    }

    // CASE : CSR
    // SSR로 로드한 spaceId와 이동할 space가 다르다면 space를 다시 로드합니다.
    if (SSRSpace?.pageId !== pageId) {
      loadSharePageFromBack(pageId ?? '')
      return
    }

    // CASE : SSR
    const nextSpace: SharePage = {
      ...SSRSpace
    }
    if (nextSpace.privilege === 'EDIT') setSharePageMode('edit')
    setSharePage(nextSpace)
  }, [pageId])

  // CASE : CSR
  // SSR시 isFetching은 항상 false라서 해당 Effect는 동작하지 않습니다.
  useEffect(() => {
    if (!isFetching) {
      const nextSpace: SharePage = {
        ...sharePage
      }
      if (nextSpace.privilege === 'EDIT') setSharePageMode('edit')
      setSharePage(nextSpace)
    }
  }, [isFetching])

  return (
    <>
      <Header>
        <LeftMenu />
        <BreadCrumbBox />
      </Header>
      <Helmet>
        <title>{pageSource.title ? `Jober chip | ${pageSource.title}` : 'Jober'}</title>
        <meta name="description" content={pageSource.description ?? ''} />
        <link rel="favicon" href={pageSource.profileImageLink ?? '/favicon.ico'} />
      </Helmet>
      {isLoaded && <Profile />}
      {<Drawer />}
      {sharePage?.pageId === pageId && isLoaded && <BlocksViewer />}
    </>
  )
}
