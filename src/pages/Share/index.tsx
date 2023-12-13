import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { BreadCrumbBox, Header, LeftMenu } from '@/components/Common/Menus'
import { SSRSuspense } from '@/components/Common/SSRSuspense'
import { BlocksViewer } from '@/components/SharePage/DnDViewer/BlocksViewer'
import BlocksViewerSkeleton from '@/components/SharePage/DnDViewer/BlocksViewerSkeleton'
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
  const { source } = useServerSideProps<PageSource>(SEO)
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
      <SSRSuspense fallback={<BlocksViewerSkeleton />}>
        <Header>
          <LeftMenu />
          <BreadCrumbBox />
        </Header>
        <Profile />
        <Drawer />
        <BlocksViewer />
      </SSRSuspense>
    </>
  )
}
