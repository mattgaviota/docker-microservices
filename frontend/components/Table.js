export default function Table ({ columns, data, page, pageSize, count, onChange }) {
  const pages = count ? Array(Math.ceil(count / pageSize)).fill(0).map((_, i) => i + 1) : []

  function handleOnChange (newPage) {
    if (newPage >= 1 && newPage <= pages.length) {
      onChange({ page: newPage, pageSize })
    }
  }

  return (
    <div className='ui container'>
      <table className='ui striped table'>
        <thead>
          <tr>
            {columns.map(c => <th key={c}>{c}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => <tr key={i}>{columns.map(c => <td key={c.toLowerCase()}>{d[c.toLowerCase()]}</td>)}</tr>)}
        </tbody>
        {pages.length > 0 &&
          <tfoot>
            <tr>
              <th colSpan='6'>
                <div className='ui right floated pagination menu'>
                  <a
                    className={page === 1 ? 'item disabled' : 'item'}
                    onClick={() => handleOnChange(page - 1)}
                  >
                    &laquo;
                  </a>
                  {pages.map(p =>
                    <a
                      className={p === page ? 'item active' : 'item'}
                      key={`p-${p}`}
                      onClick={() => handleOnChange(p)}
                    >
                      {p}
                    </a>
                  )}
                  <a
                    className={page === pages.length ? 'item disabled' : 'item'}
                    onClick={() => handleOnChange(page + 1)}
                  >
                    &raquo;
                  </a>
                </div>
              </th>
            </tr>
          </tfoot>}
      </table>
    </div>
  )
}
