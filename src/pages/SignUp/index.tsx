import { SubmitHandler, useForm } from 'react-hook-form'
import styles from './SignUp.module.scss'
import { SignUpFormErrorWarn } from '@/components/SignUp/SignUpFormError'

export type SignUpInputs = {
  email: string
  username: string
  password: string
  checkPassword: string
}

export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<SignUpInputs>({ mode: 'onBlur' })

  const onSubmit: SubmitHandler<SignUpInputs> = (data) => {
    alert('회원가입을 시도합니다.' + data)
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login Page</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center">
        <p className={styles.label}>이메일을 입력해주세요.</p>
        <input
          type="email"
          placeholder="이메일을 입력해주세요."
          {...register('email', {
            required: true
          })}
        />
        <SignUpFormErrorWarn inputType="email" errors={errors} />
        <p className={styles.label}>사용자 이름을 입력해주세요.2</p>
        <input
          type="text"
          placeholder="영어, 숫자를 포함해서 4자 이상 12자 이하로 입력해주세요."
          {...register('username', {
            required: true,
            pattern: /^[a-zA-Z0-9]{4,12}$/i,
            maxLength: 12,
            minLength: 4
          })}
        />
        <SignUpFormErrorWarn inputType="username" errors={errors} />
        <p className={styles.label}>비밀 번호를 입력해주세요.</p>
        <input
          type="password"
          placeholder="영어, 숫자를 포함해서 8자 이상 20자 이하로 입력해주세요."
          {...register('password', {
            required: true,
            maxLength: 20,
            minLength: 8,
            validate: (v) => (v.match(/[a-zA-Z]/g) && v.match(/[0-9]/g) ? true : false)
          })}
        />
        <SignUpFormErrorWarn inputType="password" errors={errors} />
        <p className={styles.label}>비밀 번호를 확인합니다.</p>
        <input
          type="password"
          placeholder="비밀번호를 다시 입력해주세요."
          {...register('checkPassword', {
            required: true,
            minLength: 8,
            maxLength: 20,
            validate: (value) => value === watch('password')
          })}
        />
        <SignUpFormErrorWarn inputType="checkPassword" errors={errors} />
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

/**
 * reference
 * 1. react-hook-form 사용 방법
 * * onBlur 또한 아래 주소를 참고
 * https://velog.io/@sweetpumpkin/React-hook-form%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%9C-Form-Validation
 * https://github.com/danimkim/pinned/blob/develop/src/components/AuthForm.tsx
 */
