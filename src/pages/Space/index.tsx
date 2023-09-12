import { Drawer } from '@/components/Space/Drawer'
import { Profile } from '@/components/Space/Profile'
import { SpaceActionBar } from '@/components/Space/SpaceActionBar'
import { SpaceViewer } from '@/components/Space/SpaceViewer'
import { SEO } from '@/constants'
import useServerSideProps from '@/hooks/serverSideProps'
import { useSpaceStore } from '@/store/space'
import { useSpaceModeStore } from '@/store/spaceMode'
import { useUserStore } from '@/store/user'
import { Button } from 'antd'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet'

import styles from './Space.module.scss'
// ! API가 연동 되지 않아 text dose not matched 에러가 서버에서 발생합니다!
// const TreeTest = loadable(async () => await import('../../components/TreeTest'), { ssr: false })
interface PageSource {
  title: Record<string, string>
}

export default function SharePage() {
  const pageSource: PageSource = useServerSideProps(SEO)
  const { user, isSignedIn } = useUserStore()
  const { loadSpace, isLoaded } = useSpaceStore()
  const { mode, setSpaceMode } = useSpaceModeStore()
  const { space } = useSpaceStore()

  useEffect(() => {
    if (!user.userId) return
    loadSpace(user.userId)
  }, [isSignedIn])

  return (
    <nav>
      <Helmet>
        <title>{pageSource.title['/']}</title>
      </Helmet>
      <div className={styles.container}>
        <Profile />
      </div>
      {space.previlige.edit && (
        <Button
          onClick={() => {
            setSpaceMode(mode === 'view' ? 'edit' : 'view')
          }}
        >
          {mode === 'view' ? '공유 화면 보기' : '수정 하기'}
        </Button>
      )}
      <aside>{isLoaded && isSignedIn && <Drawer />}</aside>
      <div className={styles.viewer}>
        {/*
        여기는 왼쪽 GNB 영역이입니다
        여기다가 더미 데이터를 넣어서 만들어주시면 됩니당.
        <div>Navigation Position</div>
        */}
        <div className={styles.spaceViewer}>
          <section>{isLoaded && isSignedIn && <SpaceViewer />}</section>
        </div>
        {/* <TreeTest /> */}
      </div>
      <SpaceActionBar />
    </nav>
  )
}
