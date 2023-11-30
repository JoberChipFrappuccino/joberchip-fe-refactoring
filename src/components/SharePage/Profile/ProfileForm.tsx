import { useQueryClient } from '@tanstack/react-query'
import { Spin } from 'antd'
import { useEffect, useState } from 'react'
import { editPageProfileAPI } from '@/apis/space'
import { BREAD_CRUMB, SPACE_LIST } from '@/constants/queryKeyConstant'
import { USER_PROFILE_DEVOUNCE_TIME } from '@/constants/sharePageConstant'
import { useSharePageQuery } from '@/queries/useSharePageQuery'
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

  useDebounce(title, USER_PROFILE_DEVOUNCE_TIME, async (nextTitle) => {
    if (mode === 'VIEW') return
    if (sharePage.title === nextTitle) return
    const form = new FormData()
    form.append('title', nextTitle)
    await to(editPageProfileAPI(pageId ?? '', form)).then((res) => {
      queryClient.refetchQueries([BREAD_CRUMB])
      queryClient.refetchQueries([SPACE_LIST])
      // setSharePage({ ...sharePage, title: nextTitle })
      toast(res.message, res.status, { autoClose: 500 })
    })
    setIsTitleLoading(false)
  })

  useDebounce(description, USER_PROFILE_DEVOUNCE_TIME, async (nextDescription) => {
    if (mode === 'VIEW') return
    if (sharePage.description === nextDescription) return
    const form = new FormData()
    form.append('description', nextDescription)
    await to(editPageProfileAPI(pageId ?? '', form)).then((res) => {
      toast(res.message, res.status, { autoClose: 500 })
      // setSharePage({ ...sharePage, description: nextDescription })
    })
    setIsDescriptionLoading(false)
  })

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
