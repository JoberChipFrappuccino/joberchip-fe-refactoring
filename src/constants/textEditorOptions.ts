// 폰트, 글자 크기, 볼드, 이탤릭 (1)
// 밑줄, 취소선, 색상, 정렬, 그냥 목록, 숫자목록 (2)
import styles from '../components/TextEditor/ToolOption.module.scss'

export const TOOL_TYPES = [
  {
    tools: [
      {
        label: 'font',
        icon: '',
        text: '기본서체',
        action: 'font',
        type: 'options',
        option: 'font-options'
      },
      {
        label: 'size',
        icon: '',
        text: '14',
        action: 'size',
        type: 'options',
        option: 'size-options'
      },
      {
        label: 'bold',
        text: '',
        icon: 'bold.svg',
        action: 'BOLD',
        type: 'inline'
      },
      {
        label: 'italic',
        text: '',
        icon: 'italic.svg',
        action: 'ITALIC',
        type: 'inline'
      },
      {
        label: 'underline',
        icon: 'underline.svg',
        action: 'UNDERLINE',
        type: 'inline',
        text: ''
      },
      {
        label: 'strikethrough',
        icon: 'strikethrough.svg',
        action: 'STRIKETHROUGH',
        type: 'inline',
        text: ''
      },
      {
        label: 'color',
        icon: 'color.svg',
        action: 'color',
        type: 'options',
        option: 'color-options',
        text: ''
      },
      {
        label: 'align',
        icon: 'align.svg',
        action: 'align',
        option: 'align-options',
        type: 'options',
        text: ''
      }
    ]
  },
  {
    tools: [
      {
        label: 'ordered',
        icon: 'ordered.svg',
        action: 'ordered-list-item',
        type: 'block',
        text: ''
      },
      {
        label: 'unordered',
        icon: 'unordered.svg',
        action: 'unordered-list-item',
        type: 'block',
        text: ''
      }
    ]
  }
]

const start = 14
const end = 36
const step = 2

export const SIZE_OPTIONS: string[] = []
for (let i = start; i <= end; i += step) {
  SIZE_OPTIONS.push('size' + i)
}

const sizes: Record<string, { fontSize: string }> = {}
for (let i = 14; i <= 36; i += 2) {
  sizes[`size${i}`] = {
    fontSize: `${i}px`
  }
}

export const FONT_OPTIONS = [
  {
    font: 'Pretendard-Regular',
    label: '프리텐다드(Pretendard)',
    style: 'font1'
  },
  {
    font: 'Noto Sans KR',
    label: '본고딕(Noto Sans KR)',
    style: 'font2'
  },
  {
    font: 'TheJamsil5Bold',
    label: '더잠실체(TheJamsil5Bold)',
    style: 'font3'
  }
]

export const TEXT_COLORS_OPTIONS = [
  { style: 'black', className: styles.black },
  { style: 'gray', className: styles.gray },
  { style: 'white', className: styles.white },
  { style: 'red', className: styles.red },
  { style: 'orange', className: styles.orange },
  { style: 'yellow', className: styles.yellow },
  { style: 'green', className: styles.green },
  { style: 'blue', className: styles.blue },
  { style: 'purple', className: styles.purple }
]

export const TEXT_BGCOLORS_OPTIONS = [
  { style: 'blackBg', className: styles.blackBg },
  { style: 'grayBg', className: styles.grayBg },
  { style: 'whiteBg', className: styles.whiteBg },
  { style: 'redBg', className: styles.redBg },
  { style: 'orangeBg', className: styles.orangeBg },
  { style: 'yellowBg', className: styles.yellowBg },
  { style: 'greenBg', className: styles.greenBg },
  { style: 'blueBg', className: styles.blueBg },
  { style: 'purpleBg', className: styles.purpleBg }
]

export const ALIGN_OPTIONS = [
  { style: 'left', icon: '' },
  { style: 'center', icon: '' },
  { style: 'right', icon: '' }
]

export const StyleMap = {
  black: {
    color: '#111111'
  },
  gray: {
    color: '#E2E2E2'
  },
  white: {
    color: '#ffffff'
  },
  red: {
    color: '#FF0000'
  },
  orange: {
    color: '#ff9300'
  },
  yellow: {
    color: '#FFdb30'
  },
  green: {
    color: '#1FA99E'
  },
  blue: {
    color: '#00B3F2'
  },
  purple: {
    color: '#AA1F91'
  },
  blackBg: {
    backgroundColor: '#111111'
  },
  grayBg: {
    backgroundColor: '#E2E2E2'
  },
  whiteBg: {
    backgroundColor: '#ffffff'
  },
  redBg: {
    backgroundColor: '#FF0000'
  },
  orangeBg: {
    backgroundColor: '#ff9300'
  },
  yellowBg: {
    backgroundColor: '#FFdb30'
  },
  greenBg: {
    backgroundColor: '#1FA99E'
  },
  blueBg: {
    backgroundColor: '#00B3F2'
  },
  purpleBg: {
    backgroundColor: '#AA1F91'
  },
  font1: {
    fontFamily: 'Pretendard-Regular'
  },
  font2: {
    fontFamily: 'Noto Sans KR'
  },
  font3: {
    fontFamily: 'TheJamsil5Bold'
  },
  ...sizes
}
