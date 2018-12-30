import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Badge from 'components/badge'

import styles from './eventTitle.module.css'

const EventTitle = ({
  name, type, subtitle, className,
}) => (
  <h1 className={cn(styles.title, className)}>
    <div>
      <span className={styles.name}>{name}</span> • {subtitle}
    </div>
    {type && (
      <Badge pill outline className={styles.type}>
        {type}
      </Badge>
    )}
  </h1>
)

EventTitle.propTypes = {
  name: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
}

EventTitle.defaultProps = {
  type: undefined,
  className: undefined,
}

export default EventTitle
