import Router from 'next/router'
import React, { useState } from 'react'
import { postData } from '../services/api'

function RegisterPage (props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [usertype, setUsertype] = useState('')
  const [password, setPassword] = useState('')
  const [confirmedPassword, setConfirmedPassword] = useState('')
  const [errors, setErrors] = useState([])

  async function handleSubmit (e) {
    e.preventDefault()
    const { errors } = await postData('/php/api/signup', {
      name,
      email,
      usertype,
      password,
      confirmed_password: confirmedPassword
    })
    if (errors.length > 0) {
      setErrors(errors)
    } else {
      Router.push('/')
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
        <p className='title'>Register</p>
        <form onSubmit={handleSubmit}>
          <div className='nes-field'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              id='name'
              className={errors.length ? 'nes-input is-error' : 'nes-input'}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
            <label htmlFor='usertype'>Rol</label>
            <div className='nes-select'>
              <select required defaultValue='' id='usertype' onChange={(e) => setUsertype(e.target.value)}>
                <option value='' disabled hidden>Select...</option>
                <option value='seller'>Seller</option>
                <option value='buyer'>Buyer</option>
              </select>
            </div>
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
          <div className='nes-field'>
            <label htmlFor='confirmed-password'>Confirm password</label>
            <input
              type='password'
              id='confirmed-password'
              className={errors.length ? 'nes-input is-error' : 'nes-input'}
              value={confirmedPassword}
              onChange={(e) => setConfirmedPassword(e.target.value)}
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
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage
