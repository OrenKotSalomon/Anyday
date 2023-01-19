import { useState } from "react";
import { TaskDetails } from "./task-details";

import { Icon } from 'monday-ui-react-core'
import { Open } from 'monday-ui-react-core/icons'


export function TaskPreview({ task, board, group }) {
    const [isOpenDetails, setIsOpenDetails] = useState(false)
    return <section className='task-preview flex'>
        <div className="task-name cell">
            <span className="task-preview-title">{task.title}</span>
            <button onClick={() => setIsOpenDetails(!isOpenDetails)} className="open-item-page-btn">
                <Icon iconType={Icon.type.SVG} icon={Open} iconLabel="my svg icon" iconSize={16} /><span>Open</span>
            </button>
            {isOpenDetails && <TaskDetails
                board={board}
                task={task}
                group={group}
                isOpenDetails={isOpenDetails}
                setIsOpenDetails={setIsOpenDetails} />}
        </div>
        <div className="task-person cell">
            <span>Task Members</span>
        </div>
        <div className="task-status cell">
            <span>Task Status</span>
        </div>
        <div className="task-priority cell">
            <span>Task Priority</span>
        </div>
        {/* <TaskDetails /> */}
    </section>

}