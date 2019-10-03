/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react'
import Proptypes from 'prop-types'

const ProposalsField = ({ proposals, input: { value: selectedProposals, onChange } }) => {
  const updateSelectedProposals = id => () => {
    const updatedSelectedProposals = [...selectedProposals]

    if (selectedProposals.includes(id)) {
      const index = proposals.findIndex(proposal => proposal.id === id)
      updatedSelectedProposals.splice(index, 1)
    } else {
      updatedSelectedProposals.push(id)
    }

    onChange(updatedSelectedProposals)
  }

  return (
    <ul>
      {proposals.map(proposal => (
        <li onClick={updateSelectedProposals(proposal.id)}>
          {proposal.title} {selectedProposals.includes(proposal.id) && <span> - Added</span>}
        </li>
      ))}
    </ul>
  )
}

ProposalsField.propTypes = {
  proposals: Proptypes.array,
  input: Proptypes.object.isRequired,
}

ProposalsField.defaultProps = {
  proposals: [],
}

export default ProposalsField
