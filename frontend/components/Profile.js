export default function Profile ({ data }) {
  const { id, name, email, usertype } = data
  return (
    <div className='nes-container with-title is-centered'>
      <style jsx global>{`
        .profile img {
          border-radius: 50%;
        }
        .profile-info {
          text-align: left;
          margin-top: 10px;
          font-size: 14px;
        }
      `}
      </style>
      <p className='title'>Profile</p>
      <div className='profile'>
        <img src={`https://api.adorable.io/avatars/200/${email}.png`} />
        <div className='profile-info'>
          <div>ID: {id}</div>
          <div>Name: {name}</div>
          <div>Email: {email}</div>
          <div>Type: {usertype}</div>
        </div>
      </div>
    </div>
  )
}
