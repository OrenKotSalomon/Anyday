import { useState } from "react"

export function PriorityModal({ prior, onClickLabelFilter }) {
    const [isStatusChose, setIsStatusChose] = useState(false)

    function onClickStatus(label) {
        onClickLabelFilter(label, isStatusChose)
        setIsStatusChose(!isStatusChose)
    }

    return (

        <div className={`status-filter ${isStatusChose ? 'active-filter' : ''}`}
            onClick={() => onClickStatus(prior.label)}

        >
            <div className="status-color-circle"
                style={{ backgroundColor: prior.bgColor }}
            ></div>
            <div className="status-txt"> {prior.label === 'default' ? 'blank' : prior.label}</div>

        </div>

    )
}