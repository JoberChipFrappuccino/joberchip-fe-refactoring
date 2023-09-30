import styles from './Search.module.scss'

export function Search() {
  return (
    <div className={styles.conatiner}>
      <input className={styles.searchBar} type="text" placeholder="스페이스를 검색해주세요." />
      <button className={styles.btn} type="submit">
        검색
      </button>
    </div>
  )
}
