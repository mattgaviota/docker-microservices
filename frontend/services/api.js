const API_URL = 'http://localhost';

export async function getData (path, params = {}) {
  const queryString = Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    .join('&');

  const url = queryString ? `${API_URL}${path}?${queryString}` : `${API_URL}${path}`;
  const headers = {
    'Content-Type': 'application/json',
  };
  const jwt = localStorage.getItem('jwt');
  if (jwt) {
    headers.Authorization = `Bearer ${jwt}`;
  }
  const resp = await fetch(url, { headers });

  if (resp.ok) {
    const json = await resp.json();

    return json;
  }
  throw Error(`Request rejected with status ${resp.status}`);
}

export async function postData (path, payload) {
  const url = `${API_URL}${path}`;
  const headers = {
    'Content-Type': 'application/json',
  };
  const jwt = localStorage.getItem('jwt');
  if (jwt) {
    headers.Authorization = `Bearer ${jwt}`;
  }
  const resp = await fetch(url, { method: 'POST', body: JSON.stringify(payload), headers });

  const json = await resp.json();
  
  return json;
}
