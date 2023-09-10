import { Drawer } from '@/components/Space/Drawer'
import { SpaceActionBar } from '@/components/Space/SpaceActionBar'
import { SpaceViewer } from '@/components/Space/SpaceViewer'
import { SEO } from '@/constants'
import useServerSideProps from '@/hooks/serverSideProps'
import { useSpaceStore } from '@/store/space'
import { useSpaceModeStore } from '@/store/spaceMode'
import { useUserStore } from '@/store/user'
import loadable from '@loadable/component'
import { Button } from 'antd'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet'

import styles from './Space.module.scss'
// ! API가 연동 되지 않아 text dose not matched 에러가 서버에서 발생합니다!
const TreeTest = loadable(async () => await import('../../components/TreeTest'), { ssr: false })
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
    if (!user.user_id) return
    loadSpace(user.user_id)
  }, [isSignedIn])

  return (
    <nav>
      <Helmet>
        <title>{pageSource.title['/']}</title>
      </Helmet>
      <div className={styles.container}>
        <h1 className={styles.title}>Home Page</h1>
      </div>
      {space.previlige.edit && (
        <Button
          onClick={() => {
            setSpaceMode(mode === 'view' ? 'edit' : 'view')
          }}
        >
          {mode === 'view' ? '수정 하기' : '공유 화면 보기'}
        </Button>
      )}
      <aside>{isLoaded && isSignedIn && <Drawer />}</aside>
      <p>위 버튼들 눌러서 테스트해주세요.</p>
      <p>
        768px 이하에서는 resize 버튼 모두 활성화 (모바일이라고 가정, 원래는 서버에서 접속 로그로 모바일 | 데스크탑
        구분해야함)
      </p>
      <p>768px이상일 경우 mouse가 hover 되면 resize 버튼 활성화</p>
      <div className={styles.viewer}>
        {/*
        하림님 여기 왼쪽 GNB 영역이예요.
        여기다가 더미 데이터를 넣어서 만들어주시면 됩니당.
        <div>Navigation Position</div>
        */}
        <div className={styles.spaceViewer}>
          <section>{isLoaded && isSignedIn && <SpaceViewer />}</section>
        </div>
        <TreeTest />
      </div>
      <SpaceActionBar />
    </nav>
  )
}
