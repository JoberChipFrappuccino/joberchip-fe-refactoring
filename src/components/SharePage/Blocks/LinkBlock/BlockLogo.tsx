import logoList from 'mocks/development/logo.json'
import styles from './BlockLogo.module.scss'

interface BlockLogoProps {
  logo: string
}
export default function BlockLogo({ logo }: BlockLogoProps) {
  const name = findBrandName(logo)
  return (
    <div className={styles.container}>
      <img src={`/BlockLogo/${name ?? 'default'}.png`} className={styles.logoStyle} />
    </div>
  )
}

function findBrandName(logo: string) {
  const urlData = JSON.stringify(logo)
  const logoString = logoList.logo.map((item) => item.logo_id)
  for (const keyword of logoString) {
    if (urlData.includes(keyword) && urlData.includes('blog')) {
      return keyword + '_blog'
    } else if (urlData.includes(keyword) && urlData.includes('messenger')) {
      return keyword + '_messenger'
    } else if (urlData.includes(keyword) && urlData.includes('maps')) {
      return keyword + '_maps'
    } else if (urlData.includes(keyword)) {
      return keyword
    }
  }
}
