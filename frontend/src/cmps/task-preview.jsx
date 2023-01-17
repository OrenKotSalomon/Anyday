import { TaskDetails } from "./task-details";
// DyncComp
export function TaskPreview({ task }) {
    return <section className='task-preview flex'>
        <div className="task-name cell">
            <span>{task.title}</span>
        </div>
        <div className="task-person cell">
            <span>Task Person</span>
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