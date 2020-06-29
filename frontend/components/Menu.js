import Router from 'next/router'
import Cookies from 'js-cookie'

export default function Menu () {
  const logout = async () => {
    Cookies.remove('auth')
    Cookies.remove('user')
    await Router.push('/')
  }

  return (
    <div className='ui vertical menu'>
      <a type='button' className='item' onClick={() => Router.push('/stock')}>Products</a>
      <a type='button' className='item' onClick={() => Router.push('/categories')}>Categories</a>
      <a type='button' className='item' onClick={logout}>Logout</a>
    </div>
  )
}
