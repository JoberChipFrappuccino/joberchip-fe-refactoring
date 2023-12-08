import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { SpaceErrorBoundary } from './SpaceErrorBoundary'
export const SpaceQueryErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset, clearReset, isReset }) => (
        <SpaceErrorBoundary
          to="/signin"
          fallbackRender={() => (
            <div>
              <h1>일시적인 에러가 발생했습니다. </h1>
              <p>잠시 후 다시 시도해주세요.</p>
            </div>
          )}
        >
          {children}
        </SpaceErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}
