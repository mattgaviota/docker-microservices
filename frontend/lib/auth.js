import ServerCookies from 'next-cookies'
import jwtDecode from 'jwt-decode'
import { redirect } from '../lib/redirect'

export function handleAuthSSR (context) {
  const token = ServerCookies(context).auth

  if (!token) {
    redirect(context, '/')
    return
  }

  try {
    const decoded = jwtDecode(token)
    // If  Token expired redirect to login
    if (new Date() > new Date(decoded.exp * 1000)) {
      redirect(context, '/')
      return
    }
  } catch (err) {
    redirect(context, '/')
    return
  }

  return token
}
