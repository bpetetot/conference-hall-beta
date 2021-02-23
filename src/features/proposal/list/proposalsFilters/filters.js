export const filterTypes = {
  sortOrders: ['newest', 'oldest', 'highestRating', 'lowestRating'],
  ratings: ['rated', 'not-rated'],
  statuses: ['SUBMITTED', 'ACCEPTED', 'REJECTED', 'CONFIRMED', 'DECLINED'],
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
    'not-rated': 'Not rated',
  }[rating])

export const statusLabel = (status) =>
  ({
    SUBMITTED: 'Not deliberated',
    ACCEPTED: 'Accepted',
    REJECTED: 'Rejected',
    CONFIRMED: 'Confirmed',
    DECLINED: 'Declined',
  }[status])
