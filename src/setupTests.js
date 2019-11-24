/* eslint-env jest */
/* eslint-disable no-console */
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

// Make console.error a real failure
console.error = message => {
  throw new Error(message)
}

document.execCommand = jest.fn()
