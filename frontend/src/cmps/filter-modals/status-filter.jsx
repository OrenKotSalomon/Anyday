import { useState } from "react"

export function StatusModal({ status, onClickLabelFilter }) {
    const [isStatusChose, setIsStatusChose] = useState(false)

    function onClickStatus(label) {
        onClickLabelFilter(label, isStatusChose)
        setIsStatusChose(!isStatusChose)
    }

    return (

        <div className={`status-filter ${isStatusChose ? 'active-filter' : ''}`}
            onClick={() => onClickStatus(status.label)}
        >
            <div className="status-color-circle"
                style={{ backgroundColor: status.bgColor }}
            ></div>
            <div className="status-txt"
            > {status.label === 'default' ? 'blank' : status.label}</div>
        </div>
    )
}