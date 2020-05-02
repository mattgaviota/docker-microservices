import Head from 'next/head'

export default function Layout ({ children, title }) {
  return (
    <div className='main-container'>
      <style jsx>{`
        .main-container {
          width: 90%;
          margin: 0 auto;
          padding: 20px;
        }
      `}
      </style>
      <div className='nes-container with-title'>
        <Head>
          <title>{title}</title>
        </Head>
        <p className='title'>{title}</p>
        {children}
      </div>
    </div>
  )
}
