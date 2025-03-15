import TableOfContent from '@/components/Blog/TableOfContent'
import ArticlePage from '@/components/Common/ArticlePage'
import { getArticle } from '@/lib/actions/article.action'
import React from 'react'

const page = async ({ params }) => {
  const { slug } = await params
  const {article}=await getArticle(slug)
  return (
    <main className='grid grid-cols-1 lg:grid-cols-10 gap-4'>
      <aside className='col-span-3 h-auto relative'>
        <TableOfContent content={article?.content} />
      </aside>
      <div className="col-span-7 bg-neutral-200/50 p-6 rounded border border-neutral-300/80 shadow-2xl shadow-neutral-400/50" >
        {article?.content ? <ArticlePage content={article.content} /> : <p className='my-16 text-2xl font-bold text-center'>No Article Found</p>}
      </div>
    </main>
  )
}

export default page