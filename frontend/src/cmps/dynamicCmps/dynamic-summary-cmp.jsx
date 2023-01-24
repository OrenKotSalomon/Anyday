import { useState } from "react";
import { DATE_PICKER, LABEL_STATUS_PICKER, MEMEBER_PICKER, PRIORITY_PICKER, STATUS_PICKER, TEXT_LABEL } from "../../services/board.service.local";

export function DynamicSummaryCmp({ cmp, board, group }) {
    const [tempstate, setTempstate] = useState([])

    let ffff = [{ done: { bgColor: 'sss', vlaue: 2 } },
    { done: { bgColor: 'sss', precents: 40 } },
    { done: { bgColor: 'sss', precents: 40 } },
    { done: { bgColor: 'sss', precents: 40 } },
    { done: { bgColor: 'sss', precents: 40 } }

    ]

    ffff.map(d => {
        <div></div>

    })
    temp()
    function temp() {
        switch (cmp) {
            case STATUS_PICKER:

                let f = []
                let t = group.tasks.reduce((acc, task) => {
                    if (!acc[task.status]) acc[task.status] = 0
                    acc[task.status]++

                    return acc
                }, {})

                // console.log(t);
                for (const key in t) {


                    console.log(t[key]);
                    console.log(key);
                }

                let temp2 = Object.values(t).map(value => value / group.tasks.length * 100)
                // console.log(temp2);
                return temp2

            case LABEL_STATUS_PICKER:
                return
            case PRIORITY_PICKER:
                return
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
                <div className="status-sum">

                </div>

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
        case TEXT_LABEL:
            return <div className="text-picker-sum-container">
                <div className="text-picker-sum"></div>
            </div>

    }

    // return (

    // )
}