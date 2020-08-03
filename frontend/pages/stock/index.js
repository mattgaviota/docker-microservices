import React, { useState, useEffect } from 'react'
import Error from 'next/error'
import Router from 'next/router'
import Cookies from 'js-cookie'
import Layout from '../../components/Layout'
import Table from '../../components/Table'
import Select from '../../components/Select'
import { handleAuthSSR } from '../../lib/auth'
import { getData } from '../../services/api'

function StockPage ({ user }) {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [count, setCount] = useState(null)
  const [filters, setFilters] = useState({})

  async function fetchData (params) {
    const token = Cookies.get('auth')
    const { data: products, metadata: { page, pageSize, count } } = await getData('/node/api/products', params, token)
    const { data: categories } = await getData('/node/api/categories', {}, token)

    setProducts(products.map(p => ({
      id: p.id,
      name: p.name,
      description: p.description,
      amount: p.amount,
      price: p.price,
      category: p.category.name
    })))
    setCategories(categories)
    setPage(page)
    setPageSize(pageSize)
    setCount(count)
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

  if (!user || user.usertype !== 'seller') {
    return <Error statusCode={403} />
  }

  return (
    <Layout title='Admin panel'>
      <style jsx>{`
        .filters {
          margin-bottom: 20px;
          width: 50%;
        }
        .header-wrapper {
          display: flex;
          justify-content: space-between;
        }
      `}
      </style>
      <div className='ui container'>
        <div className='header-wrapper'>
          <h2 className='ui header'>Products</h2>
          <button className='ui teal labeled icon button' onClick={() => Router.push('/stock/add')}>
            <i className='plus icon' />
            New Product
          </button>
        </div>
        <div className='ui form filters'>
          <h3 className='ui header'>Filters</h3>
          <Select
            categories={categories}
            onChange={handleOnChange}
          />
        </div>
        <Table
          columns={['ID', 'Name', 'Description', 'Amount', 'Price', 'Category']}
          data={products}
          page={page}
          pageSize={pageSize}
          count={count}
          onChange={fetchData}
        />
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

export default StockPage
