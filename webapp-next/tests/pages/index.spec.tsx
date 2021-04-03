import { render, screen } from '@testing-library/react'

import App from '../../pages/index'

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Hello Next.js' })).toBeInTheDocument()
  })
})
