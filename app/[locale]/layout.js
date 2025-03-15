import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Common/Navbar";
import Footer from "@/components/Common/Footer";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "@/components/ui/sonner";
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';

const roboto = Roboto({
  subsets: ["latin"],
});

export const metadata = {
  title:"Weight Loss"
} 

export default async function RootLayout({ children,params }) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale}>
      <body
        className={`${roboto.className} antialiased`}
      >
        <NextIntlClientProvider>
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
          <Toaster richColors/>
        </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
