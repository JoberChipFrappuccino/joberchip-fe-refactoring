import { Input, Select } from 'antd'
import { useState } from 'react'
import styles from './TemplateSearchBox.module.scss'

export function TemplateSearchBox() {
  const options = [
    { value: '문서', label: '문서' },
    { value: '문서 제목', label: '문서 제목' },
    { value: '해시태그', label: '해시태그' }
  ]

  const [selectedOption, setSelectedOption] = useState(options[0].value)

  const handleChange = (value: string) => {
    setSelectedOption(value)
  }

  const onSearch = (value: string) => {
    alert(selectedOption + value)
  }

  return (
    <div className={styles.container}>
      <div className={styles.searchBox}>
        <Select
          className={styles.select}
          defaultValue={options[0].value}
          onChange={handleChange}
          options={options}
          size="large"
          style={{
            width: '10rem'
          }}
        />
        <Input.Search placeholder="검색어를 입력해주세요" allowClear size="large" onSearch={onSearch} />
      </div>
      <button className={styles.btn}>템플릿 추가하기</button>
    </div>
  )
}
