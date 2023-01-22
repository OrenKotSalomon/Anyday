import { useState } from "react";
import { TaskDetails } from "./task-details";

import { MenuButton, Menu, MenuItem, Icon, EditableHeading, Counter, DialogContentContainer, DatePicker } from 'monday-ui-react-core'
import Oren from '../assets/img/Oren.jpg'
import { Open, Duplicate, Delete, Bolt, AddUpdate, Update } from 'monday-ui-react-core/icons'
import { updateTask } from "../store/board.actions";
import { CHANGE_TASK_TITLE, DELETE_TASK, DUPLICATE_TASK } from "../services/board.service.local";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { Avatar, AvatarGroup } from 'monday-ui-react-core';

import { StatusModal } from "./tasks-modals/status-modal";
import { PriorityModal } from "./tasks-modals/priority-modal";
import { DynamicCmp } from "./dynamic-cmp";

export function TaskPreview({ task, board, group, openModal }) {

    const [isOpenDetails, setIsOpenDetails] = useState(false)

    function onDuplicateTask(taskToDuplicate) {
        const data = { taskToDuplicate, id: taskToDuplicate.id, groupId: group.id }
        updateTask(board, data, DUPLICATE_TASK)
        showSuccessMsg(`Task duplicated successfully`)
    }

    function onFinishEditingInTask(value) {
        let taskChanges = { title: value, taskId: task.id, groupId: group.id }
        updateTask(board, taskChanges, CHANGE_TASK_TITLE)
    }

    function onDeleteTask(taskToDelete) {
        const data = { id: taskToDelete.id, groupId: group.id }
        updateTask(board, data, DELETE_TASK)
        showSuccessMsg(`Task deleted successfully taskId:${data.id} `)
    }

    return <section className='task-preview'>
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
        <div className="task">

            <div className="task-edit-wrapper">
                <div style={{ backgroundColor: group.style }} className='left-border-task'></div>
                <div className='checkbox-row-container'>
                    <input className='row-checkbox' type="checkbox" />
                </div>

                <div className="task-name-cell" >
                    <EditableHeading className='task-title' onFinishEditing={onFinishEditingInTask} type={EditableHeading.types.h5} value={task.title} />

                    {/*  NEED TO ADD THIS BUTTON AND IGURE STYLING WONT IMPACT TASK ROW */}
                    {/* <button onClick={() => setIsOpenDetails(!isOpenDetails)} className="open-item-page-btn">
                        <Icon iconType={Icon.type.SVG} icon={Open} iconLabel="Task Details" iconSize={16} /><span>Open</span>
                    </button> */}
                </div>
                <div className="msg-btn-container" onClick={() => setIsOpenDetails(!isOpenDetails)}>

                    <button className="msg-btn" style={task.comments ? { paddingRight: '5px' } : { paddingRight: '19px', paddingLeft: '20px' }}>

                        {!task.comments && <Icon SVG="AddUpdate" iconType={Icon.type.SVG} icon={AddUpdate} iconLabel="Task Details" iconSize={24} />}
                        {task.comments && <div className="storybook-counter_position">
                            <Icon icon={Update} iconSize={24} style={{color: '#0073ea'}} />
                            <Counter count={task.comments.length} size={Counter.sizes.SMALL} className='counter-comments' />

                        </div>}
                    </button>
                </div>

            </div>
            <div className="task-cells-row-container">
                <div className="main-labels-container flex">

                    {board.cmpsOrder.map((cmp, idx) => {
                        return (
                            <DynamicCmp
                                key={idx}
                                cmp={{ cmp, task, groupId: group.id }}
                                info={{
                                    status: task?.status,
                                    members: task?.members,
                                    dueDate: task?.dueDate
                                }}
                                openModal={openModal}
                            />
                        )
                    }
                    )}

                </div>
            </div>
            {isOpenDetails && <TaskDetails
                board={board}
                task={task}
                group={group}
                isOpenDetails={isOpenDetails}
                setIsOpenDetails={setIsOpenDetails} />}
        </div>

    </section>
}
