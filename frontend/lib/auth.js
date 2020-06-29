import ServerCookies from 'next-cookies'
import jwtDecode from 'jwt-decode'
import { redirect } from '../lib/redirect'

export async function handleAuthSSR (context) {
  const token = ServerCookies(context).auth
  const user = ServerCookies(context).user

  if (!token || !user) {
    redirect(context, '/')
    return null
  }

  try {
    const decoded = jwtDecode(token)
    // If  Token expired redirect to login
    if (new Date() > new Date(decoded.exp * 1000)) {
      redirect(context, '/')
      return null
    }

    return user
  } catch (err) {
    redirect(context, '/')
  }
}
