import styles from './BlockCover.module.scss'

interface BlockCoverProps {
  onClick?: VoidFunction
}
export function BlockCover({ onClick }: BlockCoverProps) {
  return (
    <div className={styles.cover}>
      <button className={styles.btn} type="button" onClick={() => onClick && onClick()} />
    </div>
  )
}
