import { Input, Select } from 'antd'
import { useState } from 'react'
import { TEMPLATE_SEARCH_BOX_OPTIONS } from '@/constants/sharePageConstant'
import styles from './TemplateSearchBox.module.scss'

export function TemplateSearchBox() {
  const [selectedOption, setSelectedOption] = useState(TEMPLATE_SEARCH_BOX_OPTIONS[0].value)

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
          defaultValue={TEMPLATE_SEARCH_BOX_OPTIONS[0].value}
          onChange={handleChange}
          options={TEMPLATE_SEARCH_BOX_OPTIONS}
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
