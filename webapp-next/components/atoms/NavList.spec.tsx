import { render, screen } from '@testing-library/react'
import { useRouter } from 'next/router'

import { getByAriaCurrent } from '../../tests/utils'
import NavList from './NavList'

describe('NavList component', () => {
  test('should render navlist with links', () => {
    mockRouter.mockReturnValue({})
    render(
      <NavList>
        <NavList.Link href="#link1">Link 1</NavList.Link>
        <NavList.Link href="#link2">Link 2</NavList.Link>
      </NavList>,
    )

    expect(screen.getByText('Link 1')).toBeVisible()
    expect(screen.getByText('Link 2')).toBeVisible()
  })

  test('should render navlist with defaultSelected', () => {
    mockRouter.mockReturnValue({ asPath: '/route' })
    const { container } = render(
      <NavList>
        <NavList.Link href="#link1" defaultSelected>
          Link 1
        </NavList.Link>
        <NavList.Link href="#link2">Link 2</NavList.Link>
      </NavList>,
    )
    const selected = getByAriaCurrent(container, true)
    const notSelected = getByAriaCurrent(container, false)

    expect(selected).toHaveTextContent('Link 1')
    expect(notSelected).toHaveTextContent('Link 2')
  })

  test('should render navlist for current route', () => {
    mockRouter.mockReturnValue({ asPath: '/route#link2' })
    const { container } = render(
      <NavList>
        <NavList.Link href="#link1">Link 1</NavList.Link>
        <NavList.Link href="#link2">Link 2</NavList.Link>
      </NavList>,
    )
    const selected = getByAriaCurrent(container, true)
    const notSelected = getByAriaCurrent(container, false)

    expect(selected).toHaveTextContent('Link 2')
    expect(notSelected).toHaveTextContent('Link 1')
  })
})

// Mocks
const mockRouter = useRouter as jest.Mock
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))
