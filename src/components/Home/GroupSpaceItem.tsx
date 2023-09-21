import { type CSSProperties } from 'react'
import styles from './GroupSpaceItem.module.scss'

interface Props {
  icon?: 'company' | 'user'
  text: string
  link: string
  style?: CSSProperties
}

export function GroupSpaceItem({ icon = 'user', text, link, style }: Props) {
  return (
    <div className={styles.container} style={style}>
      <img src={`/${icon}_space_icon.png`} alt={`/${icon} space icon`} />
      <a href={link}>{text}</a>
      <span>{'>'}</span>
    </div>
  )
}
