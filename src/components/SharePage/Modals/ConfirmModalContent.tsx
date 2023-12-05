import styles from './ConfirmModalContent.module.scss'
export default function ConfirmModalContent() {
  return (
    <>
      <p className={styles.confirmText}>진짜 지웁니다?</p>
      <p className={styles.doubleCheckText}>복구 못해요?</p>
    </>
  )
}
