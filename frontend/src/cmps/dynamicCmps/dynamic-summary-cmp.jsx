
import { DATE_PICKER, LABEL_STATUS_PICKER, MEMEBER_PICKER, PRIORITY_PICKER, STATUS_PICKER, TEXT_LABEL } from "../../services/board.service.local";

export function DynamicSummaryCmp({ cmp, board, group }) {

    function temp() {
        board = structuredClone(board)
        let labels
        switch (cmp) {
            case STATUS_PICKER:
                labels = []

                let GroupStatuses = group.tasks.reduce((acc, task) => {
                    if (!acc[task.status]) acc[task.status] = 0
                    acc[task.status]++
                    return { ...acc }
                }, {})
                for (const key in GroupStatuses) {
                    board.statuses.find(status => {
                        if (status.label === key) {
                            status.value = GroupStatuses[key]
                            labels.push(status)
                        }
                    })
                }

                return labels

            case LABEL_STATUS_PICKER:
                labels = []
                let GroupLabelsStatuses = group.tasks.reduce((acc, task) => {
                    if (!acc[task.labelStatus]) acc[task.labelStatus] = 0
                    acc[task.labelStatus]++
                    return { ...acc }
                }, {})
                for (const key in GroupLabelsStatuses) {
                    board.labelStatuses.find(status => {
                        if (status.label === key) {
                            status.value = GroupLabelsStatuses[key]
                            labels.push(status)
                        }
                    })
                }
                return labels
                return
            case PRIORITY_PICKER:
                labels = []
                let GroupPriorities = group.tasks.reduce((acc, task) => {
                    if (!acc[task.priority]) acc[task.priority] = 0
                    acc[task.priority]++
                    return { ...acc }
                }, {})
                for (const key in GroupPriorities) {
                    board.priorities.find(status => {
                        if (status.label === key) {
                            status.value = GroupPriorities[key]
                            labels.push(status)
                        }
                    })
                }
                return labels
            case DATE_PICKER:
                return
            case MEMEBER_PICKER:
                return
            case TEXT_LABEL:
                return

        }

    }

    switch (cmp) {
        case STATUS_PICKER:
            return <div className="status-picker-sum-container" >
                <div className="status-sum-container">
                    {
                        temp().map((statusSum, idx) => {

                            return <div key={idx} className="status-sum"
                                style={{
                                    backgroundColor: statusSum.bgColor,
                                    height: '24px',
                                    width: `${statusSum.value / group.tasks.length * 100}%`
                                }}
                            ></div>
                        })
                    }
                </div>

            </div>
        case LABEL_STATUS_PICKER:
            return <div className="label-status-picker-sum-container">
                <div className="label-status-picker-sum">
                    {
                        temp().map((labelStatusSum, idx) => {

                            return <div key={idx} className="status-sum"
                                style={{
                                    backgroundColor: labelStatusSum.bgColor,
                                    height: '24px',
                                    width: `${labelStatusSum.value / group.tasks.length * 100}%`
                                }}
                            ></div>
                        })
                    }
                </div>
            </div>
        case PRIORITY_PICKER:
            return <div className="priority-picker-sum-container">
                <div className="priority-picker-sum">
                    {
                        temp().map((prioritySum, idx) => {

                            return <div key={idx} className="status-sum"
                                style={{
                                    backgroundColor: prioritySum.bgColor,
                                    height: '24px',
                                    width: `${prioritySum.value / group.tasks.length * 100}%`
                                }}
                            ></div>
                        })
                    }
                </div>
            </div>
        case DATE_PICKER:
            return <div className="date-picker-sum-container">
                <div className="date-picker-sum"></div>
            </div>
        case MEMEBER_PICKER:
            return <div className="member-picker-sum-container">
                <div className="member-picker-sum"></div>
            </div>
        case TEXT_LABEL:
            return <div className="text-picker-sum-container">
                <div className="text-picker-sum"></div>
            </div>

    }

}