import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import { withSizes } from 'styles/utils'
import IconLabel from 'components/iconLabel'
import styles from './label.module.css'

function Label({
  name,
  label,
  hints,
  tooltip,
  children,
  error,
  inline,
  isMobile,
  isTablet,
  className,
  classNameInput,
}) {
  return (
    <div
      className={cn(
        styles.wrapper,
        {
          [styles.error]: !!error,
          [styles.inline]: inline && !isMobile && !isTablet,
          [styles.hasHints]: !!hints || !!error,
        },
        className,
      )}
    >
      {label && (
        <label className={styles.label} htmlFor={name}>
          <div>
            <span className={styles.text}>{label}</span>
            {tooltip && <p className={styles.tooltip}>{tooltip}</p>}
          </div>
          {hints && <div className={styles.hints}>{hints}</div>}
          {error && (
            <IconLabel icon="fa fa-warning" label={error} className={styles.errorMessage} />
          )}
        </label>
      )}

      <div className={styles.field}>
        <div className={classNameInput}>{children}</div>
      </div>
    </div>
  )
}

Label.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  hints: PropTypes.string,
  tooltip: PropTypes.string,
  children: PropTypes.node.isRequired,
  error: PropTypes.string,
  inline: PropTypes.bool,
  isMobile: PropTypes.bool,
  isTablet: PropTypes.bool,
  className: PropTypes.string,
  classNameInput: PropTypes.string,
}

Label.defaultProps = {
  label: undefined,
  hints: undefined,
  tooltip: undefined,
  error: undefined,
  inline: false,
  isMobile: false,
  isTablet: false,
  className: undefined,
  classNameInput: undefined,
}

export default withSizes(Label)
