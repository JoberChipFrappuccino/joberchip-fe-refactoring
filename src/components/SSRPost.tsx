import { POST_API_KEY } from '@/constants'
import useServerSideProps from '@/hooks/serverSideProps'
import './SSRPost.scss'
interface Post {
  title: string
  description: string
}
export default function SSRPost() {
  const post: Post = useServerSideProps(POST_API_KEY)
  return (
    <div className="ssr-post-container">
      <h1>{post.title}</h1>
      <p>{post.description}</p>
    </div>
  )
}
