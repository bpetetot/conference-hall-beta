import { getAuth } from 'firebase/auth'

const JSON_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

class HttpError extends Error {
  constructor(status, error) {
    super(error?.message ?? 'Http error occured.')
    this.status = status
  }
}

async function fetchResponse({ method = 'GET', url, body, auth, headers = {} }) {
  const allHeaders = { ...JSON_HEADERS, headers }

  if (auth) {
    const token = await getAuth().currentUser.getIdToken()
    allHeaders.authorization = `Bearer ${token}`
  }

  const response = await fetch(url, {
    method,
    headers: allHeaders,
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new HttpError(response.status, error)
  }

  if (response.status === 200) {
    return response
  }
  return null
}

export async function fetchData(args) {
  const response = await fetchResponse(args)
  return response?.json()
}

export async function fetchBlob(args) {
  const response = await fetchResponse(args)
  return response?.blob()
}
