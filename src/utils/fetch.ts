import fetch, {RequestInfo, RequestInit} from 'node-fetch'

interface Response {
  header: Record<string, string[]>
  status: number
  body: any
}

const apiHandler = async (
  url: RequestInfo,
  init: RequestInit
): Promise<Response> => {
  const response = await fetch(url, init)

  const body = await response.text()

  const apiHandlerResponse = {
    header: response.headers.raw(),
    status: response.status,
    body
  }

  const isJSON = (response.headers.get('Content-Type') || '').includes(
    'application/json'
  )

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  if (isJSON && body) {
    apiHandlerResponse.body = JSON.parse(body)
  }

  return apiHandlerResponse
}

export default apiHandler
