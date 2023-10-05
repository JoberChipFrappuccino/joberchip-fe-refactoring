import { toast as reactToast, type ToastOptions } from 'react-toastify'
import { type APIResponseStatus, type ResponseBase } from './api'
interface ToastPrams {
  message: ResponseBase<null>['message']
  status?: APIResponseStatus
  options: ToastOptions
}
export function toast(
  message: ToastPrams['message'],
  status: ToastPrams['status'] = 'success',
  options: ToastPrams['options'] = {}
) {
  const type = status === 'failure' ? 'error' : 'success'
  reactToast(message, {
    type,
    ...options
  })
}
