import { LoadingSpinner } from '@/components/Common/Loading'
import ProductSkeleton from '@/components/LoadingSkeletons/ProductSkeleton'
import React from 'react'

const loading = () => {
  return (
    <main>
        <ProductSkeleton/>
    </main>
  )
}

export default loading