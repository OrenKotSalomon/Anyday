export function PriorityModal({ board }) {
    return (
        <section className='status-container'>

            <div className="filter-options-container">

                {
                    board.priorities.map((prior, idx) => {

                        return <div className="status-filter" key={idx}

                        >
                            <div className="status-color-circle"
                                style={{ backgroundColor: prior.bgColor }}
                            ></div>
                            <div className="status-txt"> {prior.label === 'default' ? 'blank' : prior.label}</div>

                        </div>

                    })
                }
            </div>

        </section>
    )
}