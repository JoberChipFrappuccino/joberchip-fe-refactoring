import { isAxiosError } from 'axios'
import React, { type ReactNode, type ErrorInfo } from 'react'
import { Navigate } from 'react-router-dom'
import { type ErrorBoundaryBaseProps } from './ErrorBoundary'

type SpaceErrorBoundaryProps<TError> = {
  to: string
  fallbackRender?: () => ReactNode
} & ErrorBoundaryBaseProps<TError>

type SpaceErrorBoundaryState<TError> = {
  error: TError | Error | null
  redirect: boolean
}
export class SpaceErrorBoundary<TError = Error> extends React.Component<SpaceErrorBoundaryProps<TError>> {
  public state: SpaceErrorBoundaryState<TError> = {
    error: null,
    redirect: false
  }

  constructor(props: SpaceErrorBoundaryProps<TError>) {
    super(props)
    this.state = { error: null, redirect: false }
  }

  static getDerivedStateFromError(error: Error): SpaceErrorBoundaryState<Error> {
    return { error, redirect: false }
  }

  /**
   * 사용자 정보를 불러오는데 실패할 경우, 로그인 페이지로 이동해야합니다.
   */
  componentDidCatch(error: unknown, _errorInfo: ErrorInfo): void {
    if (process.env.NODE_ENV === 'development') {
      console.error("_______SpacePageErrorBoundary's componentDidCatch_______")
    }
    if (this.redirectErrorCaugth(error)) return this.setState({ error, redirect: true })
    if (this.HMRErrorCaught(error)) return this.setState({ error: null, redirect: false })
    if (this.defaultCaught(error)) return this.setState({ error, redirect: false })
    // QueryErrorBoundary에서 처리합니다.
    // throw error
  }

  render() {
    if (typeof window === 'undefined') {
      return <div>WINDOW IS NOT DEFINED</div>
    }
    if (!this.state.error) return this.props.children

    if (this.redirectErrorCaugth(this.state.error)) {
      console.error("REDIRECT ERROR가 발생했습니다. '/signin'으로 이동합니다.")
      return <Navigate to="/signin" />
    }

    if (this.HMRErrorCaught(this.state.error)) return this.props.children

    if (this.props.fallbackRender) return this.props.fallbackRender()
    return <div>클라이언트에서 에러가 발생했습니다. 잠시 후 다시 시도해주세요</div>
  }

  protected defaultCaught(error: unknown): boolean {
    return error instanceof Error
  }

  /**
   * @description 회원 정보가 없을경우 true를 반환합니다.
   */
  protected redirectErrorCaugth(error: unknown): boolean {
    if (
      isAxiosError(error) &&
      error.response?.config.method?.toLowerCase() === 'get' &&
      error.response?.config.url?.includes('v1/user/profile')
    ) {
      return true
    }
    if (error instanceof Error && JSON.stringify(error.message).includes('REDIRECT ERROR')) {
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
