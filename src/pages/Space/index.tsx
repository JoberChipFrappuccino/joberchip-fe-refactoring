import { Suspense } from 'react'
import { Helmet } from 'react-helmet'
import { Header, LeftMenu, HomeLogo } from '@/components/Common/Menus'
import { SSRSuspense } from '@/components/Common/SSRSuspense'
import SpaceContent from '@/components/SpacePage/SpaceContent'
import styles from './Space.module.scss'

export default function Space() {
  return (
    <>
      <Helmet>
        <title>Jober Chip</title>
        <meta name="description" content="Jober Chip Home Page" />
      </Helmet>
      <SSRSuspense fallback={<div>Loading...</div>}>
        <Header>
          <LeftMenu />
          <HomeLogo />
        </Header>
        <div className={styles.container}>
          <Suspense>
            <SpaceContent />
          </Suspense>
        </div>
      </SSRSuspense>
    </>
  )
}
