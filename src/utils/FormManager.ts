import { type BlockItem } from '@/models/space'
import { getNextYOfLastBlock } from './api'

class FormManager {
  private readonly form: FormData
  constructor() {
    this.form = new FormData()
  }

  /**
   * @description 블럭을 생성할 때 form이 기본적으로 있어야하는 속성을 추가합니다. (x, y, w, h, visible)
   */
  addDefaultOptionToBlock(children: BlockItem[]) {
    this.form.append('x', '0')
    this.form.append('y', getNextYOfLastBlock(children).toString())
    this.form.append('w', '1')
    this.form.append('h', '2')
    this.form.append('visible', 'true')
  }

  append(name: string, value: string | Blob, filename?: string) {
    if (value instanceof Blob) {
      this.form.append(name, value, filename)
      return
    }

    if (value.includes('data:image')) {
      this.appendImage(name, value, filename)
    } else if (value.includes('data:video')) {
      this.appendVideo(name, value, filename)
    } else {
      this.form.append(name, value)
    }
  }

  private appendImage(name: string, value: string, filename?: string): void {
    const blob = this.dataURLToBlob(value)
    this.form.append(name, blob, filename)
  }

  private appendVideo(name: string, value: string, filename?: string): void {
    const blob = this.dataURLToBlob(value)
    this.form.append(name, blob, filename)
  }

  dataURLToBlob(dataURL: string): Blob {
    const splitDataURI = dataURL.split(',')
    const byteString = splitDataURI[0].includes('base64') ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

    const ia = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i)
    }

    return new Blob([ia], { type: mimeString })
  }

  getForm() {
    return this.form
  }
}

export default FormManager
