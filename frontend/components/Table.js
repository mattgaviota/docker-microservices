export default function Table ({ columns, data, page, pageSize, count, onChange }) {
  const pages = count ? Array(Math.ceil(count / pageSize)).fill(0).map((_, i) => i + 1) : []

  function handleOnChange (newPage) {
    if (newPage >= 1 && newPage <= pages.length) {
      onChange({ page: newPage, pageSize })
    }
  }

  return (
    <div className='nes-table-responsive'>
      <style jsx global>{`
            .pagination {
              padding: 10px;
              display: flex;
              justify-content: flex-end;
              align-items: center;
            }
            .pagination-item {
              padding: 5px;
            }
          `}
      </style>
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
      {pages.length > 0 &&
        <div className='pagination'>
          <span className={page === 1 ? 'pagination-arrow nes-text is-disabled' : 'pagination-arrow'} onClick={() => handleOnChange(page - 1)}>&laquo;</span>
          {pages.map(p =>
            <span
              className={p === page ? 'pagination-item nes-text is-primary' : 'pagination-item nes-text'}
              key={`p-${p}`}
              onClick={() => handleOnChange(p)}
            >
              {p}
            </span>
          )}
          <span className={page === pages.length ? 'pagination-arrow nes-text is-disabled' : 'pagination-arrow'} onClick={() => handleOnChange(page + 1)}>&raquo;</span>
        </div>}
    </div>
  )
}
