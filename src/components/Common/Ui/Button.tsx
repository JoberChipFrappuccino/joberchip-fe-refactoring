import classNames from 'classnames'
import styles from './Button.module.scss'

export type FormButtonProps = {
  title: string
  disabled: boolean
  additionalStyle?: string
}

export default function FormButton({ title, disabled, additionalStyle }: FormButtonProps) {
  return (
    <button
      className={classNames([
        styles.container,
        disabled ? styles.disabledButton : styles.activeButton,
        additionalStyle
      ])}
      disabled={disabled}
    >
      {title}
    </button>
  )
}
