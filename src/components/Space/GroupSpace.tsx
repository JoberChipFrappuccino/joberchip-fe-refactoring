import { type ReactNode } from 'react'
import styles from './GroupSpace.module.scss'

interface GroupSpaceProps {
  title: string
  children: ReactNode
}
export function GroupSpace({ children, title }: GroupSpaceProps) {
  return (
    <div className={styles.container}>
      <div className={styles.descriptionBox}>
        <h2>{title}</h2>
        <p>
          내가 초대 되어 있거나 내가 만든 스페이스로,
          <br />
          다양한 자버 문서를 보낼 수 있어요
        </p>
      </div>
      {children}
    </div>
  )
}
