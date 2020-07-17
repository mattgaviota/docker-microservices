import React, { useState, useEffect } from 'react'
import Error from 'next/error'
import Cookies from 'js-cookie'
import Layout from '../components/Layout'
import Table from '../components/Table'
import { handleAuthSSR } from '../lib/auth'
import { getData } from '../services/api'

function OrderPage ({ user }) {
  const [orders, setOrders] = useState([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [count, setCount] = useState(null)

  async function fetchData (params) {
    const token = Cookies.get('auth')
    // const { data: products, metadata: { page, pageSize, count } } = await getData('/node/api/products', params, token)

    // setOrders(products.map(p => ({
    //   id: p.id,
    //   name: p.name,
    //   description: p.description,
    //   amount: p.amount,
    //   price: p.price,
    //   category: p.category.name
    // })))
    // setPage(page)
    // setPageSize(pageSize)
    // setCount(count)
  }

  useEffect(() => {
    fetchData({ page: 1, pageSize: 10 })
  }, [])

  if (!user || user.usertype !== 'buyer') {
    return <Error statusCode={403} />
  }

  return (
    <Layout title='Admin panel'>
      <style jsx>{`
        .filters {
          margin-bottom: 20px;
          width: 50%;
        }
      `}
      </style>
      <div className='ui container'>
        <h2 className='ui header'>Orders</h2>
        {/* <Table
          columns={['ID', 'Name', 'Description', 'Amount', 'Price', 'Category']}
          data={orders}
          page={page}
          pageSize={pageSize}
          count={count}
          onChange={fetchData}
        /> */}
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

export default OrderPage
