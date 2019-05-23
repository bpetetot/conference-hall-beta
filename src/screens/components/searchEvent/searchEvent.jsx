import React from 'react'

import InputButton from 'components/form/inputButton'

import styles from './searchEvent.module.css'

const SearchEventInput = props => (
  <InputButton
    type="text"
    className={styles.search}
    btnClassName={styles.searchButton}
    placeholder="Search for events and meetups"
    btnLabel={<i className="fa fa-search" />}
    {...props}
  />
)

export default React.memo(SearchEventInput)
