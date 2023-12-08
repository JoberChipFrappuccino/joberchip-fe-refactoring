import type { Dispatch } from 'react'
import { useEffect, useState } from 'react'

const usePersistedState = (key: string): [string | null, Dispatch<string | null>] => {
  const serializedItem = window ? localStorage.getItem(key) : null
  const [state, setState] = useState(serializedItem)

  useEffect(() => {
    if (state) {
      localStorage.setItem(key, state)
    }
  }, [state])

  return [state, setState]
}

export default usePersistedState
