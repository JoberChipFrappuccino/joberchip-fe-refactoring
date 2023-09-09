type Post = { title: string; description: string }
export default function Post() {
  return (
    <div className='ssr-post-container'>
      <h1>{'test'}</h1>
      <p>{'test description'}</p>
    </div>
  )
}
