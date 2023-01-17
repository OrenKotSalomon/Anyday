import { TaskPreview } from "./task-preview";

export function GroupList({ group }) {
    return <section className='group-list'>
        <div className="group-header-container">
            <div className="group-header-name"
            style={{color: group.style}}>
                <h1 className="group-name">{group.title}</h1>
            </div>
        </div>
        <div className="main-group-container"
        style={{backgroundColor: group.style}}>
        <div className="group-labels flex">
            <div className="task-name cell">Task</div>
            <div className="task-person cell">Person</div>
            <div className="task-status cell">Status</div>
            <div className="task-priority cell">Priority</div>
        </div>
        <section className="tasks-container">
            {group.tasks.map(task => <TaskPreview key={task.id} task={task} />)}
        </section>
        </div>
    </section>

}