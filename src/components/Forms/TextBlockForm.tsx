import { type BlockWith } from '@/models/space'
import styles from './TextBlockForm.module.scss'

interface Props {
  block?: BlockWith<TText>
}
export default function TextBlockForm({ block }: Props) {
  return (
    <div className={styles.container}>
      <h1>TEXT BLOCK FORM EXMAPLE</h1>
    </div>
  )
}
