import { toast as reactToast, type ToastOptions } from 'react-toastify'
import { TOAST_AUTO_CLOSE_TIME } from '@/constants'
import { type ResponseBase } from './api'
interface ToastPrams {
  message: ResponseBase<null>['message']
  status?: string
  options: ToastOptions
}
export function toast(
  message: ToastPrams['message'],
  status: string,
  options: ToastPrams['options'] = {
    autoClose: TOAST_AUTO_CLOSE_TIME
  }
) {
  const type = status === 'success' ? 'success' : 'error'
  reactToast(message, {
    type,
    ...options
  })
}
