import { type ReactNode } from 'react'
import styles from './ViewerBlockBase.module.scss'

type Props = {
  children: ReactNode
}
export default function ViewerBlockBase({ children }: Props) {
  return <div className={styles.container}>{children}</div>
}
