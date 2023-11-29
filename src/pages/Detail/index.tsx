import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { SEO } from '@/constants'
import useServerSideProps from '@/hooks/serverSideProps'
import SSRPost from '@/components/SSRPost'

interface PageSource {
  title: Record<string, string>
}
export default function Detail() {
  const [count, setCount] = useState(0)
  const pageSource: PageSource = useServerSideProps(SEO)

  return (
    <>
      <Helmet>
        <title>{pageSource.title['/detail']}</title>
      </Helmet>
      <div className="flex">
        <h1 className="detail-title">Detail Page</h1>
        <h1 className="text-sky-900">Count : {count}</h1>
        <div>
          <button type="button" className="mr-4" onClick={() => setCount((prev) => ++prev)}>
            Increment
          </button>
          <button type="button" className="mr-4" onClick={() => setCount((prev) => --prev)}>
            Decrement
          </button>
        </div>
      </div>
      <section>
        <h1 className="text-3xl">Server Side Rendering!</h1>
        <SSRPost />
      </section>
    </>
  )
}
