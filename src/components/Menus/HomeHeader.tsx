import styles from './HomeHeader.module.scss'

export function HomeHeader() {
  return (
    <div className={styles.container}>
      <a className={styles.homeLogo} href="/">
        <img src="/jober_home.png" alt="jober home icon" />
      </a>
      <a className={styles.joberLogo} href="/">
        <img src="/jober_logo.png" alt="jober logo icon" />
      </a>
    </div>
  )
}
