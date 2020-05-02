export default function Table ({ columns, data }) {
  return (
    <div className='nes-table-responsive'>
      <table className='nes-table is-bordered is-centered'>
        <thead>
          <tr>
            {columns.map(c => <th key={c}>{c}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => <tr key={i}>{columns.map(c => <td key={c.toLowerCase()}>{d[c.toLowerCase()]}</td>)}</tr>)}
        </tbody>
      </table>
    </div>
  )
}
