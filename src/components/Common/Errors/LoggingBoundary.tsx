import { type AxiosError, isAxiosError } from 'axios'
import React, { type ErrorInfo, type PropsWithChildren } from 'react'

export type LoggingBoundaryBaseProps<TError> = PropsWithChildren<{
  onReset?: () => void
  caught?: (error: unknown) => error is TError
}>
type LoggingBoundaryProps<TError> = LoggingBoundaryBaseProps<TError>
interface LoggingBoundaryState<TError> {
  error: TError | Error | null
}

/**
 * @description RenderToString이 Suspense를 완벽하게 지원하지 않기 떄문에 에러시 로깅만 합니다.
 */
export class LoggingBoundary<TError = Error> extends React.Component<
  LoggingBoundaryProps<TError>,
  LoggingBoundaryState<TError>
> {
  public state: LoggingBoundaryState<TError> = {
    error: null
  }

  constructor(props: LoggingBoundaryProps<TError>) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error: Error): LoggingBoundaryState<Error> {
    if (process.env.NODE_ENV === 'development') {
      console.error('__________ getDerivedStateFromError _________')
      console.error(error)
    }
    return { error }
  }

  // commit phase에서 호출됩니다. 에러 로그를 기록할 떄 사용합니다.
  componentDidCatch(error: unknown, _errorInfo: ErrorInfo) {
    if (this.defaultCaught(error)) {
      this.setState({ error })
    } else if (this.axiosCaught(error)) {
      this.setState({ error })
    }
  }

  render() {
    if (process.env.NODE_ENV === 'development') {
      if (JSON.stringify(this.state.error).includes('entire root will switch to client rendering')) {
        return this.props.children
      }
    }
    return this.props.children
  }

  protected defaultCaught(error: unknown): error is Error {
    return error instanceof Error
  }

  protected axiosCaught(error: unknown): error is AxiosError {
    return isAxiosError(error)
  }
}
