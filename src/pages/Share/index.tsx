import { Suspense, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { BreadCrumbBox, Header, LeftMenu } from '@/components/Common/Menus'
import { BlocksViewer } from '@/components/SharePage/DnDViewer/BlocksViewer'
import { Drawer } from '@/components/SharePage/Drawer/Drawer'
import { Profile } from '@/components/SharePage/Profile/Profile'
import { SEO } from '@/constants'
import { useSharePageQuery } from '@/hooks/queries/useSharePageQuery'
import { useSharePageModeStore } from '@/store/sharePage'
import { useServerSideProps } from '@/hooks/serverSideProps'
import '@/styles/reactGridLayout.scss'
interface PageSource {
  title: string
  description: string
  profileImageLink: string
}

export default function SharePage() {
  const { source, isServerSide } = useServerSideProps<PageSource>(SEO)
  const { pageId, isSuccess, sharePage } = useSharePageQuery()
  const { setSharePageMode } = useSharePageModeStore()

  useEffect(() => {
    if (!isSuccess) return
    if (typeof sharePage.privilege === 'string') setSharePageMode(sharePage.privilege)
    else setSharePageMode('VIEW')
  }, [pageId, isSuccess])

  return (
    <>
      <Helmet>
        <title>{source.title ? `Jober chip | ${source.title}` : 'Jober'}</title>
        <meta name="description" content={source.description ?? ''} />
        <link rel="favicon" href={source.profileImageLink ?? '/favicon.ico'} />
        <meta property="og:title" content={source.title ?? ''} />
        <meta property="og:description" content={source.description ?? ''} />
        <meta property="og:image" content={source.profileImageLink ?? '/favicon.ico'} />
      </Helmet>
      {!isServerSide && (
        <>
          <Header>
            <Suspense>
              <LeftMenu />
            </Suspense>
            <Suspense>
              <BreadCrumbBox />
            </Suspense>
          </Header>
          <Profile />
          <Drawer />
        </>
      )}
      {/* 소스 페이지에 Block 정보를 추가합니다. */}
      {isSuccess && <BlocksViewer />}
    </>
  )
}
