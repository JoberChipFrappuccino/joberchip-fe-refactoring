import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import useServerSideProps from '@/hooks/serverSideProps'
import { SEO } from '@/constants'
import { useUserStore } from '@/store/user'
import { useSpaceStore } from '@/store/space'
import loadable from '@loadable/component'
import { SpaceViewer } from '@/components/Space/SpaceViewer'
import { Drawer } from '@/components/Space/Drawer'
import { Button } from 'antd'
import { useSpaceModeStore } from '@/store/spaceMode'
import { SpaceActionBar } from '@/components/Space/SpaceActionBar'
// ! API가 연동 되지 않아 text dose not matched 에러가 서버에서 발생합니다!
const TreeTest = loadable(() => import('../components/TreeTest'), { ssr: false })

type PageSource = {
  title: {
    [key: string]: string
  }
}

export default function SharePage() {
  const pageSource: PageSource = useServerSideProps(SEO)
  const { user, isSignedIn } = useUserStore()
  const { loadSpace, isLoaded } = useSpaceStore()
  const { mode, setSpaceMode } = useSpaceModeStore()

  useEffect(() => {
    if (!user.user_id) return
    loadSpace(user.user_id)
  }, [isSignedIn])

  return (
    <nav>
      <Helmet>
        <title>{pageSource['title']['/']}</title>
      </Helmet>
      <div className="flex">
        <h1 className="title">Home Page</h1>
      </div>
      <Button className="prose" onClick={() => setSpaceMode(mode === 'view' ? 'edit' : 'view')}>
        {mode === 'view' ? '수정 하기' : '공유 화면 보기'}
      </Button>
      <aside>{isLoaded && isSignedIn && <Drawer />}</aside>
      <p>위 버튼들 눌러서 테스트해주세요.</p>
      <p>
        768px 이하에서는 resize 버튼 모두 활성화 (모바일이라고 가정, 원래는 서버에서 접속 로그로 모바일 | 데스크탑
        구분해야함)
      </p>
      <p>768px이상일 경우 mouse가 hover 되면 resize 버튼 활성화</p>
      <div className="flex w-full h-full">
        {/* 
        하림님 여기 왼쪽 GNB 영역이예요.
        여기다가 더미 데이터를 넣어서 만들어주시면 됩니당.
        <div>Navigation Position</div> 
        */}
        <div className="relative flex-1 w-full">
          <section>{isLoaded && isSignedIn && <SpaceViewer />}</section>
        </div>
        <TreeTest />
      </div>
      <SpaceActionBar />
    </nav>
  )
}
