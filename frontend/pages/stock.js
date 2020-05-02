import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import Layout from '../components/Layout'
import Profile from '../components/Profile'
import Table from '../components/Table'
import { handleAuthSSR } from '../lib/auth'
import { getData } from '../services/api'

function StockPage () {
  const [products, setProducts] = useState([])
  const [errors, setErrors] = useState([])

  async function fetchData () {
    const token = Cookies.get('auth')
    const { data } = await getData('/node/api/products', {}, token)
    setProducts(data)
    setErrors(errors)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Layout title='Admin panel'>
      <style jsx>{`
        .stock-container {
          display: flex;
          justify-content: space-around;
        }
        .profile, .products {
          padding: 10px;
        }
      `}
      </style>
      <div className='stock-container'>
        <div className='profile'>
          <Profile />
        </div>
        <div className='products'>
          <Table columns={['ID', 'Name', 'Description', 'Amount', 'Price']} data={products} />
        </div>
      </div>
    </Layout>
  )
}

StockPage.getInitialProps = (context) => {
  handleAuthSSR(context)
  return {
    props: {}
  }
}

export default StockPage
