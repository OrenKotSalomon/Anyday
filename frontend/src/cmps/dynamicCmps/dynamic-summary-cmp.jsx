import { useState } from "react";
import { DATE_PICKER, LABEL_STATUS_PICKER, MEMEBER_PICKER, PRIORITY_PICKER, STATUS_PICKER, TEXT_PICKER } from "../../services/board.service.local";

export function DynamicSummaryCmp({ cmp, board, group }) {
    const [tempstate, setTempstate] = useState([])
    temp()
    function temp() {
        switch (cmp) {
            case STATUS_PICKER:

                let t = group.tasks.reduce((acc, task) => {
                    if (!acc[task.status]) acc[task.status] = 0
                    acc[task.status]++
                    board.statuses.map(status => {
                        acc[task.status] = status.bgColor
                    })

                    return acc
                }, {})
                let temp2 = Object.values(t).map(value => value / group.tasks.length * 100)
                console.log(t);
                return <div className="status-sum">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>

                </div>
            case LABEL_STATUS_PICKER:
                return
            case PRIORITY_PICKER:
                return
            case DATE_PICKER:
                return
            case MEMEBER_PICKER:
                return
            case TEXT_PICKER:
                return

        }

    }

    switch (cmp) {
        case STATUS_PICKER:
            return <div className="status-picker-sum-container">

            </div>
        case LABEL_STATUS_PICKER:
            return <div className="label-status-picker-sum-container">
                <div className="label-status-picker-sum"></div>
            </div>
        case PRIORITY_PICKER:
            return <div className="priority-picker-sum-container">
                <div className="priority-picker-sum"></div>
            </div>
        case DATE_PICKER:
            return <div className="date-picker-sum-container">
                <div className="date-picker-sum"></div>
            </div>
        case MEMEBER_PICKER:
            return <div className="member-picker-sum-container">
                <div className="member-picker-sum"></div>
            </div>
        case TEXT_PICKER:
            return <div className="text-picker-sum-container">
                <div className="text-picker-sum"></div>
            </div>

    }

    // return (

    // )
}