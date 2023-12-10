import htmlEntitiesDecoder from 'html-entities-decoder'
import { useContext, useEffect, useState } from 'react'
import { ServerSideContext } from '@/contexts/SSRContext'

function useServerSideProps(): { isServerSide: boolean }
function useServerSideProps<T>(key: string): { isServerSide: boolean; source: T }
// eslint-disable-next-line @typescript-eslint/no-redeclare
function useServerSideProps<T>(key?: string) {
  const [isServerSide, setIsServerSide] = useState(typeof window === 'undefined')
  const ctx = useContext(ServerSideContext)

  useEffect(() => {
    setIsServerSide(typeof window === 'undefined')
  }, [])

  if (!key) return { isServerSide }

  // * This scope is only for server side rendering
  if (isServerSide) {
    const source: T = JSON.parse((ctx[key] as string) || '{}')
    return { isServerSide, source }
  }

  const serverSideData = document.getElementById('__SERVER_DATA__')?.textContent ?? '{}'
  const data = JSON.parse(htmlEntitiesDecoder(serverSideData))
  const source: T = JSON.parse(data[key] ?? '{}')
  return { isServerSide, source }
}

export { useServerSideProps }
