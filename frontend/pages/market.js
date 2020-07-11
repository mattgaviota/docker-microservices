import React, { useState, useEffect } from 'react'
import Error from 'next/error'
import Cookies from 'js-cookie'
import Layout from '../components/Layout'
import Table from '../components/Table'
import Select from '../components/Select'
import Modal from '../components/Modal'
import { handleAuthSSR } from '../lib/auth'
import { addItem, getCart } from '../lib/cart'
import { getData } from '../services/api'

function MarketPage ({ user }) {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [count, setCount] = useState(null)
  const [filters, setFilters] = useState({})
  const [searchInput, setSearchInput] = useState('')
  const [displayModal, setDisplayModal] = useState(false)
  const [message, setMessage] = useState('')
  const [cart, setCart] = useState([])

  async function fetchData (params) {
    const token = Cookies.get('auth')
    const { data: products, metadata: { page, pageSize, count } } = await getData('/node/api/products', params, token)
    const { data: categories } = await getData('/node/api/categories', {}, token)

    setProducts(products.map(p => ({
      id: p.id,
      name: p.name,
      description: p.description,
      seller: p.user.name,
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
      ...filters,
      category: categorySelected
    })
  }

  function handleOnClickSearch () {
    setFilters({
      ...filters,
      name: searchInput
    })
  }

  useEffect(() => {
    fetchData({ page, pageSize, ...filters })
  }, [filters])

  useEffect(() => {
    const cart = getCart()
    setCart(cart)
  }, [])

  if (!user || user.usertype !== 'buyer') {
    return <Error statusCode={403} />
  }

  const actions = [
    {
      name: 'order',
      icon: 'cart icon',
      onClick: function (product, quantity) {
        if (parseInt(quantity) > 0 && parseInt(quantity) <= parseInt(product.amount)) {
          const newItem = {
            id: product.id,
            name: product.name,
            quantity
          }
          const cartUpdated = addItem(newItem)
          setCart([...cartUpdated])
        } else {
          setMessage(`Invalid ${product.amount} or no items in stock, try less than ${quantity}`)
          setDisplayModal(true)
        }
      }
    }
  ]

  return (
    <Layout title='Market'>
      <style jsx>{`
        .filters {
          margin-bottom: 20px;
          width: 50%;
        }
      `}
      </style>
      <div className='ui container'>
        <h2 className='ui header'>Find your Products</h2>
        <button className='ui teal labeled icon button'>
          <i className='cart icon' />
          {cart.length} items
        </button>
        <div className='ui form filters'>
          <h3 className='ui header'>Filters</h3>
          <div className='ui action fluid input field'>
            <input
              type='text'
              placeholder='Search by product name...'
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button className='ui button' onClick={handleOnClickSearch}>Search</button>
          </div>

          <Select
            categories={categories}
            onChange={handleOnChange}
          />
        </div>
        {displayModal && <Modal message={message} handleDisplay={setDisplayModal} />}
        <Table
          columns={['ID', 'Name', 'Description', 'Seller', 'Price', 'Category']}
          data={products}
          page={page}
          pageSize={pageSize}
          count={count}
          onChange={fetchData}
          actions={actions}
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

export default MarketPage
