import { useQueryClient } from '@tanstack/react-query'
import { Spin } from 'antd'
import { useEffect, useState } from 'react'
import { editPageBlockAPI } from '@/apis/page'
import { BREAD_CRUMB, SPACE_LIST } from '@/constants/querykey'
import { USER_PROFILE_DEBOUNCE_TIME } from '@/constants/space'
import { useSharePageQuery } from '@/hooks/queries/useSharePageQuery'
import { useSharePageModeStore } from '@/store/sharePage'
import { to, toast } from '@/utils'
import { useDebounce } from '@/hooks/useDebounce'
import styles from './ProfileForm.module.scss'

export function ProfileForm() {
  const { sharePage, pageId } = useSharePageQuery()
  const { mode } = useSharePageModeStore()
  const [title, setTitle] = useState(sharePage.title)
  const [isTitleLoading, setIsTitleLoading] = useState(false)
  const [description, setDescription] = useState(sharePage.description)
  const [isDescriptionLoading, setIsDescriptionLoading] = useState(false)
  const queryClient = useQueryClient()

  const nextTitle = useDebounce(title, USER_PROFILE_DEBOUNCE_TIME)
  const nextDescription = useDebounce(description, USER_PROFILE_DEBOUNCE_TIME)

  useEffect(() => {
    if (mode === 'VIEW') return
    if (sharePage.title === nextTitle) return
    to(editPageBlockAPI(pageId, { title: nextTitle })).then((res) => {
      queryClient.invalidateQueries([BREAD_CRUMB])
      queryClient.invalidateQueries([SPACE_LIST])
      toast(res.message, res.status, { autoClose: 500 })
      setIsTitleLoading(false)
    })
  }, [nextTitle])

  useEffect(() => {
    if (mode === 'VIEW') return
    if (sharePage.description === nextDescription) return
    const form = new FormData()
    form.append('description', nextDescription)
    to(editPageBlockAPI(pageId, { description: nextDescription })).then((res) => {
      toast(res.message, res.status, { autoClose: 500 })
      setIsDescriptionLoading(false)
    })
  }, [nextDescription])

  useEffect(() => {
    setTitle(() => sharePage.title)
    setDescription(() => sharePage.description)
  }, [sharePage.title, sharePage.description])

  return (
    <>
      <div className={styles.cover}>
        <input //
          className={styles.title}
          type="text"
          disabled={mode === 'VIEW'}
          value={title}
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
          disabled={mode === 'VIEW'}
          value={description}
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
