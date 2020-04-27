function LoginForm () {
  return <div className="nes-container with-title">
    <p className="title">Login</p>
    <form>
      <div className="nes-field">
        <label htmlFor="name_field">Your name</label>
        <input type="text" id="name_field" className="nes-input" />
      </div>
      <div className="nes-field">
        <label htmlFor="name_field">Your name</label>
        <input type="text" id="name_field" className="nes-input" />
      </div>
      <button type="button" className="nes-btn is-primary">Login</button>
    </form>
  </div>
}

export default LoginForm
