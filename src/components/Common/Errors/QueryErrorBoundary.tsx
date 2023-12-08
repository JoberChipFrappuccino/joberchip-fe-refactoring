import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'

/**
 * @deprecated RenderToString이 Suspense를 완벽하게 지원하지 않기 떄문에 커스텀 에러 바운더리를 사용하지 않습니다.
 * @see https://react.dev/reference/react-dom/server/renderToString#when-a-component-suspends-the-html-always-contains-a-fallback
 */
const QueryErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset, clearReset, isReset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={() => (
            <div>
              <h1>일시적인 에러가 발생했습니다. </h1>
              <p>잠시 후 다시 시도해주세요.</p>
            </div>
          )}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}

export default QueryErrorBoundary
