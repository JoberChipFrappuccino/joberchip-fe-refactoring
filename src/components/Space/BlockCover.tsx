import styles from './BlockCover.module.scss'

type Props = {
  onClick?: (e: EventTarget | null) => void
}
export default function BlockCover({ onClick }: Props) {
  return (
    <section
      className={styles.cover}
      onClick={(e) => {
        onClick && onClick(e.target)
      }}
    >
      Block Cover
    </section>
  )
}
