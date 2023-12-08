import { toast } from '@/utils/toast'
import styles from './Search.module.scss'

export function Search() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    toast('아직 준비중인 기능입니다.', 'success')
  }
  return (
    <form className={styles.conatiner} onSubmit={handleSubmit}>
      <input className={styles.searchBar} type="text" placeholder="스페이스를 검색해주세요." />
      <button className={styles.btn} type="submit">
        검색
      </button>
    </form>
  )
}
