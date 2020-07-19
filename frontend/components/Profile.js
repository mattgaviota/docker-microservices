export default function Profile ({ data }) {
  const { id, name, email, usertype } = data
  return (
    <div className='ui container'>
      <style jsx global>{`
        .profile-info {
          text-align: left;
          margin-top: 10px;
          font-size: 14px;
        }
      `}
      </style>
      <h3 className='ui header'>Profile</h3>
      <div className='profile'>
        <img
          className='ui medium circular image'
          src={`https://i.pravatar.cc/150?u=${email}`}
        />
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
