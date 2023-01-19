import { useState } from "react";
import { TaskDetails } from "./task-details";

import { MenuButton, Menu, MenuItem, Icon } from 'monday-ui-react-core'
import { Open, Duplicate, Delete, Bolt } from 'monday-ui-react-core/icons'
import { updateTask } from "../store/board.actions";
import { DELETE_TASK, DUPLICATE_TASK } from "../services/board.service.local";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";

export function TaskPreview({ task, board, group }) {

    const [isOpenDetails, setIsOpenDetails] = useState(false)

    function onDuplicateTask(taskToDuplicate) {
        const data = { taskToDuplicate, id: taskToDuplicate.id, groupId: group.id }
        updateTask(board, data, DUPLICATE_TASK)
        showSuccessMsg(`Task duplicated successfully`)
    }

    function onDeleteTask(taskToDelete) {
        const data = { id: taskToDelete.id, groupId: group.id }
        updateTask(board, data, DELETE_TASK)
        showSuccessMsg(`Task deleted successfully taskId:${data.id} `)
    }

    return <section className='task-preview flex'>
        <MenuButton className="task-preview-menu-btn" >
            <Menu
                id="menu"
                size="medium"
                style={{
                    backgroundColor: 'red',
                    color: 'red'
                }}
            >
                <MenuItem
                    onClick={() => setIsOpenDetails(!isOpenDetails)}
                    icon={Open}
                    title="Open"
                />
                <MenuItem
                    onClick={() => onDuplicateTask(task)}
                    icon={Duplicate}
                    title="Duplicate Task"
                />
                <MenuItem
                    onClick={() => onDeleteTask(task)}
                    icon={Delete}
                    title="Delete"
                />
            </Menu>
        </MenuButton>
        <div className="task-name cell">
            <span className="task-preview-title"> {task.title}</span>
            <button onClick={() => setIsOpenDetails(!isOpenDetails)} className="open-item-page-btn">
                <Icon iconType={Icon.type.SVG} icon={Open} iconLabel="Task Details" iconSize={16} /><span>Open</span>
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