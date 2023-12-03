import { createContext } from 'react'
export type Suspender = Record<string, unknown>
export const ServerSideContext = createContext<Suspender>({})

interface SSRProviderProps {
  children: React.ReactNode
  data: Suspender
}

export function SSRProvider({ children, data }: SSRProviderProps) {
  return <ServerSideContext.Provider value={data}>{children}</ServerSideContext.Provider>
}
