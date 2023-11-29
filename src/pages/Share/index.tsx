import { Helmet } from 'react-helmet'
import { BreadCrumbBox, Header, LeftMenu } from '@/components/Common/Menus'
import { Drawer } from '@/components/SharePage/Drawer'
import { Profile } from '@/components/SharePage/Profile'
import { BlocksViewer } from '@/components/SharePage/SharePageBlocksViewer'
import { SEO } from '@/constants'
import useServerSideProps from '@/hooks/serverSideProps'
import { useSharePageStateManager } from '@/hooks/useSharePage'

interface PageSource {
  title: string
  description: string
  profileImageLink: string
}

export default function ShareableSpace() {
  const pageSource: PageSource = useServerSideProps(SEO)
  const { isLoaded } = useSharePageStateManager()

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
      {isLoaded && (
        <>
          <Profile />
          <Drawer />
          <BlocksViewer />
        </>
      )}
    </>
  )
}