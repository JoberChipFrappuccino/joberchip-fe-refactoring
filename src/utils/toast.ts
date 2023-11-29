import { toast as reactToast, type ToastOptions } from 'react-toastify'
import { TOAST_AUTO_CLOSE_TIME } from '@/constants'
import { type APIResponseStatus, type ResponseBase } from './api'
interface ToastPrams {
  message: ResponseBase<null>['message']
  status?: APIResponseStatus
  options: ToastOptions
}
export function toast(
  message: ToastPrams['message'],
  status: ToastPrams['status'] = 'success',
  options: ToastPrams['options'] = {
    autoClose: TOAST_AUTO_CLOSE_TIME
  }
) {
  const type = status === 'failure' ? 'error' : 'success'
  reactToast(message, {
    type,
    ...options
  })
}
