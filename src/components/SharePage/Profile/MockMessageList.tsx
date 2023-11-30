import styles from './MockMessageList.module.scss'

export default function MockMessageList() {
  return (
    <ul className={styles.container}>
      <li>
        <p>3</p>
        <p>발송전</p>
      </li>
      <li>
        <p>5</p>
        <p>발송후</p>
      </li>
      <li>
        <p>1</p>
        <p>미확인</p>
      </li>
    </ul>
  )
}
