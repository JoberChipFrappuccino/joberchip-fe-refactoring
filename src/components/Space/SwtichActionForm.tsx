import { useDrawerFormType } from '@/store/formMode'
import type { ReactNode } from 'react'

export default function SwtichActionForm() {
  const { formType } = useDrawerFormType()
  let blockComponent: ReactNode | null = null

  switch (formType) {
    case 'page':
      blockComponent = <h1>page</h1>
      break
    case 'template':
      blockComponent = <h1>template</h1>
      break
  }

  return <>{blockComponent}</>
}
