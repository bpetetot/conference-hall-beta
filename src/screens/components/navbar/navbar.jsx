import React from 'react'
import PropTypes from 'prop-types'

import { GITHUB_ISSUES } from 'helpers/github'
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
      href={GITHUB_ISSUES}
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
