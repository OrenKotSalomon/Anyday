import { EditableHeading } from 'monday-ui-react-core'
import { useState } from 'react';
import { updateBoard } from '../store/board.actions';
import { TaskPreview } from "./task-preview";

export function GroupList({ board, group }) {

    const [boardToUpdate, setBoardToUpdate] = useState(group)

    function onFinishEditing() {
        updateBoard(board)
    }

    function handleChange(value) {
        setBoardToUpdate(prevGroup => ({...prevGroup, title: value}))
    }

    return <section className='group-list'>
        <div className="group-header-container">
            <div className="group-header-name"
                style={{ color: group.style }}>
                <EditableHeading
                    onFinishEditing={onFinishEditing}
                    onChange={handleChange}
                    brandFont
                    value={group.title}
                />
            </div>
        </div>
        <div className="main-group-container"
            style={{ backgroundColor: group.style }}>
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