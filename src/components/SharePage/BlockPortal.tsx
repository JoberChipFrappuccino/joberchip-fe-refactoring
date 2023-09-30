import { type ReactNode } from 'react'
import reactDom from 'react-dom'

export interface BlockPortalProps {
  children: ReactNode
}

export default function BlockPortal({ children }: BlockPortalProps) {
  if (typeof window === 'undefined') {
    return null
  }

  const node = document.getElementById('portal') as Element
  return reactDom.createPortal(children, node)
}
