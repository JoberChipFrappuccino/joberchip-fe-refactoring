import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Header, HomeLogo } from '@/components/Common/Menus'
import { useAuth } from '@/hooks/useAuth'
import styles from './SignIn.module.scss'

export interface SignInInputs {
  username: string
  password: string
}

export default function SignIn() {
  const { handleSubmit, register } = useForm<SignInInputs>()
  const { signIn } = useAuth()

  const onSubmit = (data: SignInInputs) => {
    signIn(data)
  }

  return (
    <>
      <Header>
        <HomeLogo />
      </Header>
      <div className={styles.container}>
        <h1 className={styles.title}>Sign In</h1>
        <form className="flex flex-col justify-center" onSubmit={handleSubmit(onSubmit)}>
          <p className={styles.label}>아이디를 입력해주세요.</p>
          <input className={styles.input} {...register('username')} type="text" />
          <p className={styles.label}>비밀 번호를 입력해주세요.</p>
          <input className={styles.input} {...register('password')} type="password" />
          <input className={styles.submit} type="submit" value="Submit" />
        </form>
        <div className={styles.link}>
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </>
  )
}
