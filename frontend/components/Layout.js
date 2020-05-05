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
    <div className='container'>
      <style jsx>{`
        .container {
          padding: 20px;
        }
        .main-content {
          display: grid;
          grid-template-columns: 400px 1fr;
          grid-template-areas:
          "sidebar content";
          column-gap: 20px;
        }
        .menu {
          margin-top: 20px;
        }
      `}
      </style>
      <div className='nes-container with-title'>
        <Head>
          <title>{title}</title>
        </Head>
        <p className='title'>{title}</p>
        <div className='main-content'>
          <div className='sidebar'>
            {user && <Profile data={user} />}
            <div className='menu'>
              <Menu />
            </div>
          </div>
          <div className='content'>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
