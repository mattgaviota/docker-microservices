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
        .signup {
          cursor: pointer;
        }
      `}
      </style>
      <form className='ui huge form error' onSubmit={handleSubmit}>
        <div className='ui center aligned fluid container'>
          <h1 className='ui header'>Sign In</h1>
        </div>
        <div className={errors.length ? 'field error' : 'field'}>
          <label htmlFor='email'>Email</label>
          <input
            type='text'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={errors.length ? 'field error' : 'field'}>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errors.length > 0 && (
          <div className='ui error message'>
            {errors.map((e, i) => (
              <p key={i}>
                {e}
              </p>
            ))}
          </div>
        )}
        <button type='submit' className='ui big primary button'>
          Login
        </button>
        <p>Have not an account yet? <span className='ui small orange header signup' onClick={() => Router.push('/register')}>Sign up</span></p>
      </form>
    </div>
  )
}

export default LoginPage
