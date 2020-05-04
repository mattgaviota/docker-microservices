import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import Layout from '../components/Layout'
import Profile from '../components/Profile'
import Table from '../components/Table'
import { handleAuthSSR } from '../lib/auth'
import { getData } from '../services/api'

function StockPage () {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [errors, setErrors] = useState([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [count, setCount] = useState(null)
  const [user, setUser] = useState(null)
  const [filters, setFilters] = useState({})

  async function fetchData (params) {
    const token = Cookies.get('auth')
    const { data: products, metadata: { page, pageSize, count } } = await getData('/node/api/products', params, token)
    const { data: categories } = await getData('/node/api/categories', {}, token)
    const { data: user, errors } = await getData('/php/api/validate', {}, token)

    setProducts(products)
    setCategories(categories)
    setPage(page)
    setPageSize(pageSize)
    setCount(count)
    setUser(user)
    setErrors(errors)
  }

  function handleOnChange (e) {
    const categorySelected = e.target.value

    setFilters({
      category: categorySelected
    })
  }

  useEffect(() => {
    fetchData({ page: 1, pageSize: 10, ...filters })
  }, [filters])

  return (
    <Layout title='Admin panel'>
      <style jsx>{`
        .stock-container {
          display: flex;
          justify-content: space-around;
        }
        .profile, .products {
          margin: 0 10px;
        }
        .filters {
          margin-bottom: 20px;
        }
      `}
      </style>
      <div className='stock-container'>
        <div className='profile'>
          {user && <Profile data={user} />}
        </div>
        <div className='nes-container with-title products'>
          <p className='title'>Products</p>
          <div className='nes-container with-title filters'>
            <p className='title'>Filters</p>
            <div className='nes-select'>
              <select id='categories' defaultValue='0' onChange={handleOnChange}>
                <option value='0' disabled hidden>Select...</option>
                <option value=''>All</option>
                {categories.map(c => <option value={c.name} key={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>
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
