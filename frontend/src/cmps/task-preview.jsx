import { useState } from "react";
import { TaskDetails } from "./task-details";

import { MenuButton, Menu, MenuItem, Icon, EditableHeading, Counter } from 'monday-ui-react-core'
import { Open, Duplicate, Delete, Bolt, AddUpdate, Update } from 'monday-ui-react-core/icons'
import { updateTask } from "../store/board.actions";
import { DELETE_TASK, DUPLICATE_TASK } from "../services/board.service.local";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { Avatar, AvatarGroup } from 'monday-ui-react-core';
import Harel from '../assets/img/Harel.jpg'
import Oren from '../assets/img/Oren.jpg'
import Yossi from '../assets/img/Yossi.jpg'
import { StatusModal } from "./tasks-modals/status-modal";
import { PriorityModal } from "./tasks-modals/priority-modal";

export function TaskPreview({ task, board, group }) {

    const [isOpenDetails, setIsOpenDetails] = useState(false)
    const [isSetStatus, setIsSetStatus] = useState(false)
    const [isSetPriority, setIsSetPriority] = useState(false)


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

    function toggleIsSetStatus() {
        setIsSetStatus(!isSetStatus)
    }

    function toggleIsSetPriority() {
        setIsSetPriority(!isSetPriority)
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
                    <EditableHeading className='task-title' type={EditableHeading.types.h5} value={task.title} />

                    {/*  NEED TO ADD THIS BUTTON AND IGURE STYLING WONT IMPACT TASK ROW */}
                    {/* <button onClick={() => setIsOpenDetails(!isOpenDetails)} className="open-item-page-btn">
                        <Icon iconType={Icon.type.SVG} icon={Open} iconLabel="Task Details" iconSize={16} /><span>Open</span>
                    </button> */}
                </div>
                <div className="msg-btn-container" onClick={() => setIsOpenDetails(!isOpenDetails)}>

                    <button className="msg-btn" style={task.comments ? { paddingRight: '0px' } : { paddingRight: '16px', paddingLeft: '18px' }}>

                        {!task.comments && <Icon SVG="AddUpdate" iconType={Icon.type.SVG} icon={AddUpdate} iconLabel="Task Details" iconSize={24} />}
                        {task.comments && <div className="storybook-counter_position">
                            <Icon icon={Update} iconSize={24} />
                            <Counter count={task.comments.length} size={Counter.sizes.SMALL} className='counter-comments' />
                        </div>}
                    </button>
                </div>

            </div>
            <div className="task-cells-row-container">
                <div className="main-labels-container flex">
                    <div className="person-label cell">
                        <AvatarGroup size={Avatar.sizes.SMALL} max={3}>
                            <Avatar type={Avatar.types.IMG} src={Harel} ariaLabel="Harel Natan" />
                            <Avatar type={Avatar.types.IMG} src={Oren} ariaLabel="Oren Kot" />
                            <Avatar type={Avatar.types.IMG} src={Yossi} ariaLabel="Yossi Karasik" />
                            <Avatar type={Avatar.types.IMG} src={Harel} ariaLabel="Another Me" />
                        </AvatarGroup></div>
                    <div className="status-label cell" onClick={toggleIsSetStatus}>{isSetStatus && <StatusModal />}{task.status}</div>
                    <div className="date-label cell">Date C</div>
                    <div className="priority-label cell" onClick={toggleIsSetPriority}>{isSetPriority && <PriorityModal />}</div>
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