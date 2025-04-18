import { footerLinks } from '@/lib/constants/links'
import { useTranslations } from 'next-intl';
import {Link} from '@/i18n/navigation';
import React from 'react'
import { FaInstagram, FaWhatsapp, FaFacebookF } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import Image from 'next/image';

const Footer = () => {
  const t = useTranslations('Footer')
  const l = useTranslations('Links')
  return (
    <footer className='bg-neutral-200 pt-8'>
      <div className="container mx-auto mb-8 px-3">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:gap-x-12">
          <div className="">
            <Link href="/">
              <Image 
                src="/assets/logo.png"
                width={180}
                height={120}
                className=""
                alt="Tirze-fit"
              />
            </Link>
            <p>{t('footer_text')}</p>
          </div>
          <div className="">
          <p className='text-lg font-bold mb-2 uppercase tracking-wider'>{t('imp_link')}</p>
          <ul className='space-y-1 !ps-0'>
            {
              footerLinks.quickLinks.map((link)=>(
                <li key={link.label}><Link className='text-neutral-600 hover:text-blue-700' href={link.slug}>{l(link.label)}</Link></li>
            ))
          }
          </ul>
          </div>
          <div>
          <p className='text-lg font-bold mb-2 uppercase tracking-wider'>{t('community')}</p>
            <ul className='flex space-x-3 !ps-0'>
              <li><Link aria-label='Instagram' href={'#'}><FaInstagram className='text-xl'/></Link></li>
              <li><Link aria-label='WhatsApp' href={'#'}><FaWhatsapp  className='text-xl'/></Link></li>
              <li><Link aria-label='Twitter' href={'#'}><RiTwitterXLine  className='text-xl'/></Link></li>
              <li><Link aria-label='Facebook' href={'#'}><FaFacebookF  className='text-xl'/></Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-blue-700 py-2">
        <p className="text-center text-white font-semibold">Tirzepatide © 2025</p>
      </div>
    </footer>
  )
}

export default Footer