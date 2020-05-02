export default function Profile (props) {
  return (
    <div className='nes-container with-title is-centered'>
      <style jsx global>{`
            body {
              margin: 0;
              padding: 10px;
            }
          `}
      </style>
      <p className='title'>Profile</p>
      <div>
        <img src='https://api.adorable.io/avatars/200/abott@adorable.png' />
        <div className='profile-info'>
          <div>Name: Javier ocampo</div>
          <div>Email: ferroxido@gmail.com</div>
          <div>Type: Seller</div>
        </div>
      </div>
    </div>
  )
}
