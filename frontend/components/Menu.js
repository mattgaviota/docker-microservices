import Router from 'next/router'
import Cookies from 'js-cookie'

export default function Menu () {
  const logout = async () => {
    Cookies.remove('auth')
    await Router.push('/')
  }

  return (
    <div className='nes-container with-title is-centered'>
      <p className='title'>Menu</p>
      <div>
        <button type='button' className='nes-btn' onClick={() => Router.push('/stock')}>Products</button>
      </div>
      <div>
        <button type='button' className='nes-btn' onClick={() => Router.push('/categories')}>Categories</button>
      </div>
      <div>
        <button type='button' className='nes-btn' onClick={logout}>Logout</button>
      </div>
    </div>
  )
}
