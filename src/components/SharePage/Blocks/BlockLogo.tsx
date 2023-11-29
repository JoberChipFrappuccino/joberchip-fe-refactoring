import logoList from 'mocks/development/logo.json'
import styles from './BlockLogo.module.scss'

interface Props {
  logo: string
}

// 해당 기능은 검색 주소에서 프로젝트 logo.json에 저장된 logo_id와 동일한 키워드가 있으면 해당 키워드의 아이콘을 반환하는 기능입니다.
export default function BlockLogo({ logo }: Props) {
  // 주소 문자열에서 기업명 문자열 추출
  function findLogoString(logo: string) {
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

  // selectLogo의 기본값
  // eslint-disable-next-line react/jsx-no-useless-fragment
  let selectLogo = <></>

  const findData = findLogoString(logo)

  // 키워드가 동일하면 해당 아이콘 반환 없으면 기본값 반환
  if (findData) {
    selectLogo = <img src={`/BlockLogo/${findData}.png`} className={styles.logoStyle} />
  } else {
    selectLogo = <img src={'/BlockLogo/default.png'} className={styles.logoStyle} />
  }

  return <div className={styles.container}>{selectLogo}</div>
}
