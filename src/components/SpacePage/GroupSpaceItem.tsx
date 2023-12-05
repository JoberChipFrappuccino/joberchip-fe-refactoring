import { MdKeyboardArrowRight } from '@react-icons/all-files/md/MdKeyboardArrowRight'
import { type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import styles from './GroupSpaceItem.module.scss'

interface GroupSpaceItemProps {
  icon?: 'company' | 'user'
  text: string
  link: string
  style?: CSSProperties
}

export function GroupSpaceItem({ icon = 'user', text, link, style }: GroupSpaceItemProps) {
  return (
    <div className={styles.container} style={style}>
      <img src={`/${icon}_space_icon.png`} alt={`/${icon} space icon`} />
      <Link to={link}>{text}</Link>
      <span>
        <MdKeyboardArrowRight />
      </span>
    </div>
  )
}
