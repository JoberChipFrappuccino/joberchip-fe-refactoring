import { useSharePageQuery } from '@/hooks/queries/useSharePageQuery'
import styles from './ProfileViewMode.module.scss'

export default function ProfileViewMode() {
  const { sharePage } = useSharePageQuery()
  return (
    <div className={styles.container}>
      <div className={styles.profileImageCover}>
        <img src={sharePage?.profileImageLink} alt={`${sharePage.title} thumbnail`} />
      </div>
      <div className={styles.profileCover}>
        <h2 className={styles.title}>{sharePage.title}</h2>
        <p className={styles.description}>{sharePage.description}</p>
      </div>
    </div>
  )
}
