import { type BlockType, type BlockItem, type BlockWith } from '@/models/space'
import { getNextYOfLastBlock } from './api'

type Name<T extends BlockType> = keyof BlockWith<T>
class FormManager<T extends BlockType> {
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

  append(name: Name<T>, value: string | Blob, filename?: string) {
    if (value instanceof Blob) {
      this.form.append(String(name), value, filename)
      return
    }

    if (value.includes('data:image')) {
      this.appendImage(name, value, filename)
    } else if (value.includes('data:video')) {
      this.appendVideo(name, value, filename)
    } else {
      this.form.append(String(name), value)
    }
  }

  private appendImage(name: Name<T>, value: string, filename?: string): void {
    const blob = this.dataURLToBlob(value)
    this.form.append(String(name), blob, filename)
  }

  private appendVideo(name: Name<T>, value: string, filename?: string): void {
    const blob = this.dataURLToBlob(value)
    this.form.append(String(name), blob, filename)
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

  getBody() {
    const obj: Record<string, FormDataEntryValue> = {}
    for (const [key, value] of this.form) {
      obj[key] = value
    }
    // Name<T>가 BlockWith<BlockType>으로 key를 제한하기 떄문에 반환 타입을 단언할 수 있습니다.
    return obj
  }
}

export default FormManager
