import { useState } from "react"

export function LabelModal({ label, onClickLabelFilter }) {
    const [isStatusChose, setIsStatusChose] = useState(false)

    function onClickStatus(label) {
        onClickLabelFilter(label, isStatusChose)
        setIsStatusChose(!isStatusChose)
    }

    return (

        <div className={`status-filter ${isStatusChose ? 'active-filter' : ''}`}
            onClick={() => onClickStatus(label.label)}

        >
            <div className="status-color-circle"
                style={{ backgroundColor: label.bgColor }}
            ></div>
            <div className="status-txt"> {label.label === 'default' ? 'blank' : label.label}</div>

        </div>

    )
}