import { editPageProfileAPI } from '@/api/space'
import { useSharePageStore } from '@/store/sharePage'
import { toast } from '@/utils/toast'
import { useState } from 'react'
import styles from './ProfileImageForm.module.scss'
export function ProfileImageForm() {
  const [profileImage, setProfileImage] = useState('')
  const { sharePage } = useSharePageStore()

  const changeImageFile = () => {
    document.getElementById('ProfileImage')?.click()
  }

  const handleChageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0]
      const form = new FormData()
      form.append('profileImage', file)
      editPageProfileAPI(sharePage.pageId, form).then((res) => {
        toast(res.message, 'success', { autoClose: 500 })
      })
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64 = reader.result
        if (base64) {
          // eslint-disable-next-line @typescript-eslint/no-base-to-string
          const str = base64?.toString()
          // eslint-disable-next-line @typescript-eslint/no-base-to-string
          setProfileImage(str)
        }
      }
      reader.readAsDataURL(file)
    }
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
