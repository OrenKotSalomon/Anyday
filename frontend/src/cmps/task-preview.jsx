import { useState } from "react";
import { TaskDetails } from "./task-details";
// DyncComp
export function TaskPreview({ task }) {
    const [isOpenDetails, setIsOpenDetails] = useState(false)
    return <section className='task-preview flex'>
        <div className="task-name cell">
            <span className="task-preview-title">{task.title}</span>
            <button onClick={() => setIsOpenDetails(!isOpenDetails)} className="open-item-page-btn">.</button>
            <TaskDetails task={task} isOpenDetails={isOpenDetails} />
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