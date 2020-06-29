import Router from 'next/router'
import Cookies from 'js-cookie'
import React, { useState } from 'react'
import { postData, getData } from '../services/api'

function LoginPage (props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])

  async function handleSubmit (e) {
    e.preventDefault()
    const { data: token, errors: errorsAtLogin } = await postData('/php/api/login', {
      email,
      password
    })
    if (errorsAtLogin.length > 0) {
      setErrors(errorsAtLogin)
      return
    }

    const { data: user, errors: errorsAtValidate } = await getData('/php/api/validate', {}, token)
    if (errorsAtValidate.length > 0) {
      setErrors(errorsAtValidate)
      return
    }

    Cookies.set('auth', token)
    Cookies.set('user', user)
    const jumpTo = user.usertype === 'seller' ? '/stock' : '/market'
    Router.push(jumpTo)
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
        .main-container form {
          width: 360px;
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
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={errors.length ? 'field error' : 'field'}>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            placeholder='Password'
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
