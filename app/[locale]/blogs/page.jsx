import BlogCard from '@/components/Blog/BlogCard'
import { getAllArticles } from '@/lib/actions/article.action'
import { getLocale, getTranslations } from 'next-intl/server'
import React from 'react'
const page = async () => {
  const t = await getTranslations('Common')
  const locale = await getLocale()
  const {articles} = await getAllArticles(locale)
  
  return (
    <>
      <section className='bg-blue-100 pt-28 pb-12 flex items-center justify-center border-b border-blue-200'>
        <h1 className='text-center text-4xl font-bold uppercase text-blue-900 tracking-widest'>{t('blog')}</h1>
      </section>
      <main className='!pt-[50px]'>
        <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-10'>
          {articles.map((blog)=> <BlogCard key={blog.slug} {...blog}/>)}
        </section>
      </main>
    </>
  )
}

export default page