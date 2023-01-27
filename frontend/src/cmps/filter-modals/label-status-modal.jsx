export function LabelModal({ board, onClickLabelFilter }) {
    return (
        <section className='status-container'>

            <div className="filter-options-container">

                {
                    board.labelStatuses.map((label, idx) => {

                        return <div className="status-filter" key={idx}
                            onClick={() => onClickLabelFilter(label.label)}

                        >
                            <div className="status-color-circle"
                                style={{ backgroundColor: label.bgColor }}
                            ></div>
                            <div className="status-txt"> {label.label === 'default' ? 'blank' : label.label}</div>

                        </div>

                    })
                }
            </div>

        </section>
    )
}