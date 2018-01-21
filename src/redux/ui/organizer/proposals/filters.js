import { simpleObject } from 'k-redux-factory'

const defaultData = {
  categories: '',
  formats: '',
  sorting: '',
}

export default simpleObject({
  path: 'ui.organizer.proposals',
  name: 'filters',
  prefix: 'proposals',
  defaultData,
})
