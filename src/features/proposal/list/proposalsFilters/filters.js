export const filterTypes = {
  sortOrders: ['newest', 'oldest', 'highestRating', 'lowestRating'],
  ratings: ['rated', 'notRated'],
  statuses: ['submitted', 'accepted', 'rejected', 'confirmed', 'declined'],
}

// TODO Add unit tests
export const filterSortOrders = (hideRatings) => {
  return filterTypes.sortOrders.filter((order) => !(/Rating/gm.test(order) && hideRatings))
}

export const sortOrderLabel = (sortOrder) =>
  ({
    newest: 'Newest',
    oldest: 'Oldest',
    highestRating: 'Highest Ratings',
    lowestRating: 'Lowest Ratings',
  }[sortOrder])

export const ratingsLabel = (rating) =>
  ({
    rated: 'Rated',
    notRated: 'Not rated',
  }[rating])

export const statusLabel = (status) =>
  ({
    submitted: 'Not deliberated',
    accepted: 'Accepted',
    rejected: 'Rejected',
    confirmed: 'Confirmed',
    declined: 'Declined',
  }[status])
