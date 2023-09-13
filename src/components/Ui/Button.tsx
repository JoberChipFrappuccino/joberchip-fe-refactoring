import styles from './Button.module.scss'

type FormButton = {
  title: string
  event: boolean
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export default function FormButton({ title, event }: FormButton) {
  return (
    <button className={event ? styles.disabledButton : styles.activeButton} disabled={event}>
      {title}
    </button>
  )
}
