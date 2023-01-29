import { EditableHeading } from 'monday-ui-react-core'
import { Draggable } from 'react-beautiful-dnd'
import { CHANGE_TASK_TITLE, DELETE_TASK, DUPLICATE_TASK } from '../../services/board.service.local'
import { updateTask } from '../../store/board.actions'
import { MenuButton, Menu, MenuItem, Icon, Counter } from 'monday-ui-react-core'
import { Open, Duplicate, Delete, AddUpdate, Update } from 'monday-ui-react-core/icons'
import { useState } from 'react'
import { showSuccessMsg } from '../../services/event-bus.service'
import { TaskDetails } from '../task-details'

export function TaskCard({ task, group, board, snapshot }) {

    const [isOpenDetails, setIsOpenDetails] = useState(false)

    function onDuplicateTask(taskToDuplicate) {
        const data = { taskToDuplicate, id: taskToDuplicate.id, groupId: group.id }
        updateTask(board, data, DUPLICATE_TASK)
        showSuccessMsg(`Task duplicated successfully`)
    }

    function onDeleteTask(taskToDelete) {
        const data = { taskId: taskToDelete.id, groupId: group.id }

        updateTask(board, data, DELETE_TASK)
        showSuccessMsg(`Task deleted successfully taskId:${data.id} `)
        // console.log('data', data);
    }


    function onFinishEditingInTask(value) {
        let taskChanges = { title: value, taskId: task.id, groupId: group.id }
        updateTask(board, taskChanges, CHANGE_TASK_TITLE)
    }

    return <section className='card'>

        <EditableHeading className='card-task-title'
            onFinishEditing={onFinishEditingInTask}
            type={EditableHeading.types.h5}
            value={task.title} />

        <div className="card-menu-btn-container flex"
            style={{ display: snapshot.isDragging ? 'none' : '' }}>

            {/* <div className="card-msg-btn-container" onClick={() => {
                setIsOpenDetails(!isOpenDetails)
            }}
            >

                <button className="card-msg-btn" style={task.comments ? { paddingRight: '5px' } : { paddingRight: '19px', paddingLeft: '20px' }}>

                    {!task.comments && <Icon SVG="AddUpdate" iconType={Icon.type.SVG} icon={AddUpdate} iconLabel="Task Details" iconSize={24} />}
                    {task.comments && <div className="storybook-counter_position">
                        <Icon icon={Update} iconSize={24} style={{ color: '#0073ea' }} />
                        <Counter count={
                            (Array.isArray(task.comments) ? task.comments.length : 0)
                            + (Array.isArray(task.pinnedComments) ? task.pinnedComments.length : 0)
                        } size={Counter.sizes.SMALL} className='counter-comments' />

                    </div>}
                </button>
            </div> */}

            <MenuButton className="task-preview-menu-btn">
                <Menu
                    id="menu"
                    size="medium"
                    style={{
                        backgroundColor: 'red',
                        color: 'red'
                    }}
                >
                    <MenuItem
                        onClick={() => {
                            setIsOpenDetails(!isOpenDetails);
                        }}
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
        </div>

        {isOpenDetails && <TaskDetails
                board={board}
                task={task}
                group={group}
                isOpenDetails={isOpenDetails}
                setIsOpenDetails={setIsOpenDetails} />}

    </section>

}