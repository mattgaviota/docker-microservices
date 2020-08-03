import React, { useState, useEffect } from 'react'
import Error from 'next/error'
import Router from 'next/router'
import Cookies from 'js-cookie'
import Layout from '../../components/Layout'
import Select from '../../components/Select'
import { handleAuthSSR } from '../../lib/auth'
import { getData, postData } from '../../services/api'

function AddStockPage ({ user }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [price, setPrice] = useState('')
  const [categoryId, setCategoryId] = useState(null)
  const [categories, setCategories] = useState([])
  const [errors, setErrors] = useState([])

  async function fetchData (params) {
    const token = Cookies.get('auth')
    const { data: categories } = await getData('/node/api/categories', {}, token)
    setCategories(categories)
  }

  useEffect(() => {
    fetchData({})
  }, [])

  async function handleSubmit (e) {
    e.preventDefault()
    const token = Cookies.get('auth')
    const { errors } = await postData('/node/api/products', {
      name,
      description,
      categoryId,
      amount,
      price
    }, token)
    if (errors.length > 0) {
      setErrors(errors)
    } else {
      Router.push('/stock')
    }
  }

  if (!user || user.usertype !== 'seller') {
    return <Error statusCode={403} />
  }

  return (
    <Layout title='Categories'>
      <style jsx>{`
        .header-wrapper {
          display: flex;
          justify-content: space-between;
        }
      `}
      </style>
      <div className='ui container'>
        <div className='header-wrapper'>
          <h2 className='ui header'>Add a new Product</h2>
          <button className='ui labeled icon button' onClick={() => Router.push('/stock')}>
            <i className='angle left icon' />
            Go Back
          </button>
        </div>
        <form className='ui form error' onSubmit={handleSubmit}>
          <div className={errors.length ? 'field error' : 'field'}>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              id='name'
              placeholder='Product name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={errors.length ? 'field error' : 'field'}>
            <label htmlFor='description'>Description</label>
            <textarea
              id='description'
              placeholder='Product description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className='field'>
            <label htmlFor='categories'>Category</label>
            <Select
              categories={categories}
              onChange={(e) => setCategoryId(e.target.value)}
            />
          </div>
          <div className={errors.length ? 'field error' : 'field'}>
            <label htmlFor='amount'>Amount</label>
            <input
              type='number'
              id='amount'
              placeholder='Amount to stock'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className={errors.length ? 'field error' : 'field'}>
            <label htmlFor='price'>Price</label>
            <input
              type='number'
              id='price'
              placeholder='Unit Price'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
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
            Save
          </button>
        </form>
      </div>
    </Layout>
  )
}

export async function getServerSideProps (context) {
  const user = await handleAuthSSR(context)
  return {
    props: { user }
  }
}

export default AddStockPage
