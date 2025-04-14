import TableOfContent from '@/components/Blog/TableOfContent'
import ArticlePage from '@/components/Common/ArticlePage'
import { getArticle } from '@/lib/actions/article.action'
import { websiteName } from '@/lib/constants/commonName'
import { getLocale, getTranslations } from 'next-intl/server'
import React from 'react'

export async function generateMetadata({ params }) {
  const { slug } = params
  console.log(slug);
  
  const locale = await getLocale()
  const t = await getTranslations('ArticlePage')
  const { article } = await getArticle(locale, slug)
  const keywordsArray = article.keywords.split(',').map(keyword => keyword.trim());
  return {
    title: `${article.metaTitle} | ${t('seo.title_suffix')}`,
    description: article.metaDescription || t('seo.default_description'),
    keywords: keywordsArray,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/blogs/${slug}`,
      languages: {
        'en': `${process.env.NEXT_PUBLIC_BASE_URL}/en/blogs/${slug}`,
        'pl': `${process.env.NEXT_PUBLIC_BASE_URL}/pl/blogs/${slug}`,
      },
    },
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      type: 'article',
      publishedTime: article.createdAt,
      modifiedTime: article.updatedAt,
      authors: ['Aakib'],
      tags: keywordsArray,
      images: [
        {
          url: article.ogImage || `${process.env.NEXT_PUBLIC_BASE_URL}/default-og.jpg`,
          width: 1200,
          height: 630,
          alt: article.metaTitle,
        },
      ],
      locale: locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.metaTitle,
      description: article.metaDescription,
      images: [article.ogImage || `${process.env.NEXT_PUBLIC_BASE_URL}/default-twitter.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
      },
    },
  }
}

const BlogPostSchema = async ({ article, locale }) => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.metaTitle,
    "image": article.metaDescription,
    "datePublished": article.createdAt,
    "dateModified": article.updatedAt,
    "author": {
      "@type": "Person",
      "name": 'Aakib',
    },
    "publisher": {
      "@type": "Organization",
      "name": websiteName,
      "logo": {
        "@type": "ImageObject",
        "url": `${process.env.NEXT_PUBLIC_BASE_URL}/assets/logo.png`
      }
    },
    "description": article.excerpt,
    "articleBody": article.content,
    "inLanguage": locale
  }

  return (
    <script type="application/ld+json">
      {JSON.stringify(schemaData)}
    </script>
  )
}

const BreadcrumbSchema = async ({ locale, article }) => {
  const t = await getTranslations('ArticlePage')

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": t('breadcrumb.home'),
        "item": `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": t('breadcrumb.blog'),
        "item": `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/blogs`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": article.title,
        "item": `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/blogs/${article.slug}`
      }
    ]
  }

  return (
    <script type="application/ld+json">
      {JSON.stringify(schemaData)}
    </script>
  )
}

const PublisherSchema = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": websiteName,
    "url": process.env.NEXT_PUBLIC_BASE_URL,
    "logo": `${process.env.NEXT_PUBLIC_BASE_URL}/assets/logo.png`
  }

  return (
    <script type="application/ld+json">
      {JSON.stringify(schemaData)}
    </script>
  )
}

const page = async ({ params }) => {
  const { slug } = await params
  const locale = await getLocale()
  const { article } = await getArticle(locale, slug)
  return (
    <main className='grid grid-cols-1 lg:grid-cols-10 lg:gap-4 gap-y-2 gap-x-0'>
      <BlogPostSchema article={article && article} locale={locale} />
      <BreadcrumbSchema article={article && article} locale={locale} />
      <PublisherSchema />
      <aside className='col-span-3 h-auto relative'>
        <TableOfContent content={article?.content} />
      </aside>
      <div className="col-span-7 bg-neutral-200/25 p-3 md:p-6 rounded border border-neutral-300/80 shadow shadow-neutral-400/50" >
        {article?.content ? <ArticlePage content={article.content} /> : <p className='my-16 text-2xl font-bold text-center'>No Article Found</p>}
      </div>
    </main>
  )
}

export default page