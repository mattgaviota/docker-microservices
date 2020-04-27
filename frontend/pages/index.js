import LoginForm from '../components/LoginForm'

function HomePage () {
  return (
    <div className="main-container">
      <style jsx>{`
        .main-container {
          display: flex;
          justify-content: center;
          margin-top: 10%;
        }
      `}</style>
      <LoginForm />
    </div>
  )
}

export default HomePage
