import { simpleObject } from 'k-redux-factory'

export default simpleObject({
  name: 'app',
  path: 'ui.speaker',
  prefix: 'speaker',
  defaultData: {
    currentEventId: undefined,
  },
})
