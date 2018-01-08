import React from 'react'
import PropTypes from 'prop-types'

import Navbar from 'components/navbar'
import IconLink from 'components/iconLink'
import AvatarDropdown from './avatarDropdown'

import './navbar.css'

const SpeakerNavbar = ({ className }) => (
  <Navbar className={className}>
    <IconLink
      icon="fa fa-github"
      label="report a bug"
      className="navbar-link"
      href="https://github.com/bpetetot/conference-hall/issues/new"
    />
    <AvatarDropdown />
  </Navbar>
)

SpeakerNavbar.propTypes = {
  className: PropTypes.string,
}

SpeakerNavbar.defaultProps = {
  className: undefined,
}

export default SpeakerNavbar
