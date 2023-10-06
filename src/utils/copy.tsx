import { toast } from './toast'

export function clip(url: string) {
  const textarea = document.createElement('textarea')
  document.body.appendChild(textarea)
  textarea.value = url
  textarea.select()
  document.execCommand('copy')
  document.body.removeChild(textarea)
  toast('링크가 복사되었습니다.')
}
