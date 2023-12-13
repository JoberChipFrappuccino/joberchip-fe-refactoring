import { type ComponentProps, Suspense, useEffect, useState, type ComponentType } from 'react'

export const SSRSuspense = ({ children, fallback }: ComponentProps<typeof Suspense>) => {
  const [isMounted, setIsMounted] = useState(false)
  const [isBrowser, setIsBrowser] = useState(typeof window !== 'undefined')

  useEffect(() => {
    setIsMounted(true)
    setIsBrowser(typeof window !== 'undefined')
  }, [])

  if (isMounted && isBrowser) {
    return <Suspense fallback={fallback}>{children}</Suspense>
  }

  return fallback
}

/**
 *
 * @example
 * interface SpaceProps {
 * foo: string
 * children: React.ReactNode
 * }
 * export function SSRComponent() {
 * const SSRSpace = withSSRSuspense<SpaceProps>(Space, { fallback: <div>Loading...</div> })
 * return (
 *   <SSRSpace foo={'bar'}>
 *    <div>foo</div>
 *  </SSRSpace>
 * )}
 *
 */
export function withSSRSuspense<T>(
  WrappedComponent: ComponentType<T>,
  options: { fallback: NonNullable<React.ReactNode> | null }
) {
  // eslint-disable-next-line react/display-name
  return (props: T) => {
    return (
      <SSRSuspense fallback={options.fallback}>
        <WrappedComponent {...(props as any)} />
      </SSRSuspense>
    )
  }
}
