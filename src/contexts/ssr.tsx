import React, { createContext } from 'react'

export type Suspender = Record<string, unknown>

export const ServerSideContext = createContext<Suspender>({})

type Props = {
  children: React.ReactNode
  data: Suspender
}

export function SSRProvider({ children, data }: Props) {
  return <ServerSideContext.Provider value={data}>{children}</ServerSideContext.Provider>
}
