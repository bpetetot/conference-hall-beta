import React, { memo, useState } from 'react'

import Logo from '../atoms/Logo'
import NavbarDesktop from './Desktop'
import NavbarMobile from './Mobile'
import AvatarDropdown from './UserDropdown'

const Navbar = () => {
  const [opened, setOpened] = useState(false)

  return (
    <header className="bg-primary-800 pb-32">
      <section className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 px-4 sm:px-0 md:border-b border-white border-opacity-20">
          <Logo size="s" className="w-auto" />
          <AvatarDropdown />
          <NavbarMobile.ToggleButton opened={opened} onClick={() => setOpened(!opened)} />
        </div>
      </section>
      {opened && <NavbarMobile onClose={() => setOpened(false)} />}
      <NavbarDesktop />
    </header>
  )
}

export default memo(Navbar)
