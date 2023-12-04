import { useState } from 'react'
import { editPageBlockAPI } from '@/apis/page/page'
import { useSharePageQuery } from '@/queries/useSharePageQuery'
import styles from './ProfileImageForm.module.scss'
export function ProfileImageForm() {
  const [profileImage, setProfileImage] = useState('')
  const { sharePage, pageId } = useSharePageQuery()

  const changeImageFile = () => {
    document.getElementById('ProfileImage')?.click()
  }

  const handleChageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    const file = files[0]
    editPageBlockAPI(pageId, { profileImage: file })
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64 = reader.result
      if (base64) {
        const str = String(base64)
        // TODO : Optimistic UI 적용하기
        setProfileImage(str)
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <>
      <button type="button" onClick={changeImageFile} className={styles.cover}>
        <img src={profileImage || sharePage.profileImageLink} alt={`${sharePage.title} thumbnail`} />
      </button>
      <input id="ProfileImage" type="file" accept="image/*" onChange={handleChageFile} />
    </>
  )
}
