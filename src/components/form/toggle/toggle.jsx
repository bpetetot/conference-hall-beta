import React, { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'

import styles from './toggle.module.css'

const Toggle = ({ name, checked, onChange, ...rest }) => {
  const [isChecked, setChecked] = useState(checked)

  useEffect(() => {
    setChecked(checked)
  }, [checked])

  const handleChange = useCallback(
    (e) => {
      setChecked(e.target.checked)
      onChange(e.target.checked)
    },
    [onChange],
  )

  return (
    <label className={styles.toggle} htmlFor={name}>
      <input id={name} type="checkbox" {...rest} checked={isChecked} onChange={handleChange} />
      <span className={styles.item} />
    </label>
  )
}

Toggle.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
}

Toggle.defaultProps = {
  checked: false,
}

export default Toggle
