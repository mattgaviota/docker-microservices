import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import Head from 'next/head'
import Profile from './Profile'
import Menu from './Menu'

export default function Layout ({ children, title }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const user = Cookies.get('user')
    setUser(JSON.parse(user))
  }, [])

  return (
    <div className='ui two column grid container'>
      <style jsx>{`
        .container {
          padding: 20px;
        }
        .menu-container {
          margin-top: 20px;
        }
      `}
      </style>
      <Head>
        <title>{title}</title>
      </Head>
      <div className='four wide column'>
        <h1 className='ui header'>{title}</h1>
        {user && <Profile data={user} />}
        <div className='menu-container'>
          <Menu data={user} />
        </div>
      </div>
      <div className='twelve wide column'>
        {children}
      </div>
    </div>
  )
}
