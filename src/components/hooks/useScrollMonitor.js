import { useState, useEffect, useRef } from 'react'

export default scrollHeight => {
  const scrollWrapper = useRef(null)

  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let request = null
    const wrapper = scrollWrapper.current
    function handleScroll() {
      if (request === null) {
        request = window.requestAnimationFrame(() => {
          if (wrapper.scrollTop >= scrollHeight && !scrolled) {
            setScrolled(true)
          }
          if (wrapper.scrollTop < scrollHeight && scrolled) {
            setScrolled(false)
          }
          request = null
        })
      }
    }
    wrapper.addEventListener('scroll', handleScroll)
    return () => wrapper.removeEventListener('scroll', handleScroll)
  })

  return [scrollWrapper, scrolled]
}
