import NavbarItem from './Item'

const NavbarDesktop = () => (
  <nav className="hidden md:block py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-x-4">
    <NavbarItem href="/" size="sm">
      Dashboard
    </NavbarItem>
    <NavbarItem href="/talks" size="sm">
      Talks
    </NavbarItem>
    <NavbarItem href="/profile" size="sm">
      Profile
    </NavbarItem>
  </nav>
)

export default NavbarDesktop
