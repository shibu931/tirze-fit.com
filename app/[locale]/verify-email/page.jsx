import VerifyEmail from '@/components/Auth/VerifyEmail'
import React from 'react'

const page = async ({params}) => {
  const {locale} = await params
  return (
    <main>
      <VerifyEmail locale={locale}/>
    </main>
  )
}

export default page