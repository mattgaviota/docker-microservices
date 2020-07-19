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
        price: d.price,
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

  return (
    <Layout title='Admin panel'>
      <style jsx>{`
        .filters {
          margin-bottom: 20px;
          width: 50%;
        }
        .order {
          margin-bottom: 20px;
        }
      `}
      </style>
      <div className='ui container'>
        <h2 className='ui header'>Orders</h2>
        {orders.map(o => (
          <div className='order' key={o.id}>
            <Table
              header={`Order #${o.id} to Seller: ${o.name}, Date: ${o.date}`}
              columns={['ID', 'Name', 'Description', 'Amount', 'Price', 'Total']}
              data={o.details}
              page={1}
              pageSize={10}
              count={o.details.length}
              onChange={() => {}}
            />
          </div>
        ))}
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
