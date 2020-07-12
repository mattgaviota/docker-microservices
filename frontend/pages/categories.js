import React, { useState, useEffect } from 'react'
import Error from 'next/error'
import Cookies from 'js-cookie'
import Layout from '../components/Layout'
import Table from '../components/Table'
import { handleAuthSSR } from '../lib/auth'
import { getData } from '../services/api'

function CategoryPage ({ user }) {
  const [categories, setCategories] = useState([])

  async function fetchData () {
    const token = Cookies.get('auth')
    const { data: categories } = await getData('/node/api/categories', {}, token)

    setCategories(categories)
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (!user || user.usertype !== 'seller') {
    return <Error statusCode={403} />
  }

  return (
    <Layout title='Categories'>
      <h2 className='ui header'>Categories</h2>
      <Table
        columns={['ID', 'Name', 'Description']}
        data={categories}
      />
    </Layout>
  )
}

export async function getServerSideProps (context) {
  const user = await handleAuthSSR(context)
  return {
    props: { user }
  }
}

export default CategoryPage
