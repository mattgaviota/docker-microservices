export default function Select ({ categories, onChange }) {
  return (
    <div className='field'>
      <select
        id='categories'
        className='ui fluid dropdown'
        defaultValue='0'
        onChange={onChange}
      >
        <option value='0' disabled hidden>Select...</option>
        <option value=''>All</option>
        {categories.map(c => <option value={c.id} key={c.id}>{c.name}</option>)}
      </select>
    </div>
  )
}