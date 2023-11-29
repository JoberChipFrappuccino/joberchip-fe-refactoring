import { Link } from 'react-router-dom'

interface Props {
  link?: string
  text?: string
}

export function BlockBottomLink({ link, text = '바로 가기' }: Props) {
  return <div>{link && <Link to={link}>{text}</Link>}</div>
}
