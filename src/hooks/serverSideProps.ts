import { useContext } from 'react'
import { ServerSideContext } from '@/context/ssr'
import htmlEntitiesDecoder from 'html-entities-decoder'

export default function useServerSideProps(key: string) {
  const ctx = useContext(ServerSideContext)
  // * This scope is only for server side rendering
  if (typeof window === 'undefined') {
    return JSON.parse((ctx[key] as string) || '{}')
  }
  const serverSideData = document.getElementById('__SERVER_DATA__')?.textContent || '{}'

  const data = JSON.parse(htmlEntitiesDecoder(serverSideData))
  return JSON.parse(data[key]) || ''
}
