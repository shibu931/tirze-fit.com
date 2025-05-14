import PdfViewer from '@/components/Common/PdfViewer'
import { getTranslations } from 'next-intl/server';
import React from 'react'

export async function generateMetadata({ params }) {
    const { locale } = await params;
    const r = await getTranslations('Research')
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const canonicalUrl = new URL(`/${locale}/research/retatrutyd-labo-test-report`, baseUrl).toString();
    const title = r('retatrutyd-labo-test-report.title')
    const description = r('retatrutyd-labo-test-report.description')

    return {
        title: title,
        description: description,
        metadataBase: new URL(baseUrl),
        alternates: {
            canonical: canonicalUrl,
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
            <h1 className='text-xl md:text-3xl font-bold text-center text-neutral-800 my-6'>{r('retatrutyd-labo-test-report.title')}</h1>
            <p className="text-center md:text-lg mb-6 md:mb-10">{r('retatrutyd-labo-test-report.description')}</p>
            <PdfViewer filename={'retatrutyd-labo-test-report.pdf'} />
        </main>
    )
}

export default page