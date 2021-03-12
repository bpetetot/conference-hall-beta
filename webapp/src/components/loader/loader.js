import loader from 'hoc-react-loader/build/core'

import LoadingIndicator from './loading'

export default loader({ print: ['loaded'], LoadingIndicator, delay: 200 })
