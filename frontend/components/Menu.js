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
      route: '/stock',
      icon: 'product hunt icon'
    },
    {
      text: 'Categories',
      route: '/categories',
      icon: 'sitemap icon'
    }
  ] : [
    {
      text: 'Market',
      route: '/market',
      icon: 'warehouse icon'
    },
    {
      text: 'Cart',
      route: '/cart',
      icon: 'cart icon'
    },
    {
      text: 'Orders',
      route: '/orders',
      icon: 'clipboard outline icon'
    }
  ]

  return (
    <div className='ui vertical menu'>
      {options.map((item, i) => <a key={i} className='item' onClick={() => Router.push(item.route)}>{item.text}<i className={item.icon} /></a>)}
      <a className='item' onClick={logout}>Logout<i className='sign-out icon' /></a>
    </div>
  )
}
