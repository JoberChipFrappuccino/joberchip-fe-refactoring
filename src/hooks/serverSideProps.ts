import htmlEntitiesDecoder from 'html-entities-decoder'
import { useContext, useEffect, useState } from 'react'
import { ServerSideContext } from '@/contexts/SSRContext'

export default function useServerSideProps<T>(key: string) {
  const [isServerSide, setIsServerSide] = useState(typeof window === 'undefined')
  const ctx = useContext(ServerSideContext)

  useEffect(() => {
    setIsServerSide(typeof window === 'undefined')
  }, [])

  // * This scope is only for server side rendering
  if (typeof window === 'undefined') {
    const source: T = JSON.parse((ctx[key] as string) || '{}')
    return { isServerSide, source }
  }
  const serverSideData = document.getElementById('__SERVER_DATA__')?.textContent ?? '{}'
  const data = JSON.parse(htmlEntitiesDecoder(serverSideData))
  const source: T = JSON.parse(data[key]) || ''
  return { isServerSide, source }
}
