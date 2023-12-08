import React, { type ErrorInfo, type PropsWithChildren } from 'react'

export type ErrorBoundaryBaseProps<TError> = PropsWithChildren<{
  onReset?: () => void
  caught?: (error: unknown) => error is TError
}>
type ErrorBoundaryProps<TError> = ErrorBoundaryBaseProps<TError>
interface ErrorBoundaryState<TError> {
  error: TError | Error | null
}

/**
 * @deprecated RenderToString이 Suspense를 완벽하게 지원하지 않기 떄문에 커스텀 에러 바운더리를 사용하지 않습니다.
 * @see https://react.dev/reference/react-dom/server/renderToString#when-a-component-suspends-the-html-always-contains-a-fallback
 */
export class ErrorBoundary<TError = Error> extends React.Component<
  ErrorBoundaryProps<TError>,
  ErrorBoundaryState<TError>
> {
  public state: ErrorBoundaryState<TError> = {
    error: null
  }

  constructor(props: ErrorBoundaryProps<TError>) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState<Error> {
    return { error }
  }

  // commit phase에서 호출됩니다. 에러 로그를 기록할 떄 사용합니다.
  componentDidCatch(error: unknown, _errorInfo: ErrorInfo) {
    const defaultCaught = (error: unknown): error is Error => error instanceof Error
    const { caught = defaultCaught } = this.props
    const isErrorInstance = caught(error)
    if (isErrorInstance) {
      this.setState({ error })
      return
    }
    throw error
  }

  render() {
    if (process.env.NODE_ENV === 'development') {
      if (JSON.stringify(this.state.error).includes('entire root will switch to client rendering')) {
        return this.props.children
      }
    }
    return this.props.children
  }
}
