import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

// TODO Add Unit Tests
export default function useRedirectNext() {
  const navigate = useNavigate()
  const { search } = useLocation()

  const params = new URLSearchParams(search)
  const next = params.get('next')

  const redirectNext = useCallback(() => {
    if (!next) return
    navigate(next, { replace: true })
  }, [navigate, next])

  return redirectNext
}
