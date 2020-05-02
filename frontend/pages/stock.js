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
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [count, setCount] = useState(null)
  const [user, setUser] = useState(null)

  async function fetchData (params) {
    const token = Cookies.get('auth')
    const { data, metadata: { page, pageSize, count } } = await getData('/node/api/products', params, token)
    const { data: user, errors } = await getData('/php/api/validate', {}, token)
    console.log('user', user)
    setProducts(data)
    setPage(page)
    setPageSize(pageSize)
    setCount(count)
    setUser(user)
    setErrors(errors)
  }

  useEffect(() => {
    fetchData({ page: 1, pageSize: 10 })
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
          {user && <Profile data={user} />}
        </div>
        <div className='products'>
          <Table
            columns={['ID', 'Name', 'Description', 'Amount', 'Price']}
            data={products}
            page={page}
            pageSize={pageSize}
            count={count}
            onChange={fetchData}
          />
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
