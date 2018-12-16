import isEmpty from 'lodash/isEmpty'

// redirect to a route with next url
export const redirectWithNextUrl = (route, router) => {
  const nextParams = { redirect: router.getCurrentCode() }

  if (!isEmpty(router.getPathParams())) {
    nextParams.params = JSON.stringify(router.getPathParams())
  }
  if (!isEmpty(router.getQueryParams())) {
    nextParams.query = JSON.stringify(router.getQueryParams())
  }

  return router.replace(route, null, nextParams)
}

// go to the redirect url if exists
export const redirectToNextUrl = (router) => {
  if (!router.isFound()) return

  const redirect = router.getParam('redirect')
  if (redirect) {
    const params = router.getParam('params') ? JSON.parse(router.getParam('params')) : undefined
    const query = router.getParam('query') ? JSON.parse(router.getParam('query')) : undefined
    router.replace(redirect, params, query)
  }
}
