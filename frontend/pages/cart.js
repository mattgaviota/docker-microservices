import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import Error from 'next/error'
import Layout from '../components/Layout'
import { handleAuthSSR } from '../lib/auth'
import { getCart, removeItems } from '../lib/cart'
import { postData } from '../services/api'

function CartPage ({ user }) {
  const [groups, setGroups] = useState({})

  async function createOrder (group) {
    const token = Cookies.get('auth')
    const payload = {
      seller: group,
      items: groups[group]
    }
    const { status } = await postData('/python/api/orders', payload, token)
    if (status === 'success') {
      removeItems(groups[group].map(item => item.id))
      updateCart()
    }
  }

  function updateCart () {
    const cart = getCart()
    const groups = cart.reduce((r, i) => {
      r[i.seller] = [...r[i.seller] || [], i]
      return r
    }, {})
    setGroups(groups)
  }

  useEffect(() => {
    updateCart()
  }, [])

  if (!user || user.usertype !== 'buyer') {
    return <Error statusCode={403} />
  }

  return (
    <Layout title='Cart'>
      <div className='ui container'>
        <h2 className='ui header'>Create Orders</h2>
        <div className='ui cards'>
          {Object.keys(groups).map(group => (
            <div className='card' key={group}>
              <div className='content'>
                <div className='header'>{group}</div>
                <div className='meta'>Seller</div>
                <div className='description'>
                  <table className='ui table'>
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Category</th>
                      </tr>
                    </thead>
                    <tbody>
                      {groups[group].map(item => (
                        <tr key={item.id}>
                          <td>{item.name}</td>
                          <td>{item.quantity}</td>
                          <td>{item.price}</td>
                          <td>{item.category}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <button
                className='ui bottom attached button'
                onClick={() => createOrder(group)}
              >
                <i className='add icon' />
                Create Order
              </button>
            </div>
          ))}
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
