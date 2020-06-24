import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import Layout from '../components/Layout'
import Table from '../components/Table'
import { handleAuthSSR } from '../lib/auth'
import { getData } from '../services/api'

function CategoryPage () {
  const [categories, setCategories] = useState([])

  async function fetchData () {
    const token = Cookies.get('auth')
    const { data: categories } = await getData('/node/api/categories', {}, token)

    setCategories(categories)
  }

  useEffect(() => {
    fetchData()
  }, [])

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
  handleAuthSSR(context)
  return {
    props: {}
  }
}

export default CategoryPage
