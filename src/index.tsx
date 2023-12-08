import { loadableReady } from '@loadable/component'

import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { LoggingBoundary } from './components/Common/Errors/LoggingBoundary'
import QueryContext from './contexts/QueryContext'
import { SSRProvider } from './contexts/SSRContext'
import { Router } from './router'

// const root = createRoot(document.getElementById('root') as HTMLDivElement)
// void loadableReady(() => {
//   flushSync(() => {
//     root.render(
//       <SSRProvider data={{}}>
//         <QueryContext>
//           <BrowserRouter>
//             <Router />
//           </BrowserRouter>
//         </QueryContext>
//       </SSRProvider>
//     )
//   })
// })
void loadableReady(() => {
  hydrateRoot(
    document.getElementById('root') as HTMLDivElement,
    <SSRProvider data={{}}>
      <QueryContext>
        {/* 클라이언트 사이드 에러만 추적하기 위한 바운더리입니다. (서버 사이드는 LogginBoundary가 없습니다.) */}
        <LoggingBoundary>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </LoggingBoundary>
      </QueryContext>
    </SSRProvider>
  )
})

// https://webpack.kr/api/hot-module-replacement/
if (module.hot) {
  if (process.env.NODE_ENV === 'development') {
    module.hot.accept()
    document.querySelector('#root > *')?.remove()
  }
}
