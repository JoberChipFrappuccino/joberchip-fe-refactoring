import type { ReactNode } from 'react'
import { Layout } from 'antd'
import styles from './Header.module.scss'

interface HeaderProps {
  children?: ReactNode
}
export function Header({ children }: HeaderProps) {
  return (
    <Layout className={styles.container}>
      <div className={styles.cover}>{children}</div>
    </Layout>
  )
}
