import { footerLinks } from '@/lib/constants/links'
import { useTranslations } from 'next-intl';
import {Link} from '@/i18n/navigation';
import React from 'react'
import { FaInstagram, FaWhatsapp, FaFacebookF } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";

const Footer = () => {
  const t = useTranslations('Footer')
  const l = useTranslations('Links')
  return (
    <footer className='bg-neutral-200 pt-8'>
      <div className="container mx-auto mb-8 px-3">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          <div className="">
            <h2 className='text-3xl font-bold uppercase text-blue-700'>Tirzepatide</h2>
          </div>
          <div className="lg:pe-10">
            <p className='text-lg font-bold mb-2 uppercase tracking-wider'>{t('contact_info')}</p>
            <p className='text-neutral-600'>
              Novell
              118 South 6th Street
              Minneapolis, MN 55402
              USA
              Import from
              USA Mon-Fri 9:00 a.m. – 5:00
              p.m. contact@tirzepatyd.store
            </p>
          </div>
          <div className="">
          <p className='text-lg font-bold mb-2 uppercase tracking-wider'>{t('imp_link')}</p>
          <ul className='space-y-1'>
            {
              footerLinks.quickLinks.map((link)=>(
                <li key={link.label}><Link className='text-neutral-600 hover:text-blue-700' href={link.slug}>{l(link.label)}</Link></li>
            ))
          }
          </ul>
          </div>
          <div>
          <p className='text-lg font-bold mb-2 uppercase tracking-wider'>{t('community')}</p>
            <ul className='flex space-x-3'>
              <li><Link href={'#'}><FaInstagram className='text-xl'/></Link></li>
              <li><Link href={'#'}><FaWhatsapp  className='text-xl'/></Link></li>
              <li><Link href={'#'}><RiTwitterXLine  className='text-xl'/></Link></li>
              <li><Link href={'#'}><FaFacebookF  className='text-xl'/></Link></li>
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