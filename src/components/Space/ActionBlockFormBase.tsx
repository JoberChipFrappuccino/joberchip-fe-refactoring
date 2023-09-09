import { BlockType } from '@/models/space'
import { useDrawerFormType } from '@/store/formMode'
import type { ReactNode } from 'react'

// todo block type을 알아야하는지 논의가 필요합니당.
type Props = {
  children: ReactNode
}

export function ActionBlockFormBase({ children }: Props) {
  const { blockType } = useDrawerFormType()
  return (
    <div>
      <h1>{blockType}</h1>
      {/* todo switch Image case */}
      <p>이 부분은 이미지가 클릭 & 활성화 되는 영역입니다.</p>
      <div>{children}</div>
    </div>
  )
}
