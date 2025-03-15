import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from '@/i18n/navigation'

const LanguageSwitcher = ({currentLg}) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="text-sm">{currentLg === 'en' ? (<span className='items-center flex font-medium'><UKFlag/> English</span>) :  (<span className='items-center flex font-medium'><PolandFlag/> Polish</span>)}</DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Select Language</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {['en', 'pl'].map((locale) => (
                    <DropdownMenuItem key={locale}>
                        <Link
                            key={locale}
                            href={'/'}
                            locale={locale}
                            className={`block px-4 py-2 text-sm ${currentLg === locale
                                    ? 'bg-blue-50 text-blue-700'
                                    : 'text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            {locale === 'en' ? (<span className='items-center flex font-medium'><UKFlag/> English</span>) : (<span className='items-center flex font-medium'><PolandFlag/> Polish</span>)}
                        </Link>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default LanguageSwitcher

export const PolandFlag = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="iconify iconify--twemoji w-[25px] me-1 inline"
      viewBox="0 0 36 36"
      {...props}
    >
      <path fill="#EEE" d="M32 5H4a4 4 0 0 0-4 4v9h36V9a4 4 0 0 0-4-4z" />
      <path fill="#DC143C" d="M0 27a4 4 0 0 0 4 4h28a4 4 0 0 0 4-4v-9H0v9z" />
    </svg>
)

const UKFlag = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="iconify iconify--twemoji w-[25px] me-1 inlin"
      viewBox="0 0 36 36"
      {...props}
    >
      <path
        fill="#00247D"
        d="M0 9.059V13h5.628zM4.664 31H13v-5.837zM23 25.164V31h8.335zM0 23v3.941L5.63 23zM31.337 5H23v5.837zM36 26.942V23h-5.631zM36 13V9.059L30.371 13zM13 5H4.664L13 10.837z"
      />
      <path
        fill="#CF1B2B"
        d="m25.14 23 9.712 6.801a3.977 3.977 0 0 0 .99-1.749L28.627 23H25.14zM13 23h-2.141l-9.711 6.8c.521.53 1.189.909 1.938 1.085L13 23.943V23zm10-10h2.141l9.711-6.8a3.988 3.988 0 0 0-1.937-1.085L23 12.057V13zm-12.141 0L1.148 6.2a3.994 3.994 0 0 0-.991 1.749L7.372 13h3.487z"
      />
      <path
        fill="#EEE"
        d="M36 21H21v10h2v-5.836L31.335 31H32a3.99 3.99 0 0 0 2.852-1.199L25.14 23h3.487l7.215 5.052c.093-.337.158-.686.158-1.052v-.058L30.369 23H36v-2zM0 21v2h5.63L0 26.941V27c0 1.091.439 2.078 1.148 2.8l9.711-6.8H13v.943l-9.914 6.941c.294.07.598.116.914.116h.664L13 25.163V31h2V21H0zM36 9a3.983 3.983 0 0 0-1.148-2.8L25.141 13H23v-.943l9.915-6.942A4.001 4.001 0 0 0 32 5h-.663L23 10.837V5h-2v10h15v-2h-5.629L36 9.059V9zM13 5v5.837L4.664 5H4a3.985 3.985 0 0 0-2.852 1.2l9.711 6.8H7.372L.157 7.949A3.968 3.968 0 0 0 0 9v.059L5.628 13H0v2h15V5h-2z"
      />
      <path fill="#CF1B2B" d="M21 15V5h-6v10H0v6h15v10h6V21h15v-6z" />
    </svg>
  )