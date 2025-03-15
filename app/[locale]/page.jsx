import ContactForm from "@/components/Common/ContactForm";
import Image from "next/image";
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
export default function Home() {
  const t = useTranslations('HomePage');
  return (
    <main>
      <section>
        <div className="relative banner-img">
          <div className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] z-10 banner-text text-center">
            <h1 className="text-center font-bold md:font-extrabold text-3xl md:text-5xl uppercase text-white tracking-wider">{t('title')}</h1>
              <Link className="banner-btn inline-block mt-4 text-white  px-4 py-1.5 font-semibold hover:cursor-pointer shadow-lg shadow-neutral-900/25 bg-blue-700 rounded hover:bg-blue-800" href="/shop">
              {t('banner_btn')}
              </Link>
          </div>
          <Image
            src={'/assets/banner.webp'}
            width={1000}
            height={667}
            alt=""
            className="-z-10 w-full h-[400px] md:h-[600px] object-cover object-top"
          />
        </div>
      </section>

      <ContactForm/>
    </main>
  );
}
