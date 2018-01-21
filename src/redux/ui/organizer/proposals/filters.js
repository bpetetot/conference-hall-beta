import { simpleObject } from 'k-redux-factory'

const defaultData = {
  categories: '',
  formats: '',
  sorting: 'newest',
}

export default simpleObject({
  path: 'ui.organizer.proposals',
  name: 'filters',
  prefix: 'proposals',
  defaultData,
})
