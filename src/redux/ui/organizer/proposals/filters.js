import { simpleObject } from 'k-ramel'

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
