import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback, useTransition } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInAPI, signUpAPI } from '@/apis/user'
import { BACK_MOCK_ACCESS_TOKEN } from '@/constants'
import { resetAccessToken, setAccessToken, toast } from '@/utils'
import { type SignInInputs } from '@/pages/SignIn'

export const useAuth = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [, startTransition] = useTransition()

  const { mutate: signIn } = useMutation({
    mutationFn: (body: SignInInputs) => signInAPI(body),
    onSuccess: (res) => {
      if (!res.data?.accessToken) throw new Error('토큰이 존재하지 않습니다.')
      const accessToken = res.data.accessToken
      startTransition(() => {
        setAccessToken(BACK_MOCK_ACCESS_TOKEN, accessToken)
      })
      toast(`반갑습니다 ${res.data.username}님`, 'success')
      navigate('/')
    },
    onSettled: () => {
      queryClient.invalidateQueries(['user'])
    }
  })

  const { mutate: signUp } = useMutation({
    mutationFn: (body: SignInInputs) => signUpAPI(body),
    onSuccess: (res) => {
      // SignUp, SignIN API 모두 accessToken이 반환되는지 확인이 필요합니다.
      if (!res.data?.accessToken) throw new Error('토큰이 존재하지 않습니다.')
      const accessToken = res.data.accessToken
      startTransition(() => {
        setAccessToken(BACK_MOCK_ACCESS_TOKEN, accessToken)
      })
      toast('회원가입이 완료되었습니다.', 'success')
      navigate('/signIn')
    },
    onSettled: () => {
      queryClient.invalidateQueries(['user'])
    }
  })

  // * 로그아웃 API는 없습니다.
  const signOut = useCallback(() => {
    resetAccessToken(BACK_MOCK_ACCESS_TOKEN)
    queryClient.removeQueries(['user'])
    navigate('/signIn')
  }, [])

  return { signIn, signUp, signOut }
}
