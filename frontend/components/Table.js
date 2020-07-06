export default function Table ({ columns, data, page, pageSize, count, onChange, actions = [] }) {
  const pages = count ? Array(Math.ceil(count / pageSize)).fill(0).map((_, i) => i + 1) : []

  function handleOnChange (newPage) {
    if (newPage >= 1 && newPage <= pages.length) {
      onChange({ page: newPage, pageSize })
    }
  }

  function renderPaginationItem (p, i) {
    let className = ''
    if (p === '...') {
      className = 'item disabled'
    } else if (p === page) {
      className = 'item active'
    } else {
      className = 'item'
    }

    return (
      <a
        className={className}
        key={`p-${i}`}
        onClick={() => handleOnChange(p)}
      >
        {p}
      </a>
    )
  }

  function pagination (currentPage, pageCount) {
    const delta = 2

    const range = []
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(pageCount - 1, currentPage + delta); i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      range.unshift('...')
    }

    if (currentPage + delta < pageCount - 1) {
      range.push('...')
    }

    range.unshift(1)
    range.push(pageCount)

    return range
  }

  return (
    <div className='ui container'>
      <table className='ui celled striped table'>
        <thead>
          <tr>
            {columns.map(c => <th key={c}>{c}</th>)}
            {actions.length > 0 && actions.map(a => <th key={a.name}>{a.name}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) =>
            <tr key={i}>
              {columns.map(c => <td key={c.toLowerCase()}>{d[c.toLowerCase()]}</td>)}
              {actions.length > 0 && <td>{actions.map(a => <button key={a.name} onClick={() => a.onClick(d)}>{a.name}</button>)}</td>}
            </tr>)}
        </tbody>
        {pages.length > 0 &&
          <tfoot>
            <tr>
              <th colSpan={columns.length + actions.length}>
                <div className='ui right floated pagination menu'>
                  <a
                    className={page === 1 ? 'item disabled' : 'item'}
                    onClick={() => handleOnChange(page - 1)}
                  >
                    &laquo;
                  </a>
                  {pagination(page, pages.length).map((p, i) => renderPaginationItem(p, i))}
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
