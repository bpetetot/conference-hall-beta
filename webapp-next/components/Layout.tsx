import Head from 'next/head'
import Link from 'next/link'
import React, { ReactNode } from 'react'

type Props = { children?: ReactNode }

const Layout = ({ children }: Props) => (
  <>
    <Head>
      <title>Conference Hall</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav>
        <Link href="/">Home</Link>
      </nav>
    </header>
    <main>{children}</main>
    <footer>
      <span>Footer</span>
    </footer>
  </>
)

export default Layout
