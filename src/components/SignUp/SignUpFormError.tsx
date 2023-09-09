import type { FieldErrors } from 'react-hook-form'
import { SignUpInputs } from '../../pages/SignUp'
import { useMemo } from 'react'

type InputTypes = 'email' | 'password' | 'username' | 'checkPassword'
type ErrorTypes = 'minLength' | 'maxLength' | 'required' | 'pattern' | 'validate' | string
type Props = {
  inputType: InputTypes
  errors: FieldErrors<SignUpInputs>
}

type ErrorMessages = {
  [key in InputTypes]: { [key in ErrorTypes]: string }
}
export const SignUpFormErrorWarn = ({ inputType, errors }: Props) => {
  const errorMessages = useMemo(() => getErrorOptions(), [])

  if (!errors[inputType] || !errors[inputType]?.type) return <div className="h-6"></div>

  const errorType = errors[inputType]?.type
  return (
    <div className="text-rose-500 h-6">
      {typeof errorType === 'undefined' || typeof errorMessages[inputType][errorType] === 'undefined'
        ? '유효 하지 않은 입력입니다.'
        : errorMessages[inputType][errorType]}
    </div>
  )
}

function getErrorOptions(): ErrorMessages {
  const required = '필수 입력사항입니다.'
  const minLength = '자 이상 입력해주세요.'
  const maxLength = '자 이하로 입력해주세요.'
  const pattern = '만 입력해주세요.'

  return {
    username: {
      minLength: '4' + minLength,
      maxLength: '12' + maxLength,
      required,
      pattern: '영문, 숫자' + pattern
    },
    email: {
      minLength: '4' + minLength,
      maxLength: '12' + maxLength,
      required,
      pattern: '영문, 숫자' + pattern
    },
    password: {
      minLength: '8' + minLength,
      maxLength: '20' + maxLength,
      required,
      pattern: '영문, 숫자' + pattern,
      validate: '비밀 번호는 영어, 숫자를 포함해야합니다.'
    },
    checkPassword: {
      minLength: '8' + minLength,
      maxLength: '20' + maxLength,
      required,
      pattern: '영문, 숫자' + pattern,
      validate: '비밀번호가 일치하지 않습니다.'
    }
  }
}
