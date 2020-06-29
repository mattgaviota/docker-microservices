import React from 'react'
import Error from 'next/error'
// import Cookies from 'js-cookie'
import Layout from '../components/Layout'
// import Table from '../components/Table'
import { handleAuthSSR } from '../lib/auth'
// import { getData } from '../services/api'

function StockPage ({ user }) {
  if (!user || user.usertype !== 'buyer') {
    return <Error statusCode={403} />
  }

  return (
    <Layout title='Market'>
      <div className='ui container'>
        <h2 className='ui header'>Find your Products</h2>
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
