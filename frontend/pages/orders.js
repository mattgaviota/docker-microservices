import React, { useState, useEffect } from 'react'
import Error from 'next/error'
import Cookies from 'js-cookie'
import Layout from '../components/Layout'
import Table from '../components/Table'
import { handleAuthSSR } from '../lib/auth'
import { getData } from '../services/api'

function OrderPage ({ user }) {
  const [orders, setOrders] = useState([])

  async function fetchData (params) {
    const token = Cookies.get('auth')
    const { data: orders } = await getData('/python/api/orders', params, token)

    setOrders(orders.map(o => ({
      id: o.id,
      name: o.seller.name,
      email: o.seller.email,
      date: o.date,
      total: o.total,
      details: o.details.map(d => ({
        id: d.id,
        name: d.product.name,
        description: d.product.description,
        amount: d.amount,
        total: d.total
      }))
    })))
  }

  useEffect(() => {
    fetchData({})
  }, [])

  if (!user || user.usertype !== 'buyer') {
    return <Error statusCode={403} />
  }

  console.log('orders', orders)
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
