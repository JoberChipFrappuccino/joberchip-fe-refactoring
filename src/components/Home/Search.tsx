import styles from './Search.module.scss'
export function Search() {
  return (
    <div className={styles.conatiner}>
      <input type="text" placeholder="스페이스를 검색해주세요." />
      <button type="submit">검색</button>
    </div>
  )
}
