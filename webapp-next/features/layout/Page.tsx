import { useRouter } from 'next/router'
import React, { ReactNode, useEffect } from 'react'

import { useAuth } from '../../lib/auth'
import Footer from './Footer'
import LoadingPage from './Loading'
import Navbar from './navbar/Navbar'

type Props = {
  authenticated?: boolean
  children?: ReactNode
}

const Page = ({ authenticated = false, children }: Props) => {
  const router = useRouter()
  const { isLoading, isAuthenticated } = useAuth()

  useEffect(() => {
    if (!authenticated) return
    if (!isLoading && !isAuthenticated) {
      router.push(`/login?next=${router.asPath}`)
    }
  }, [router, isLoading, isAuthenticated])

  if (authenticated && (isLoading || !isAuthenticated)) {
    return <LoadingPage />
  }

  return (
    <>
      <Navbar />
      <main className="-mt-28 max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">{children}</main>
      <Footer />
    </>
  )
}

export default Page
