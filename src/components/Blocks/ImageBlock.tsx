import { BlockWith } from '@/models/space'
import styles from './ImageBlock.module.scss'

type Props = {
  block: BlockWith<'image'>
  mode: SpaceMode
}
export function ImageBlock({ block, mode }: Props) {
  return (
    <div className={styles.container}>
      <div className={mode === 'edit' ? 'cover' : ''} />
      <img
        // * 이상하게 이미지는 css module이 적용이 안됨 ㅠㅠ 이유를 모르곘음 ㅠㅠㅠ 흑흑
        // className={mode}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        src={
          'https://storage.googleapis.com/creatorspace-public/users%2Fcllyngz49054ro90116idmdmc%2FdRA0QKVsqIABsbv3-dance.gif'
        }
        alt={block.alt}
      />
    </div>
  )
}
