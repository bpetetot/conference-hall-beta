import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import IconLink from 'components/iconLink'
import IconLabel from 'components/iconLabel'
import { useCurrentEvent } from 'features/event/currentEventContext'
import AvatarDropdown from './avatarDropdown'
import './navbar.css'

const Navbar = ({ className }) => {
  const { data: event } = useCurrentEvent()

  return (
    <nav className={cn('navbar', className)}>
      <div className="navbar-left">
        {!!event && <IconLabel icon="fa fa-caret-right" label={event?.name} />}
      </div>
      <div className="navbar-right">
        <IconLink
          icon="fa fa-github"
          label="report a bug"
          className="navbar-link"
          href="https://github.com/bpetetot/conference-hall/issues/new"
        />
        <AvatarDropdown />
      </div>
    </nav>
  )
}

Navbar.propTypes = {
  className: PropTypes.string,
}

Navbar.defaultProps = {
  className: undefined,
}

export default Navbar
