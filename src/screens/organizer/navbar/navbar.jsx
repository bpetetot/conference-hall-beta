import React from 'react'
import PropTypes from 'prop-types'
import Navbar from '../../../components/navbar'
import AvatarDropdown from './avatarDropdown'

const SpeakerNavbar = ({ className }) => (
  <Navbar className={className}>
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
