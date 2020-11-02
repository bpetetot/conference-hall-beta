class Rating {
  constructor(data = {}) {
    this.uid = data.uid
    this.feeling = data.feeling
    this.rating = data.rating
    this.updateTimestamp = data.updateTimestamp
  }
}

export const ratingConverter = {
  toFirestore(rating) {
    return { ...rating }
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options)
    return new Rating(data)
  },
}

export default Rating
