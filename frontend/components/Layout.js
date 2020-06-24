import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import Head from 'next/head'
import Profile from './Profile'
import Menu from './Menu'
import { getData } from '../services/api'

export default function Layout ({ children, title }) {
  const [errors, setErrors] = useState([])
  const [user, setUser] = useState(null)

  async function fetchData () {
    const token = Cookies.get('auth')

    const { data: user, errors } = await getData('/php/api/validate', {}, token)
    setUser(user)
    setErrors(errors)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className='ui two column grid container'>
      <style jsx>{`
        .container {
          padding: 20px;
        }
        .menu {
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
        <div className='menu'>
          <Menu />
        </div>
      </div>
      <div className='twelve wide column'>
        {children}
      </div>
    </div>
  )
}
