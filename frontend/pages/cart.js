import React, { useState, useEffect } from 'react'
import Error from 'next/error'
import Layout from '../components/Layout'
import { handleAuthSSR } from '../lib/auth'
import { getCart } from '../lib/cart'

function CartPage ({ user }) {
  const [groups, setGroups] = useState({})

  useEffect(() => {
    const cart = getCart()
    const groups = cart.reduce((r, i) => {
      r[i.seller] = [...r[i.seller] || [], i]
      return r
    }, {})
    setGroups(groups)
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
                        <th>Category</th>
                      </tr>
                    </thead>
                    <tbody>
                      {groups[group].map(item => (
                        <tr key={item.id}>
                          <td>{item.name}</td>
                          <td>{item.quantity}</td>
                          <td>{item.category}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className='ui bottom attached button'>
                <i className='add icon' />
                Create Order
              </div>
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
