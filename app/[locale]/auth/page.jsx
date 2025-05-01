import { auth } from '@/auth'
import AuthForm from '@/components/Auth/AuthForm'
import { redirect } from 'next/navigation';
import React from 'react'

const page = async () => {
    const session = await auth();
    if (session?.user) {
        redirect('/profile')
    }
    return (
        <main className='!pb-12'>
            <div className='bg-neutral-50 max-w-md border border-gray-200 rounded-lg w-full mx-auto p-4 sm:py-8 md:py-10'>
                <AuthForm />
            </div>
        </main>
    )
}

export default page