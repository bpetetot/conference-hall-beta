import React from 'react'
import { forRoute } from '@k-redux-router/react-k-ramel'

import Navbar from 'layout/navbar'
import Footer from 'layout/footer'
import Contributors from 'screens/components/contributors'
import useScrollMonitor from 'components/hooks/useScrollMonitor'

import Event from './event'
import styles from './public.module.css'

const Public = () => {
  const [scrollWrapper, scrolled] = useScrollMonitor(300)

  return (
    <div ref={scrollWrapper} className={styles.public}>
      <Navbar fixed transparent={!scrolled} withSearchInput={scrolled} />
      <Event />
      <Contributors />
      <Footer darkMode />
    </div>
  )
}

export default forRoute('public')(Public)
