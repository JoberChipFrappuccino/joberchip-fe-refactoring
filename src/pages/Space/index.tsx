import { Suspense } from 'react'
import { Helmet } from 'react-helmet'
import { Header, LeftMenu, HomeLogo } from '@/components/Common/Menus'
import SpaceContent from '@/components/SpacePage/SpaceContent'
import { useServerSideProps } from '@/hooks/serverSideProps'
import styles from './Space.module.scss'

export default function Space() {
  const { isServerSide } = useServerSideProps()
  return (
    <>
      <Helmet>
        <title>Jober Chip</title>
        <meta name="description" content="Jober Chip Home Page" />
      </Helmet>
      {!isServerSide && (
        <>
          <Header>
            <LeftMenu />
            <HomeLogo />
          </Header>
          <div className={styles.container}>
            <Suspense>
              <SpaceContent />
            </Suspense>
          </div>
        </>
      )}
    </>
  )
}
