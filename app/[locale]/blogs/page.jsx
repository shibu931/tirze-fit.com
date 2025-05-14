import BlogCard from '@/components/Blog/BlogCard'
import { getAllArticles } from '@/lib/actions/article.action'
import { getLocale, getTranslations } from 'next-intl/server'
import React from 'react'

export async function generateMetadata() {
  const locale = await getLocale()
  const t = await getTranslations('BlogListPage');
  return {
    title: t('seo.title'),
    description: t('seo.description'),
    keywords: t('seo.keywords').split(', '),
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/blogs`,
    },
    openGraph: {
      title: t('seo.og_title'),
      description: t('seo.og_description'),
      type: 'website',
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/default-blog-og.jpg`,
          width: 1200,
          height: 630,
          alt: t('seo.og_image_alt'),
        },
      ],
      locale: await getLocale(),
    },
    twitter: {
      card: 'summary_large_image',
      title: t('seo.twitter_title'),
      description: t('seo.twitter_description'),
      images: [`${process.env.NEXT_PUBLIC_BASE_URL}/default-blog-twitter.jpg`],
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
  };
}

const BlogListSchema = async ({ posts, locale }) => {
  const t = await getTranslations('BlogListPage');
  
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": t('schema.name'),
    "description": t('schema.description'),
    "inLanguage": locale,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": posts.map((post, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "BlogPosting",
          "url": `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/blogs/${post.slug}`,
          "name": post.title,
          "datePublished": post.createdAt,
          "image": post.ogImage,
          "author": {
            "@type": "Person",
            "name": 'Aakib',
            "url": `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/about`
          }
        }
      }))
    }
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(schemaData)}
    </script>
  );
};

const BreadcrumbSchema = async ({ locale }) => {
  const t = await getTranslations('BlogListPage');
  
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
      }
    ]
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(schemaData)}
    </script>
  );
};

const page = async () => {
  const t = await getTranslations('Common')
  const locale = await getLocale()
  const { articles } = await getAllArticles(locale)
  
  return (
    <>
      <section className='bg-blue-100 pt-28 pb-12 flex items-center justify-center border-b border-blue-200'>
        <h1 className='text-center text-4xl font-bold uppercase text-blue-900 tracking-widest'>{t('blog')}</h1>
      </section>
      <main className='!pt-[50px]'>
        <BlogListSchema posts={articles} locale={locale} />
        <BreadcrumbSchema locale={locale} />
        <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-10'>
          {articles.map((blog) => (
            <BlogCard 
              key={blog.slug} 
              {...blog} 
              locale={locale}
              href={`/${locale}/blogs/${blog.slug}`}
            />
          ))}
        </section>
      </main>
    </>
  )
}

export default page