import { loadableReady } from '@loadable/component'
import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import QueryContext from './contexts/QueryContext'
import { SSRProvider } from './contexts/SSRContext'
import { Router } from './router'

void loadableReady(() => {
  hydrateRoot(
    document.getElementById('root') as HTMLDivElement,
    <SSRProvider data={{}}>
      <QueryContext>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
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
