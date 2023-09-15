import styles from './Button.module.scss'

export type FormButtonProps = {
  title: string
  event: boolean
}

export default function FormButton({ title, event }: FormButtonProps) {
  return (
    <button className={event ? styles.disabledButton : styles.activeButton} disabled={event}>
      {title}
    </button>
  )
}
