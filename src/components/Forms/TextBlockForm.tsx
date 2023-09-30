import { type BlockBaseWithBlockFormProps } from '../SwitchCase/DrawerEditForm'
import styles from './TextBlockForm.module.scss'

export function TextBlockForm({ block }: BlockBaseWithBlockFormProps<TText>) {
  return (
    <div className={styles.container}>
      <h1>TEXT BLOCK FORM EXMAPLE</h1>
    </div>
  )
}
