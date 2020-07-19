import React, { useState, useEffect } from 'react'
import Error from 'next/error'
import Router from 'next/router'
import Cookies from 'js-cookie'
import Layout from '../../components/Layout'
import Select from '../../components/Select'
import { handleAuthSSR } from '../../lib/auth'
import { getData } from '../../services/api'

function AddStockPage ({ user }) {
  async function fetchData (params) {
    const token = Cookies.get('auth')
    // const { data: products, metadata: { page, pageSize, count } } = await getData('/node/api/products', params, token)
  }

  useEffect(() => {
    fetchData({})
  }, [])

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
      <div className='header-wrapper'>
        <h2 className='ui header'>Add a new Product</h2>
        <button className='ui labeled icon button' onClick={() => Router.push('/stock')}>
          <i className='angle left icon' />
          Go Back
        </button>
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
