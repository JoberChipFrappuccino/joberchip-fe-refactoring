import { type InputHTMLAttributes } from 'react'
import styles from './Radio.module.scss'

type RadioType = InputHTMLAttributes<HTMLInputElement> & {
  id: string
  title: string
  value: string
  checked: boolean
  onToggle: (e: string) => void
}

export const Radio = ({ id, title, value, checked, onToggle, onChange }: RadioType) => {
  return (
    <div className={styles.container} onClick={() => onToggle(id)}>
      <input id={id} className={styles.input} type="radio" value={value} checked={checked} readOnly />
      <label htmlFor={id} className={styles.label}>
        {title}
      </label>
    </div>
  )
}
