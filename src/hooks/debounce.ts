import { useEffect, useState } from 'react'

export function useDebounce<T>(value: T, delay: number = 2000, onChaged: (value: T) => void = () => {}) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
      onChaged(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [typeof value === 'object' ? JSON.stringify(value) : value, delay])

  return debouncedValue
}
