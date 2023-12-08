import { ErrorBoundary } from 'react-error-boundary'
import { Helmet } from 'react-helmet'
import { Navigate } from 'react-router-dom'
import { Header, LeftMenu, HomeLogo } from '@/components/Common/Menus'
import SpaceContent from '@/components/SpacePage/SpaceContent'
import styles from './Space.module.scss'

export default function Space() {
  return (
    <>
      <Header>
        <ErrorBoundary fallback={<Navigate to="/signin" />}>
          <LeftMenu />
        </ErrorBoundary>
        <HomeLogo />
      </Header>
      <div className={styles.container}>
        <Helmet>
          <title>Jober Chip</title>
          <meta name="description" content="Jober Chip Home Page" />
        </Helmet>
        <ErrorBoundary fallback={<Navigate to="/signin" />}>
          <SpaceContent />
        </ErrorBoundary>
      </div>
    </>
  )
}
