import firebase from 'firebase/app'

const DEFAULT_HEADERS: Headers = new Headers({
  Accept: 'application/json',
  'Content-Type': 'application/json',
})

export class HttpError extends Error {
  status: number
  constructor(status: number, error: { message: string }) {
    super(error?.message ?? 'Http error occured.')
    this.status = status
  }
}

type RequestData = {
  url: string
  method?: string
  body?: unknown
  auth?: boolean
  headers?: Headers
}

async function fetchResponse(request: RequestData) {
  const { method = 'GET', url, body, auth = false } = request

  const headers = new Headers({ ...DEFAULT_HEADERS, ...(request.headers || {}) })

  if (auth) {
    const token = await firebase.auth()?.currentUser?.getIdToken()
    headers.set('authorization', `Bearer ${token}`)
  }

  const response = await fetch(url, {
    method,
    headers,
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

export async function fetchData(args: RequestData) {
  const response = await fetchResponse(args)
  return response?.json()
}

export async function fetchBlob(args: RequestData) {
  const response = await fetchResponse(args)
  return response?.blob()
}
