/* eslint-disable react/jsx-filename-extension */
import React, { useState, useContext, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'

const SelectionContext = React.createContext()

export const useSelection = () => useContext(SelectionContext)

// TODO Add Unit Tests, useReducer ?
export const SelectionProvider = ({ total, children }) => {
  const [allSelected, setAllSelected] = useState(false)
  const [items, setItems] = useState([])

  const resetSelection = useCallback(() => {
    setAllSelected(false)
    setItems([])
  }, [])

  const toggleAll = useCallback(() => {
    setAllSelected(!allSelected)
    setItems([])
  }, [allSelected])

  const toggleItem = useCallback(
    (item) => {
      const hasItem = items.includes(item)
      if ((allSelected && hasItem) || hasItem) {
        setItems(items.filter((i) => i !== item))
      } else {
        setItems([...items, item])
      }
    },
    [allSelected, items],
  )

  const isItemSelected = useCallback(
    (item) => {
      if (allSelected) return !items.includes(item)
      return items.includes(item)
    },
    [allSelected, items],
  )

  const value = useMemo(() => {
    const selectionCount = allSelected ? total - items.length : items.length
    const actions = { toggleAll, toggleItem, isItemSelected, resetSelection }
    if (allSelected) {
      return { allSelected: true, selectionCount, exceptItems: items, ...actions }
    }
    return { allSelected: false, selectionCount, selectedItems: items, ...actions }
  }, [allSelected, items, total, toggleAll, toggleItem, isItemSelected, resetSelection])

  return <SelectionContext.Provider value={value}>{children}</SelectionContext.Provider>
}

SelectionProvider.propTypes = {
  total: PropTypes.number,
  children: PropTypes.any.isRequired,
}

SelectionProvider.defaultProps = {
  total: 0,
}
