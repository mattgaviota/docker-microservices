import Router from 'next/router'
import Cookies from 'js-cookie'
import React, { useState } from 'react'
import { postData } from '../services/api'

function LoginPage (props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])

  async function handleSubmit (e) {
    e.preventDefault()
    const { data: token, errors } = await postData('/php/api/login', {
      email,
      password
    })
    if (errors.length > 0) {
      setErrors(errors)
    } else {
      Cookies.set('auth', token)
      Router.push('/stock')
    }
  }

  return (
    <div className='main-container'>
      <style jsx>{`
        .main-container {
          display: flex;
          justify-content: center;
          margin-top: 10%;
        }
      `}
      </style>
      <div className='nes-container with-title'>
        <p className='title'>Login</p>
        <form onSubmit={handleSubmit}>
          <div className='nes-field'>
            <label htmlFor='email'>Email</label>
            <input
              type='text'
              id='email'
              className={errors.length ? 'nes-input is-error' : 'nes-input'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='nes-field'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              className={errors.length ? 'nes-input is-error' : 'nes-input'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errors.length > 0 && (
            <div className='nes-field'>
              {errors.map((e, i) => (
                <p className='nes-text is-error' key={i}>
                  {e}
                </p>
              ))}
            </div>
          )}
          <div
            style={{
              padding: '10px 0',
              display: 'flex',
              justifyContent: 'flex-end'
            }}
          >
            <button type='submit' className='nes-btn is-primary'>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
