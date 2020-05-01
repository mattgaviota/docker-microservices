import Cookies from 'js-cookie'
import { handleAuthSSR } from '../lib/auth'

function StockPage () {
  // const token = Cookies.get('auth')
  return <div>Stock page</div>
}

StockPage.getInitialProps = (context) => {
  handleAuthSSR(context)
  return {
    props: {}
  }
}

export default StockPage
