import { useSharePageQuery } from '@/queries/useSharePageQuery'
import styles from './ProfileViewMode.module.scss'
export default function ProfileViewMode() {
  const { sharePage } = useSharePageQuery()
  return (
    <div className={styles.container}>
      <div className={styles.profileImageCover}>
        <img src={sharePage.profileImageLink} alt={`${sharePage.title} thumbnail`} />
        <h2>{sharePage.title}</h2>
      </div>
      <p>{sharePage.description}</p>
      <div className={styles.profileCover}>
        <h2>{sharePage.title}</h2>
        <p>{sharePage.description}</p>
      </div>
    </div>
  )
}
