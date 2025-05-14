import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Common/Navbar";
import Footer from "@/components/Common/Footer";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "@/components/ui/sonner";
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Script from "next/script";
import AuthProvider from "./AuthProvider";
import { populateDB } from "@/lib/actions/product.action";
const roboto = Roboto({
  subsets: ["latin"],
});

const metadataTranslations = {
  en: {
    title: "Tirze-Fit | The best Tirzepatid in Poland - Check it out",
    description: "Discover the best Tirzepatid in Poland with Tire-Fit! Effective help in weight control and health. Check our offer today!",
    keywords: ["tirzepatyd", "semaglutyd leki", "semaglutyd", "semaglutide+Cagrilintide", "semaglutydu", "tirzepatide skutki uboczne", "tirzepatyd lek", "tirzepatyd w polsce", "semaglutyd odchudzanie"],
    openGraph: {
      images: ['/og-en.jpg'],
    }
  },
  pl: {
    title: "Tire-Fit | Najlepszy Tirzepatyd w Polsce - Sprawdź",
    description: "Odkryj najlepszy Tirzepatyd w Polsce z Tire-Fit! Skuteczna pomoc w kontroli wagi i zdrowiu. Sprawdź naszą ofertę już dziś!",
    keywords: ["tirzepatyd", "semaglutyd leki", "semaglutyd", "semaglutide+Cagrilintide", "semaglutydu", "tirzepatide skutki uboczne", "tirzepatyd lek", "tirzepatyd w polsce", "semaglutyd odchudzanie"],
    openGraph: {
      images: ['/og-fr.jpg'],
    }
  }
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const metadata = metadataTranslations[locale] || metadataTranslations.en;

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}`,
      languages: {
        'en': process.env.NEXT_PUBLIC_BASE_URL + '/en',
        'pl': process.env.NEXT_PUBLIC_BASE_URL + '/pl',
      },
    },
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}`,
      siteName: "Tirze Fit",
      images: metadata.openGraph.images,
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
      images: metadata.openGraph.images,
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
    icons: {
      icon: [
        { url: '/android-chrome-192x192.png', type: 'image/png' },
      ],
      shortcut: ['/android-chrome-192x192.png'],
      apple: '/apple-touch-icon.png',
      other: {
        rel: 'apple-touch-icon',
        url: '/apple-touch-icon.png',
      },
    },
  };
}

function StructuredData({ locale }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const logoUrl = `${baseUrl}/logo.png`; // Update with your actual logo path

  const schemaData = [
    // Breadcrumb Schema
    {
      "@context": "https://schema.org/",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": `${baseUrl}/${locale} - Home Page`,
          "item": `${baseUrl}/${locale}`
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Shop Now",
          "item": `${baseUrl}/${locale}/shop`
        }
      ]
    },
    // Website Schema
    {
      "@context": "https://schema.org/",
      "@type": "WebSite",
      "name": "Tirze-fit",
      "url": `${baseUrl}/${locale}`,
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${baseUrl}/${locale}/search/{search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    },
    // Organization Schema
    {
      "@context": "https://schema.org",
      "@type": "DiagnosticLab",
      "name": "Tirze-fit",
      "url": `${baseUrl}/${locale}`,
      "logo": logoUrl,
      "sameAs": `${baseUrl}/${locale}`
    }
  ];

  return (
    <>
      {schemaData.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </>
  );
}

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale}>
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-8VBPBP46SM"></Script>
        <Script>
          {
            `window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-8VBPBP46SM');
            `
          }
        </Script>
        <StructuredData locale={locale} />
        <meta name="google-site-verification" content="9ceNRVxKxsqcPHG5KRTV9EQE5NY-qqoUD9NrhPTlXtI" />
      </head>
      <body
        className={`${roboto.className} antialiased`}
      >
          <NextIntlClientProvider>
        <AuthProvider>
            <CartProvider>
              <Navbar locale={locale}/>
              {children}
              <Footer />
              <Toaster richColors />
            </CartProvider>
        </AuthProvider>
          </NextIntlClientProvider>
      </body>
    </html>
  );
}
