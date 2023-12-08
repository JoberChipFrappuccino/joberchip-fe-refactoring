import { useEffect, useState } from 'react'

interface PreviewProps {
  radio: string
  youtubeLink?: string
  videoFileOrURL?: FileList | string
}
export default function Preview({ radio, youtubeLink, videoFileOrURL }: PreviewProps) {
  const [thumb, setThumb] = useState<string | null>(null)
  const [videoSrc, setVideoSrc] = useState<string | null>(null)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)

  useEffect(() => {
    if (videoFileOrURL instanceof FileList) {
      extractFileUrl(videoFileOrURL, (buf) => setVideoSrc(buf))
      setVideoUrl(null)
    } else if (videoFileOrURL) {
      setVideoSrc(null)
      setVideoUrl(videoFileOrURL)
    }
    if (youtubeLink) {
      setThumb(linkToThumb(youtubeLink))
    }
  }, [videoFileOrURL, youtubeLink])

  if (thumb) {
    return <img src={thumb} alt="youtube thumbnail" />
  } else if (radio === 'radio2' && videoSrc) {
    return <video src={videoSrc} />
  } else if (videoUrl) {
    return <img src={videoUrl} />
  }
  return null
}

function linkToThumb(url?: string) {
  if (!url) return null
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  const videoId = match && match[2].length === 11 ? match[2] : null
  if (videoId) return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  return null
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
