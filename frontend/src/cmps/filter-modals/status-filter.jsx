

export function StatusModal({ board, onClickLabelFilter }) {
    return (
        <section className='status-container'>

            <div className="filter-options-container">

                {
                    board.statuses.map((status, idx) => {

                        return <div className="status-filter"

                            key={idx}

                        >
                            <div className="status-color-circle"
                                style={{ backgroundColor: status.bgColor }}
                            ></div>
                            <div className="status-txt"> {status.label === 'default' ? 'blank' : status.label}</div>

                        </div>

                    })
                }
            </div>

        </section>
    )
}