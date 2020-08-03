export default function Modal ({ message = '', handleDisplay }) {
  return (
    <div className='ui mini active modal'>
      <div className='content'>
        <h3 className='ui red header'>{message}</h3>
      </div>
      <div className='actions'>
        <button className='ui deny button' onClick={() => handleDisplay(false)}>
          Close
        </button>
      </div>
    </div>
  )
}
