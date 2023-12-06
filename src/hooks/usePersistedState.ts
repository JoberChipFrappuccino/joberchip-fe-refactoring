import type { Dispatch } from 'react'
import { useEffect, useState } from 'react'

const usePersistedState = <T extends string | number | object | null | undefined>(
  key: string,
  initialValue: T
): [T, Dispatch<T>] => {
  const serializedItem = localStorage.getItem(key)
  const [state, setState] = useState<T>(serializedItem ? JSON.parse(serializedItem) : initialValue)

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, [state])

  return [state, setState]
}

export default usePersistedState
