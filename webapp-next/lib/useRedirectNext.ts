import { useRouter } from 'next/router'
import { useCallback } from 'react'

export function useRedirectNext(defaultRoute?: string) {
  const router = useRouter()

  const redirectNext = useCallback(() => {
    const { next } = router.query
    if (next) {
      router.replace(next as string)
    } else if (defaultRoute) {
      router.replace(defaultRoute)
    }
  }, [router])

  return redirectNext
}
