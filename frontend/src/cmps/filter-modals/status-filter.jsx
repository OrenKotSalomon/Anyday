

export function StatusModal({ board }) {
    return (
        <section className='status-container'>
            <div className="filter-status-title">Status</div>
            {
                board.statuses.map((status, idx) => {

                    return <div className="status-filter" key={idx}
                        style={{ backgroundColor: status.bgColor }}
                    >{status.label}</div>

                })
            }

        </section>
    )
}