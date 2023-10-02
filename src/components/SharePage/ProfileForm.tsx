import { LAYOUT_DEBOUNCE_TIME } from '@/constants/sharePageConstant'
import { useDebounce } from '@/hooks/debounce'
import { useSharePageStore } from '@/store/sharePage'
import { Spin } from 'antd'
import { useState } from 'react'

import styles from './ProfileForm.module.scss'

export function ProfileForm() {
  const { mode, sharePage } = useSharePageStore()
  const [title, setTitle] = useState(sharePage.title)
  const [isTitleLoading, setIsTitleLoading] = useState(false)
  const [description, setDescription] = useState(sharePage.description)
  const [isDescriptionLoading, setIsDescriptionLoading] = useState(false)

  useDebounce(title, LAYOUT_DEBOUNCE_TIME, (nextTitle) => {
    alert('title 변경' + nextTitle)
    setIsTitleLoading(false)
  })

  useDebounce(description, LAYOUT_DEBOUNCE_TIME, (nextDescription) => {
    alert('description 변경' + nextDescription)
    setIsDescriptionLoading(false)
  })

  return (
    <div>
      <div className={styles.cover}>
        <input //
          className={styles.title}
          type="text"
          disabled={mode === 'view'}
          defaultValue={title}
          onChange={(e) => {
            setTitle(e.target.value)
            setIsTitleLoading(true)
          }}
          placeholder="이름을 정해주세요"
        />
        {isTitleLoading && <Spin />}
      </div>
      <div className={styles.cover}>
        <input
          className={styles.description}
          type="text"
          disabled={mode === 'view'}
          defaultValue={description}
          onChange={(e) => {
            setDescription(e.target.value)
            setIsDescriptionLoading(true)
          }}
          placeholder="상세 내용을 추가해주세요."
        />
        {isDescriptionLoading && <Spin />}
      </div>
    </div>
  )
}
