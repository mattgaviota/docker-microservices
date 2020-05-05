import Router from 'next/router'
import Cookies from 'js-cookie'

export default function Menu () {
  const logout = async () => {
    Cookies.remove('auth')
    await Router.push('/')
  }

  return (
    <div className='nes-container with-title is-centered'>
      <style jsx>{`
        .menu-item {
          margin-bottom: 10px;
        }
      `}
      </style>
      <p className='title'>Menu</p>
      <div className='menu-item'>
        <button type='button' className='nes-btn' onClick={() => Router.push('/stock')}>Products</button>
      </div>
      <div className='menu-item'>
        <button type='button' className='nes-btn' onClick={() => Router.push('/categories')}>Categories</button>
      </div>
      <div className='menu-item'>
        <button type='button' className='nes-btn' onClick={logout}>Logout</button>
      </div>
    </div>
  )
}
