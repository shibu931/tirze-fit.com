import { auth, signOut } from '@/auth'
import ProfileDashboard from '@/components/ProfileDashboard/ProfileDashBoard'
import { Button } from '@/components/ui/button'
import { getOrdersByEmail } from '@/lib/actions/order.action'
import { getReferralDetails } from '@/lib/actions/referrars.action'
import { getUserByEmail } from '@/lib/actions/user.action'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {
  const session = await auth()
  if (!session?.user) {
    redirect('/login')
  }
  const {user} = await getUserByEmail(session.user.email)
  const referralDetails = await getReferralDetails()
  const {orders} = await getOrdersByEmail(session.user.email);
  return (
    <main>
      <ProfileDashboard referralDetails={referralDetails} orders={orders} user={user}/>
    </main>
  )
}

export default page