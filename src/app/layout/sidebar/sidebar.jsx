import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import IconLabel from 'components/iconLabel'

import './sidebar.css'

function SideBar({ className, children }) {
  return (
    <aside className={cn('sidebar', className)}>
      <div>{children}</div>
      <a href="https://github.com/sponsors/bpetetot" target="NEW" className="donate-button">
        <IconLabel icon="fa fa-heart" label="Donate to help ;)" />
      </a>
    </aside>
  )
}

SideBar.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
}

SideBar.defaultProps = {
  className: undefined,
}

export default SideBar
