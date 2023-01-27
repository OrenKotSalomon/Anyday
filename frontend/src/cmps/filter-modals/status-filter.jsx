import { useState } from "react"

export function StatusModal({ board, onClickLabelFilter }) {
    const [isStatusChose, setIsStatusChose] = useState(false)

    function onClickStatus(label) {
        onClickLabelFilter(label)
        setIsStatusChose(!isStatusChose)
    }

    return (
        <section className='status-container'>

            <div className="filter-options-container">

                {
                    board.statuses.map((status, idx) => {

                        return <div className={`status-filter ${isStatusChose ? 'active-filter' : ''}`}

                            onClick={() => onClickStatus(status.label)}
                            key={idx}

                        >
                            <div className="status-color-circle"
                                style={{ backgroundColor: status.bgColor }}
                            ></div>
                            <div className="status-txt"
                            > {status.label === 'default' ? 'blank' : status.label}</div>

                        </div>

                    })
                }
            </div>

        </section>
    )
}