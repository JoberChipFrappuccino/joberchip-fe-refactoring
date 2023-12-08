import { type AxiosError, isAxiosError } from 'axios'
import { Component, type ErrorInfo, type ReactNode, type PropsWithChildren } from 'react'

type ErrorBoundaryExProps = PropsWithChildren<{
  fallbackRender?: () => ReactNode
  isServerSide?: boolean
}>
interface ErrroBoundaryExState<TError> {
  hasError: boolean
  error: TError | Error | null
  isServerSide?: boolean
}

/**
 * @deprecated RenderToString이 Suspense를 완벽하게 지원하지 않기 떄문에 커스텀 에러 바운더리를 사용하지 않습니다.
 * @see https://react.dev/reference/react-dom/server/renderToString#when-a-component-suspends-the-html-always-contains-a-fallback
 */
export class SharePageErrorBoundary<TError = Error> extends Component<
  ErrorBoundaryExProps,
  ErrroBoundaryExState<TError>
> {
  public state: ErrroBoundaryExState<TError> = {
    hasError: false,
    error: null,
    isServerSide: false
  }

  constructor(props: ErrorBoundaryExProps) {
    super(props)
    this.state = { hasError: false, error: null, isServerSide: !!props.isServerSide }
  }

  public static getDerivedStateFromError<TError>(error: Error): ErrroBoundaryExState<TError> {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error }
  }

  public componentDidCatch(error: unknown, _errorInfo: ErrorInfo) {
    if (this.serverSideErrorCaught(error)) {
      return this.setState({ error, hasError: true, isServerSide: true })
    }
    if (this.HMRErrorCaught(error)) {
      return this.setState({ error: null, hasError: false })
    }
    if (this.defaultCaught(error)) {
      return this.setState({ error, hasError: true })
    }

    throw error
  }

  public render() {
    if (typeof window === 'undefined') {
      return <div>WINDOW IS NOT DEFINED</div>
    }
    if (this.state.hasError) return <h1>에러가 발생했습니다. 잠시 후 다시 시도해주세요.</h1>
    if (this.props.fallbackRender) return this.props.fallbackRender()
    return this.props.children
  }

  protected defaultCaught(error: unknown): error is Error {
    return error instanceof Error
  }

  /*
   * @description 회원 정보가 없을경우 true를 반환합니다.
   */
  protected serverSideErrorCaught(error: unknown): error is Error | AxiosError {
    if (
      isAxiosError(error) &&
      error.response?.config.method?.toLowerCase() === 'get' &&
      error.response?.config.url?.includes('v1/user/profile')
    ) {
      return true
    }
    if (error instanceof Error && JSON.stringify(error).includes('SERVER SIDE ERROR')) {
      return true
    }
    return false
  }

  /**
   * @description HMR시 발생하는 에러가 있을 경우 true를 반환합니다.
   * @description SSR로 동작하는 페이지의 경우 HMR시 VDOM 전체가 갈아 끼워지면서 발생하는 에러입니다.
   */
  protected HMRErrorCaught(error: unknown): boolean {
    if (
      process.env.NODE_ENV !== 'development' &&
      JSON.stringify(error).includes('entire root will switch to client rendering')
    ) {
      return true
    }
    return false
  }
}
