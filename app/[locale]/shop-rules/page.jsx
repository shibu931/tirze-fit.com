import ArticlePage from '@/components/Common/ArticlePage'
import { getArticle } from '@/lib/actions/article.action'

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const { article } = await getArticle(locale, 'shop-rules');

  if (!article) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found.',
      robots: {
        index: false,
        follow: false
      }
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const imageUrl = new URL(article.ogImage, baseUrl).toString();
  const keywordsArray = article.keywords.split(',').map(keyword => keyword.trim());
  const canonicalUrl = new URL(`/${locale}/shop-rules`, baseUrl).toString();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    image: imageUrl,
    datePublished: article.createdAt,
    dateModified: article.updatedAt,
    description: article.metaDescription,
    keywords: keywordsArray.join(", "),
    inLanguage: locale,
  };

  return {
    title: article.metaTitle,
    description: article.metaDescription,
    keywords: keywordsArray,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': canonicalUrl,
        ...(locale === 'en' ? {} : { 'en': new URL('/en/shop-rules', baseUrl).toString() }),
        ...(locale === 'fr' ? {} : { 'fr': new URL('/fr/shop-rules', baseUrl).toString() }),
      },
    },
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      url: canonicalUrl,
      type: 'article',
      locale: locale,
      publishedTime: article.createdAt,
      modifiedTime: article.updatedAt,
      images: [{
        url: imageUrl,
        alt: article.title,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.metaTitle,
      description: article.metaDescription,
      images: [imageUrl],
    },
    other: {
      'article:section': 'Article',
      'article:tag': keywordsArray,
      'script': JSON.stringify(articleSchema),
    },
  };
}

const page = async ({ params }) => {
  const { locale } = await params;
  const { article } = await getArticle(locale, 'shop-rules');

  return (
    <main>
      {
        article ? (<ArticlePage content={article && article.content}/>)
        :
        <p className='text-center text-3xl font-semibold tracking-wider'>No Content Found</p>
      }
    </main>
  )
}

export default page;