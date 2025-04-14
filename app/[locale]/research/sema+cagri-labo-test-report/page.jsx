import PdfViewer from '@/components/Common/PdfViewer'
import { getTranslations } from 'next-intl/server';
import React from 'react'

export async function generateMetadata({ params }) {
    const { locale } = await params;
    const r = await getTranslations('Research')
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const canonicalUrl = new URL(`/${locale}/research/sema+cagri-labo-test-report`, baseUrl).toString();
    const title = r('sema+cagri-labo-test-report.title')
    const description = r('sema+cagri-labo-test-report.description')

    return {
        title: title,
        description: description,
        metadataBase: new URL(baseUrl),
        alternates: {
            canonical: canonicalUrl,
            languages: {
                'x-default': canonicalUrl,
                ...(locale === 'en' ? {} : { 'en': new URL('/en/research/sema+cagri-labo-test-report', baseUrl).toString() }),
                ...(locale === 'pl' ? {} : { 'pl': new URL('/pl/research/sema+cagri-labo-test-report', baseUrl).toString() }),
            },
        },
        openGraph: {
            title: title,
            description: description,
            url: canonicalUrl,
            type: 'article',
            locale: locale,
            publishedTime: '12-04-2025',
            modifiedTime: '12-04-2025',
        },
        twitter: {
            card: 'summary_large_image',
            title: title,
            description: description,
        },
    };
}

const page = async () => {
    const r = await getTranslations('Research')
    return (
        <main>
            <h1 className='text-xl md:text-3xl font-bold text-center text-neutral-800 my-6'>{r('sema+cagri-labo-test-report.title')}</h1>
            <p className="text-center md:text-lg mb-6 md:mb-10">{r('sema+cagri-labo-test-report.description')}</p>
            <PdfViewer filename={'semacagrilabotest.pdf'} />
        </main>
    )
}

export default page