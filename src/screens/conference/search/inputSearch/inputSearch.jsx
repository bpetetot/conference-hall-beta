import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Button from 'components/button'

import styles from './inputSearch.module.css'

const SearchEventInput = ({ defaultValue, onSearch, darkMode }) => {
  const inputRef = useRef()

  const handleSearch = () => {
    onSearch(inputRef.current.value)
  }

  const handleKeyPress = (e) => {
    if (e.charCode === 13) handleSearch()
  }

  return (
    <div className={cn(styles.searchInput, { [styles.dark]: darkMode })}>
      <input
        ref={inputRef}
        type="text"
        defaultValue={defaultValue}
        placeholder="Search for events and meetups"
        onKeyPress={handleKeyPress}
        className={styles.input}
      />
      <Button onClick={handleSearch} className={styles.button}>
        <i className="fa fa-search" />
      </Button>
    </div>
  )
}

SearchEventInput.propTypes = {
  onSearch: PropTypes.func.isRequired,
  defaultValue: PropTypes.string,
  darkMode: PropTypes.bool,
}

SearchEventInput.defaultProps = {
  defaultValue: undefined,
  darkMode: false,
}

export default React.memo(SearchEventInput)
