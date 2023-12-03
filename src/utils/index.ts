export * from './api'
export * from './toast'
export * from './manageStatus'
export * from './copy'

export const dataURLToBlob = (dataURL: string): Blob => {
  const splitDataURI = dataURL.split(',')
  const byteString = splitDataURI[0].includes('base64') ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
  const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

  const ia = new Uint8Array(byteString.length)
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }

  return new Blob([ia], { type: mimeString })
}
