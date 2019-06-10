import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import styles from './footer.module.css'

const Footer = ({ darkMode }) => (
  <footer className={cn(styles.footer, { [styles.dark]: darkMode })}>
    <p>
      <a href="https://github/bpetetot/conference-hall" target="blank">
        <i className="fa fa-github fa-2x" />
      </a>
      <br />
      <strong>Conference Hall</strong>
      <br />
      Released under the MIT License <br />
      Copyright © 2018-2019 by&nbsp;
      <a href="https://twitter.com/bpetetot" target="blank">
        Benjamin Petetot
      </a>
    </p>
  </footer>
)

Footer.propTypes = {
  darkMode: PropTypes.bool,
}

Footer.defaultProps = {
  darkMode: false,
}

export default Footer
