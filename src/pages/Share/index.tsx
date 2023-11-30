import { Helmet } from 'react-helmet'
import { BreadCrumbBox, Header, LeftMenu } from '@/components/Common/Menus'
import { BlocksViewer } from '@/components/SharePage/DnDViewer/BlocksViewer'
import { Drawer } from '@/components/SharePage/Drawer/Drawer'
import { Profile } from '@/components/SharePage/Profile/Profile'
import { SEO } from '@/constants'
import { useSharePageQuery } from '@/queries/useSharePageQuery'
import useServerSideProps from '@/hooks/serverSideProps'

interface PageSource {
  title: string
  description: string
  profileImageLink: string
}

export default function ShareableSpace() {
  const pageSource: PageSource = useServerSideProps(SEO)
  const { isSuccess } = useSharePageQuery()

  return (
    <>
      <Header>
        <LeftMenu />
        <BreadCrumbBox />
      </Header>
      <Helmet>
        <title>{pageSource.title ? `Jober chip | ${pageSource.title}` : 'Jober'}</title>
        <meta name="description" content={pageSource.description} />
        <link rel="favicon" href={pageSource.profileImageLink ?? '/favicon.ico'} />
        <meta property="og:title" content={pageSource.title} />
        <meta property="og:description" content={pageSource.description} />
        <meta property="og:image" content={pageSource.profileImageLink} />
      </Helmet>
      {isSuccess && (
        <>
          <Profile />
          <Drawer />
          <BlocksViewer />
        </>
      )}
    </>
  )
}
