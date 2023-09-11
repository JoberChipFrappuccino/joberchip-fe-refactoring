import { type BlockWith } from '@/models/space'
import BlockLogo from './BlockLogo'
import styles from './LinkBlock.module.scss'

type Props = {
  block: BlockWith<'link'>
  mode: SpaceMode
}

export function LinkBlock({ block, mode }: Props) {
  return (
    <div className={styles.container}>
      <BlockLogo logo={block.url} />
      <div className={mode === 'edit' ? 'cover' : ''} />
      <div className={mode}>
        <a href={block.url}>{block.text}</a>
      </div>
    </div>
  )
}
