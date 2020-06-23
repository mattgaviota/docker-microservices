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
        .main-container form {
          width: 360px;
        }
        .main-container select {
          height: 53px !important;
        }
      `}
      </style>
      <form className='ui huge form error' onSubmit={handleSubmit}>
        <div className='ui center aligned fluid container'>
          <h1 className='ui header'>Register</h1>
        </div>
        <div className={errors.length ? 'field error' : 'field'}>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            id='name'
            placeholder='Full Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={errors.length ? 'field error' : 'field'}>
          <label htmlFor='email'>Email</label>
          <input
            type='text'
            id='email'
            placeholder='Your Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='field'>
          <label htmlFor='usertype'>Rol</label>
          <select
            className='ui search dropdown'
            required
            defaultValue=''
            id='usertype'
            onChange={(e) => setUsertype(e.target.value)}>
            <option value='' disabled hidden>Select...</option>
            <option value='seller'>Seller</option>
            <option value='buyer'>Buyer</option>
          </select>
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
        <div className={errors.length ? 'field error' : 'field'}>
          <label htmlFor='confirmed-password'>Confirm password</label>
          <input
            type='password'
            id='confirmed-password'
            placeholder='Confirm Password'
            value={confirmedPassword}
            onChange={(e) => setConfirmedPassword(e.target.value)}
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
          Register
        </button>
      </form>
    </div>
  )
}

export default RegisterPage
