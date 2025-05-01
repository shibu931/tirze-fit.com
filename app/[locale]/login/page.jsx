// app/[locale]/login/page.tsx
import { redirect } from 'next/navigation';

export default async function page({ params }) {
    const {locale} = await params
    redirect(`/${locale}/auth?tab=login`);
}
