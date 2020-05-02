const API_URL = 'http://localhost'

export async function getData (path, params = {}, token = '') {
  const queryString = Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    .join('&')

  const url = queryString ? `${API_URL}${path}?${queryString}` : `${API_URL}${path}`
  const headers = {
    'Content-Type': 'application/json'
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  const resp = await window.fetch(url, { headers })

  const json = await resp.json()
  return json
}

export async function postData (path, payload, token = '') {
  const url = `${API_URL}${path}`
  const headers = {
    'Content-Type': 'application/json'
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  const resp = await window.fetch(url, { method: 'POST', body: JSON.stringify(payload), headers })

  const json = await resp.json()
  return json
}
