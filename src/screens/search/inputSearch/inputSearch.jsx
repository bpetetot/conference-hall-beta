import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import Button from 'components/button'

import { ReactComponent as AlgoliaLightLogo } from 'styles/icons/algolia-white.svg'
import styles from './inputSearch.module.css'

const SearchEventInput = ({ defaultValue, onSearch, className, darkMode, withAlgoliaLogo }) => {
  const inputRef = useRef()

  const handleSearch = () => {
    onSearch(inputRef.current.value)
  }

  const handleKeyPress = e => {
    if (e.charCode === 13) handleSearch()
  }

  return (
    <>
      <div className={cn(styles.searchInput, className, { [styles.dark]: darkMode })}>
        <input
          ref={inputRef}
          type="text"
          defaultValue={defaultValue}
          placeholder="Search for conferences and meetups"
          onKeyPress={handleKeyPress}
          className={styles.input}
        />
        <Button onClick={handleSearch} className={styles.button}>
          <i className="fa fa-search" />
        </Button>
      </div>
      {withAlgoliaLogo && <AlgoliaLightLogo className={styles.algoliaLogo} />}
    </>
  )
}

SearchEventInput.propTypes = {
  onSearch: PropTypes.func.isRequired,
  defaultValue: PropTypes.string,
  className: PropTypes.string,
  darkMode: PropTypes.bool,
  withAlgoliaLogo: PropTypes.bool,
}

SearchEventInput.defaultProps = {
  defaultValue: undefined,
  className: undefined,
  darkMode: false,
  withAlgoliaLogo: false,
}

export default React.memo(SearchEventInput)
