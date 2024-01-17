import { isAxiosError } from 'axios'
import React, { type ErrorInfo, type PropsWithChildren } from 'react'

export type NotFoundErrorBoundaryBaseProps<TError> = PropsWithChildren<{
  onReset?: () => void
  caught?: (error: unknown) => error is TError
}>
type NotFoundErrorBoundaryProps<TError> = NotFoundErrorBoundaryBaseProps<TError>
interface NotFoundErrorBoundaryState<TError> {
  error: TError | Error | null
}

/**
 * @note 400번 에러는 NotFound로 처리합니다. {@link https://www.notion.so/72d474ef1cfd45cf81feaade1ce4b9fc}를 참고해주세요
 */
export class NotFoundErrorBoundary<TError = Error> extends React.Component<
  NotFoundErrorBoundaryProps<TError>,
  NotFoundErrorBoundaryState<TError>
> {
  public state: NotFoundErrorBoundaryState<TError> = {
    error: null
  }

  constructor(props: NotFoundErrorBoundaryProps<TError>) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error: Error): NotFoundErrorBoundaryState<Error> {
    return { error }
  }

  componentDidCatch(error: unknown, _errorInfo: ErrorInfo) {
    if (isAxiosError(error)) {
      error.response?.status === 400 && this.setState({ error })
      return
    }
    throw error
  }

  render() {
    if (this.state.error) {
      if (process.env.NODE_ENV === 'development') console.error('CATCH NOT FOUND ERROR BOUNDARY :', this.state.error)
      return <h1>NOT FOUND</h1>
    }
    return this.props.children
  }
}
