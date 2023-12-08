import React, { type ErrorInfo, type PropsWithChildren } from 'react'

export type ErrorBoundaryBaseProps<TError> = PropsWithChildren<{
  onReset?: () => void
  caught?: (error: unknown) => error is TError
}>

type ErrorBoundaryProps<TError> = ErrorBoundaryBaseProps<TError>

interface ErrorBoundaryState<TError> {
  error: TError | Error | null
}

class ErrorBoundary<TError = Error> extends React.Component<ErrorBoundaryProps<TError>, ErrorBoundaryState<TError>> {
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

export default ErrorBoundary

/**
 * @see https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary
 */
