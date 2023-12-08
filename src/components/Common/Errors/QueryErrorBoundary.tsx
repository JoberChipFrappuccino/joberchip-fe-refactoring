import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
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
