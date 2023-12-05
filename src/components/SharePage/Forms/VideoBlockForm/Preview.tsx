import { useEffect, useState } from 'react'

interface PreviewProps {
  radio: string
  url?: string
  videoSrc?: FileList
}
export default function Preview({ radio, url, videoSrc }: PreviewProps) {
  const [src, setSrc] = useState<string | null>('')
  const [videoId, setVideoId] = useState(extractVideoId(url))

  useEffect(() => {
    extractFileUrl(videoSrc, (buf) => setSrc(buf))
    setVideoId(extractVideoId(url))
  }, [videoSrc, url])

  if (radio === 'radio1' && videoId) {
    return <img src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} alt="youtube thumbnail" />
  } else if (radio === 'radio2' && src) {
    return <video src={src} />
  }
  return null
}

function extractVideoId(url?: string) {
  if (!url) return null
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

async function extractFileUrl(files: FileList | undefined, cb: (buf: string | null) => void) {
  if (!files?.length) return cb(null)
  const reader = new FileReader()
  reader.readAsDataURL(files[0])
  reader.addEventListener('load', (e) => {
    const buf = e.target?.result as string
    if (buf) cb(buf)
  })
}
