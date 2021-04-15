import { useRouter } from 'next/router'

export function useSelectedRoute(href: string, defaultSelected = false) {
  const { asPath, route } = useRouter()

  if (!asPath) return false

  if (href.startsWith('#')) {
    return asPath.endsWith(href) || (defaultSelected && !asPath.includes('#'))
  }

  return route === href
}
