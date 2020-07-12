import React, { useState, useEffect } from 'react'
import Error from 'next/error'
import Layout from '../components/Layout'
import { handleAuthSSR } from '../lib/auth'

function CartPage ({ user }) {
  if (!user || user.usertype !== 'buyer') {
    return <Error statusCode={403} />
  }

  return (
    <Layout title='Cart'>
      <div classNameName='ui container'>
        <h2 classNameName='ui header'>Cart</h2>
        <div className='ui cards'>
          <div className='card'>
            <div className='content'>
              <div className='header'>Elliot Fu</div>
              <div className='meta'>Seller</div>
              <div className='description'>
                <table className='ui table'>
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Item name</td>
                      <td>Quantity</td>
                    </tr>
                    <tr>
                      <td>Quantity</td>
                      <td>Quantity</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className='ui bottom attached button'>
              <i className='add icon' />
              Create Order
            </div>
          </div>
        </div>
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

export default CartPage
