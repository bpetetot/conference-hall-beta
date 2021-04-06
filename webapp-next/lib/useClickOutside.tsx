/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef } from 'react'

type Props = { onClose: () => void }

export function useClickOutside({ onClose }: Props) {
  const ref = useRef(null)

  const escapeListener = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
  }, [])

  const clickListener = useCallback(
    (e: MouseEvent) => {
      if (!ref) return
      if (!ref.current) return
      if (!(ref.current as any).contains(e.target)) onClose()
    },
    [ref.current],
  )

  useEffect(() => {
    document.addEventListener('click', clickListener)
    document.addEventListener('keyup', escapeListener)
    return () => {
      document.removeEventListener('click', clickListener)
      document.removeEventListener('keyup', escapeListener)
    }
  }, [])

  return { ref }
}
