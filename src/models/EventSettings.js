class EventSettings {
  constructor(data) {
    this.id = data.id
    this.api = data.api
    this.deliberation = data.deliberation
    this.notifications = data.notifications
    this.slack = data.slack
  }
}

export const eventSettingsConverter = {
  toFirestore(eventSettings) {
    return { ...eventSettings }
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options)
    return new EventSettings({
      id: snapshot.id,
      ...data,
    })
  },
}

export default EventSettings
