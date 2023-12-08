import { Suspense } from 'react'
import { Helmet } from 'react-helmet'
import { Header, LeftMenu, HomeLogo } from '@/components/Common/Menus'
import SpaceContent from '@/components/SpacePage/SpaceContent'
import styles from './Space.module.scss'

export default function Space() {
  return (
    <>
      <Header>
        <LeftMenu />
        <HomeLogo />
      </Header>
      <div className={styles.container}>
        <Helmet>
          <title>Jober Chip</title>
          <meta name="description" content="Jober Chip Home Page" />
        </Helmet>
        <Suspense fallback={<h1>사용자 정보 불러오는 중...</h1>}>
          <SpaceContent />
        </Suspense>
      </div>
    </>
  )
}
