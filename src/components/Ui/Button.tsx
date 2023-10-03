import classNames from 'classnames'
import styles from './Button.module.scss'

export type FormButtonProps = {
  title: string
  event: boolean
  additionalStyle?: string
}

export default function FormButton({ title, event, additionalStyle }: FormButtonProps) {
  return (
    <button
      className={classNames(event ? styles.disabledButton : styles.activeButton, additionalStyle)}
      disabled={event}
    >
      {title}
    </button>
  )
}
