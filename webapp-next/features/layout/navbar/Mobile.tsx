import { MenuIcon } from '@heroicons/react/outline'

import Avatar from '../../../components/Avatar'
import { useAuth } from '../../../lib/auth'
import { useClickOutside } from '../../../lib/useClickOutside'
import NavbarItem from './Item'

type NavbarMobileProps = { onClose: () => void }

const NavbarMobile = ({ onClose }: NavbarMobileProps) => {
  const { user } = useAuth()
  const { ref } = useClickOutside({ onClose })

  return (
    <nav ref={ref} className="absolute bg-primary-800 md:hidden min-w-full" id="mobile-menu">
      <div className="px-2 py-3 space-y-1 sm:px-3">
        <NavbarItem href="/" block>
          Dashboard
        </NavbarItem>
        <NavbarItem href="/talks" block>
          Talks
        </NavbarItem>
      </div>
      <div className="pt-4 pb-3 border-t border-primary-700">
        <div className="flex items-center px-5">
          <Avatar src={user?.photoURL} name={user?.name} />
          <div className="ml-3">
            <div className="text-base font-medium leading-none text-white">{user?.name}</div>
            <div className="text-sm font-medium leading-none text-gray-300">{user?.email}</div>
          </div>
        </div>
        <div className="mt-3 px-2 space-y-1">
          <NavbarItem href="/profile" block>
            Your Profile
          </NavbarItem>
          <NavbarItem href="/signout" block>
            Sign out
          </NavbarItem>
        </div>
      </div>
    </nav>
  )
}

type ToggleButtonProps = {
  opened: boolean
  onClick: () => void
}

const ToggleButton = ({ opened, onClick }: ToggleButtonProps) => (
  <div className="-mr-2 md:hidden">
    <button
      type="button"
      className="bg-primary-800 inline-flex p-2 rounded-md text-primary-400 hover:text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-800 focus:ring-white"
      aria-controls="mobile-menu"
      aria-expanded={opened}
      onClick={onClick}
    >
      <span className="sr-only">Toggle main menu</span>
      <MenuIcon className="block h-6 w-6" />
    </button>
  </div>
)

NavbarMobile.ToggleButton = ToggleButton

export default NavbarMobile
