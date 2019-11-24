/* eslint-disable import/prefer-default-export */
import withReactSize from 'react-sizes'

/**
 * inject isMobile, isTablet and isDesktop props to the
 * decorated component
 */
export const withSizes = Component =>
  withReactSize(sizes => ({
    isMobile: withReactSize.isMobile(sizes),
    isTablet: withReactSize.isTablet(sizes),
    isDesktop: withReactSize.isDesktop(sizes),
  }))(Component)
