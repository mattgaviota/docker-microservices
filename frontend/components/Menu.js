import Router from 'next/router'
import Cookies from 'js-cookie'

export default function Menu ({ data }) {
  const logout = async () => {
    Cookies.remove('auth')
    Cookies.remove('user')
    await Router.push('/')
  }

  const options = data && data.usertype === 'seller' ? [
    {
      text: 'Products',
      route: '/stock'
    },
    {
      text: 'Categories',
      route: '/categories'
    }
  ] : [
    {
      text: 'Find Products',
      route: '/market'
    },
    {
      text: 'Orders',
      route: '/orders'
    }
  ]

  return (
    <div className='ui vertical menu'>
      {options.map((item, i) => <a key={i} className='item' onClick={() => Router.push(item.route)}>{item.text}</a>)}
      <a className='item' onClick={logout}>Logout</a>
    </div>
  )
}
