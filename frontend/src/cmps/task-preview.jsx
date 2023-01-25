import { useState } from "react";


import { updateTask } from "../store/board.actions";
import { showSuccessMsg } from "../services/event-bus.service";
import { TaskDetails } from "./task-details";
import { DynamicCmp } from "./dynamicCmps/dynamic-cmp.jsx";
import { CHANGE_TASK_TITLE, DELETE_TASK, DUPLICATE_TASK } from "../services/board.service.local";

import { MenuButton, Menu, MenuItem, Icon, EditableHeading, Counter } from 'monday-ui-react-core'
import { Open, Duplicate, Delete, AddUpdate, Update } from 'monday-ui-react-core/icons'

export function TaskPreview({ task, board, group, openModal, provided, snapshot, setIsDndModeDisabled }) {

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
        const data = { taskId: taskToDelete.id, groupId: group.id }

        updateTask(board, data, DELETE_TASK)
        showSuccessMsg(`Task deleted successfully taskId:${data.id} `)
        console.log('data', data);
    }

    ///////////////////// TODO ////////////////////////
    function handleChange({ target }) {
        // const {value} = target
        // console.log('value:', value)
        // updateTask(board, value, HANDLE_TXT_CHANGE)
    }

    return <section className={`task-preview ${snapshot.isDragging ? 'dragged-task' : ''} `}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}>

        <div className="task">

            <div className="task-edit-wrapper">
                <div className="menu-btn-container"
                    style={{ display: snapshot.isDragging ? 'none' : '' }}>

                    <MenuButton className="task-preview-menu-btn"
                    >
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
                                    setIsDndModeDisabled(true);
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

                <div style={{ backgroundColor: group.style }} className='left-border-task'></div>

                <div className='checkbox-row-container-task'>
                    <input className='row-checkbox-task' type="checkbox" />

                </div>

                <div className="task-name-cell" >
                    <EditableHeading className='task-title' onFinishEditing={onFinishEditingInTask} type={EditableHeading.types.h5} value={task.title} />

                    {/*  NEED TO ADD THIS BUTTON AND CONFIGURE STYLING WONT IMPACT TASK ROW */}
                    {/* <button onClick={() => setIsOpenDetails(!isOpenDetails)} className="open-item-page-btn">
                        <Icon iconType={Icon.type.SVG} icon={Open} iconLabel="Task Details" iconSize={16} /><span>Open</span>
                    </button> */}

                </div>
                <div className="msg-btn-container" onClick={() => {
                    setIsOpenDetails(!isOpenDetails)
                    setIsDndModeDisabled(true)
                }}
                >

                    <button className="msg-btn" style={task.comments ? { paddingRight: '5px' } : { paddingRight: '19px', paddingLeft: '20px' }}>

                        {!task.comments && <Icon SVG="AddUpdate" iconType={Icon.type.SVG} icon={AddUpdate} iconLabel="Task Details" iconSize={24} />}
                        {task.comments && <div className="storybook-counter_position">
                            <Icon icon={Update} iconSize={24} style={{ color: '#0073ea' }} />
                            <Counter count={task.comments?.length+task.pinedComments?.length} size={Counter.sizes.SMALL} className='counter-comments' />

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
                                    dueDate: task?.dueDate,
                                    priority: task?.priority,
                                    labelStatus: task?.labelStatus,
                                }}
                                openModal={openModal}
                                handleChange={handleChange}
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
                setIsOpenDetails={setIsOpenDetails}
                setIsDndModeDisabled={setIsDndModeDisabled} />}
        </div>

    </section>
}
