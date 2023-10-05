import { USER_PROFILE_DEVOUNCE_TIME } from '@/constants/sharePageConstant'
import { useDebounce } from '@/hooks/debounce'
import { useSharePageStore } from '@/store/sharePage'
import { Spin } from 'antd'
import { useState } from 'react'

import { editPageProfileAPI } from '@/api/space'
import { BREAD_CRUMB, SPACE_LIST } from '@/constants/queryKeyConstant'
import { to } from '@/utils/api'
import { toast } from '@/utils/toast'
import { useQueryClient } from '@tanstack/react-query'
import styles from './ProfileForm.module.scss'

export function ProfileForm() {
  const { mode, sharePage, setSharePage } = useSharePageStore()
  const [title, setTitle] = useState(sharePage.title)
  const [isTitleLoading, setIsTitleLoading] = useState(false)
  const [description, setDescription] = useState(sharePage.description)
  const [isDescriptionLoading, setIsDescriptionLoading] = useState(false)
  const queryClient = useQueryClient()

  useDebounce(title, USER_PROFILE_DEVOUNCE_TIME, async (nextTitle) => {
    const form = new FormData()
    form.append('title', nextTitle)
    await to(editPageProfileAPI(sharePage.pageId, form)).then((res) => {
      queryClient.refetchQueries([BREAD_CRUMB])
      queryClient.refetchQueries([SPACE_LIST])
      setSharePage({ ...sharePage, title: nextTitle })
      toast(res.message, res.status, { autoClose: 500 })
    })
    setIsTitleLoading(false)
  })

  useDebounce(description, USER_PROFILE_DEVOUNCE_TIME, async (nextDescription) => {
    const form = new FormData()
    form.append('description', nextDescription)
    await to(editPageProfileAPI(sharePage.pageId, form)).then((res) => {
      toast(res.message, res.status, { autoClose: 500 })
      setSharePage({ ...sharePage, description: nextDescription })
    })
    setIsDescriptionLoading(false)
  })

  return (
    <>
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
    </>
  )
}
