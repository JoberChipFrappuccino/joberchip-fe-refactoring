import { useForm, type SubmitHandler } from 'react-hook-form'
import { Header, HomeLogo } from '@/components/Common/Menus'
import { SignUpFormErrorWarn } from '@/components/SignUpPage/SignUpFormError'
import { useAuth } from '@/hooks/useAuth'
import styles from './SignUp.module.scss'

export interface SignUpInputs {
  username: string
  password: string
  checkPassword: string
}

export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm<SignUpInputs>({ mode: 'onBlur' })
  const { signUp } = useAuth()

  const onSubmit: SubmitHandler<SignUpInputs> = (data) => {
    reset()
    signUp(data)
  }
  return (
    <>
      <Header>
        <HomeLogo />
      </Header>
      <div className={styles.container}>
        <h1 className={styles.title}>Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center">
          <p className={styles.label}>사용자 이름을 입력해주세요.</p>
          <input
            className={styles.input}
            type="text"
            placeholder="영어, 숫자를 포함해서 4자 이상 12자 이하로 입력해주세요."
            {...register('username', {
              required: true,
              pattern: /^[a-zA-Z0-9]{4,12}$/i,
              maxLength: 12,
              minLength: 4
            })}
          />
          <div className={styles.warn}>
            <SignUpFormErrorWarn inputType="username" errors={errors} />
          </div>
          <p className={styles.label}>비밀 번호를 입력해주세요.</p>
          <input
            className={styles.input}
            type="password"
            placeholder="영어, 숫자를 포함해서 8자 이상 20자 이하로 입력해주세요."
            {...register('password', {
              required: true,
              maxLength: 20,
              minLength: 8,
              validate: (v) => !!(v.match(/[a-zA-Z]/g) && v.match(/[0-9]/g))
            })}
          />
          <div className={styles.warn}>
            <SignUpFormErrorWarn inputType="password" errors={errors} />
          </div>
          <p className={styles.label}>비밀 번호를 확인합니다.</p>
          <input
            className={styles.input}
            type="password"
            placeholder="비밀번호를 다시 입력해주세요."
            {...register('checkPassword', {
              required: true,
              minLength: 8,
              maxLength: 20,
              validate: (value) => value === watch('password')
            })}
          />
          <div className={styles.warn}>
            <SignUpFormErrorWarn inputType="checkPassword" errors={errors} />
          </div>
          <input className={styles.submit} type="submit" value="Submit" />
        </form>
      </div>
    </>
  )
}

/**
 * reference
 * 1. react-hook-form 사용 방법
 * * onBlur 또한 아래 주소를 참고
 * https://velog.io/@sweetpumpkin/React-hook-form%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%9C-Form-Validation
 * https://github.com/danimkim/pinned/blob/develop/src/components/AuthForm.tsx
 */
