import { useEffect, useState } from 'react';
import { updateBoard, updateGroup } from '../store/board.actions';
import { ADD_GROUP, ADD_GROUP_TASK, boardService, CHANGE_GROUP_COLOR, CHANGE_GROUP_TITLE, DATE_PICKER, DELETE_GROUP, DUPLICATE_GROUP, MEMEBER_PICKER, ON_DRAG_TASK, PRIORITY_PICKER, STATUS_PICKER, TEXT_PICKER } from '../services/board.service.local';
import { TaskPreview } from "./task-preview";
import { utilService } from '../services/util.service';
import { AddLabelModal } from './tasks-modals/add-label-modal';
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service';
import { EditableHeading, Tooltip, MenuButton, Menu, MenuItem, ColorPicker, Icon } from 'monday-ui-react-core'
import { Delete, Bullet, Duplicate, Add, DropdownChevronDown, DropdownChevronRight } from 'monday-ui-react-core/icons'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { GroupHeaderMenuBtn } from './group-header-menu-btn';

export function GroupList({ board, group, openModal, provided, setIsDndModeDisabled, isDndModeDisabled }) {

    const [isAddingLabel, setIsAddingLabel] = useState(false)
    const [isPickColor, setIsPickColor] = useState(false)
    const [groupToUpdate, setGroupToUpdate] = useState(group)
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [listToUpdate, setListToUpdate] = useState(group.tasks)

    useEffect(() => {
        setListToUpdate(group.tasks)
    }, [board])

    function onFinishEditing() {
        updateGroup(board, groupToUpdate, CHANGE_GROUP_TITLE)
    }

    function handleChange(value) {
        setGroupToUpdate(prevGroup => ({ ...prevGroup, title: value }))
    }

    function onAddGroup(group) {
        updateGroup(board, group, ADD_GROUP)
    }

    function onDuplicateGroup(group) {
        updateGroup(board, group, DUPLICATE_GROUP)
    }

    function onDeleteGroup(group) {
        updateGroup(board, group, DELETE_GROUP)
    }

    function onSetColorGroup() {
        setIsPickColor(!isPickColor)
    }

    function onColorPick([color]) {
        color = utilService.getColorHex(color)
        setIsPickColor(!isPickColor)
        updateGroup(board, { group, color }, CHANGE_GROUP_COLOR)
    }

    function handleChangeTask(value) {
        setNewTaskTitle(value)
    }

    function onAddGroupTask() {
        if (!newTaskTitle) throw new Error('Task title is empty')
        updateGroup(board, { group, newTaskTitle }, ADD_GROUP_TASK)
        setNewTaskTitle('')
    }

    function toggleAddLabelModal() {
        setIsAddingLabel(!isAddingLabel)
    }

    function renderGroupLabels(cmp, idx) {
        switch (cmp) {
            case STATUS_PICKER:
                return <div key={idx} className="status-label-header ">Status</div>
            case MEMEBER_PICKER:
                return <div key={idx} className="person-label-header ">Person</div>
            case DATE_PICKER:
                return <div key={idx} className="date-label-header ">Date</div>
            case PRIORITY_PICKER:
                return <div key={idx} className="priority-label-header ">Priority</div>
            case TEXT_PICKER:
                return <div key={idx} className="priority-label-header ">Text</div>
        }
    }

    function handleOnDragEnd(result) {

        if (!result.destination) return

        const newOrderedTasks = Array.from(listToUpdate)
        const [reorderedTask] = newOrderedTasks.splice(result.source.index, 1)
        newOrderedTasks.splice(result.destination.index, 0, reorderedTask)
        group.tasks = newOrderedTasks
        updateGroup(board, group, ON_DRAG_TASK)
        // setListToUpdate(newOrderedTasks)
    }

    function onCollapseGroup(group) {
        group.isCollapsed = !group.isCollapsed
        updateGroup(board, group, ON_DRAG_TASK)

    }

    return <div className="group-list">

        {group.isCollapsed && <section className="collapsed-group-container flex"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}>

            <div className="group-header-container">
                <div className="group-header-name"
                    style={{ color: group.style }}>

                    <GroupHeaderMenuBtn
                        group={group}
                        onAddGroup={onAddGroup}
                        onSetColorGroup={onSetColorGroup}
                        onDuplicateGroup={onDuplicateGroup}
                        onDeleteGroup={onDeleteGroup} />

                    {isPickColor && <ColorPicker className="group-color-picker"
                        colorSize={ColorPicker.sizes.SMALL}
                        onSave={(value) => onColorPick(value)} />}
                    <div className="group-collapse-btn-container">
                        <Tooltip content="Collapse group" animationType="expand">
                            <button onClick={() => onCollapseGroup(group)}><Icon style={{ color: group.style }} iconType={Icon.type.SVG} icon={DropdownChevronRight} iconSize={19} /></button>
                        </Tooltip>
                    </div>
                </div>
                <div className='row-collapsed-group-container'>
                    <div className='main-left-header'>
                        <div className='floatin-white-box'></div>

                        <div className='left-row-container '>
                            <div style={{ backgroundColor: group.style }} className='left-border collapsed'></div>
                            <div className='collapsed-group-header'>
                                <div className="monday-storybook-tooltip_bottom group-list-editable-header">
                                    <Tooltip
                                        content="Click to Edit" animationType="expand">
                                        <EditableHeading
                                            insetFocus={true}
                                            className="group-header-editable-name"
                                            customColor={group.style}
                                            onFinishEditing={onFinishEditing}
                                            onChange={handleChange}
                                            brandFont={true}
                                            value={group.title}
                                            style={{ fontWeight: 'bold' }}
                                            type={EditableHeading.types.h4}
                                        />
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="main-header-labels-container flex">
                        {board.cmpsOrder.map((cmp, idx) => renderGroupLabels(cmp, idx))}
                    </div>

                    {/* <div className='main-right-header flex'>
                        <div className="add-label-btn-container"
                            style={{
                                backgroundColor: isAddingLabel ? '#d5d8e4' : ''
                            }}>
                            <button onClick={toggleAddLabelModal} className='btn clean add-label-btn'>
                                <Icon className="add-label-icon"
                                    ignoreFocusStyle={true}
                                    style={{
                                        position: 'absolute',
                                        top: '10%',
                                        left: '10%',
                                        transform: 'translate(-50%, -50%)',
                                        color: isAddingLabel ? '#005fb7' : '',
                                        transition: '.2s',
                                        transform: isAddingLabel ? 'rotate(45deg)' : ''
                                    }} iconType={Icon.type.SVG} icon={Add} iconSize={20} />
                            </button>
                        </div>
                        {isAddingLabel && <AddLabelModal />}
                    </div> */}
                </div>
            </div>

        </section>}

        {!group.isCollapsed && <section className='expand-group-container'
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}>

            <div className="group-header-container">
                <div className="group-header-name"
                    style={{ color: group.style }}>

                    <GroupHeaderMenuBtn
                        group={group}
                        onAddGroup={onAddGroup}
                        onSetColorGroup={onSetColorGroup}
                        onDuplicateGroup={onDuplicateGroup}
                        onDeleteGroup={onDeleteGroup} />

                    {isPickColor && <ColorPicker className="group-color-picker"
                        colorSize={ColorPicker.sizes.SMALL}
                        onSave={(value) => onColorPick(value)} />}
                    <div className="group-collapse-btn-container">
                        <Tooltip content="Collapse group" animationType="expand">
                            <button onClick={() => onCollapseGroup(group)}><Icon style={{ color: group.style }} iconType={Icon.type.SVG} icon={DropdownChevronDown} iconSize={19} /></button>
                        </Tooltip>
                    </div>
                    <div className="monday-storybook-tooltip_bottom group-list-editable-header">

                        <Tooltip
                            content="Click to Edit" animationType="expand">
                            <EditableHeading
                                insetFocus={true}
                                className="group-header-editable-name"
                                customColor={group.style}
                                onFinishEditing={onFinishEditing}
                                onChange={handleChange}
                                brandFont={true}
                                value={group.title}
                                style={{ fontWeight: 'bold' }}
                                type={EditableHeading.types.h4}
                            />
                        </Tooltip>
                    </div>
                </div>
                <div className='row-header-container'>
                    <div className='main-left-header'>
                        <div className='floatin-white-box'></div>

                        <div className='left-row-container'>
                            <div style={{ backgroundColor: group.style }} className='left-border'></div>
                            <div className='checkbox-row-container'>
                                <input className='row-checkbox' type="checkbox" />
                            </div>
                            <div className='task-main-container'>
                                <div className="task-row-container">Item</div>
                            </div>
                        </div>
                    </div>
                    <div className="main-header-labels-container flex">
                        {board.cmpsOrder.map((cmp, idx) => renderGroupLabels(cmp, idx))}
                    </div>

                    <div className='main-right-header flex'>
                        <div className="add-label-btn-container"
                            style={{
                                backgroundColor: isAddingLabel ? '#d5d8e4' : ''
                            }}>
                            <button onClick={toggleAddLabelModal} className='btn clean add-label-btn'>
                                <Icon className="add-label-icon"
                                    ignoreFocusStyle={true}
                                    style={{
                                        position: 'absolute',
                                        top: '10%',
                                        left: '10%',
                                        transform: 'translate(-50%, -50%)',
                                        color: isAddingLabel ? '#005fb7' : '',
                                        transition: '.2s',
                                        transform: isAddingLabel ? 'rotate(45deg)' : ''
                                    }} iconType={Icon.type.SVG} icon={Add} iconSize={20} />
                            </button>
                        </div>
                        {isAddingLabel && <AddLabelModal />}
                    </div>
                </div>
            </div>
            <div className="main-group-container">

                {/* // style={{ backgroundColor: group.style }} */}

                <DragDropContext onDragEnd={handleOnDragEnd} >
                    <Droppable droppableId='tasks'>
                        {(provided) => (

                            <section className="tasks-container"
                                {...provided.droppableProps}
                                ref={provided.innerRef}>

                                {group.tasks.map((task, index) =>
                                    <Draggable key={task.id} draggableId={task.id} index={index} isDragDisabled={isDndModeDisabled}

                                    >
                                        {(provided) => (
                                            <TaskPreview
                                                provided={provided}
                                                key={task.id}
                                                task={task}
                                                board={board}
                                                group={group}
                                                openModal={openModal}
                                                setIsDndModeDisabled={setIsDndModeDisabled}
                                            />
                                        )}
                                    </Draggable>
                                )}
                                {provided.placeholder}
                                <div className='add-task-wrapper'>
                                    <div className='add-task-container'>
                                        <div className='add-task-input-container'>
                                            <div className='floatin-white-box-under'></div>
                                            <div style={{ backgroundColor: group.style }} className='left-border-add-task'></div>
                                            <div className='checkbox-row-container'>
                                                <input className='row-checkbox' type="checkbox" disabled />
                                            </div>
                                            <EditableHeading
                                                className='editable-add-task'
                                                type={EditableHeading.types.h6}
                                                onFinishEditing={onAddGroupTask}
                                                onChange={handleChangeTask}
                                                placeholder={'+ Add Task'}
                                                value={newTaskTitle}
                                                brandFont
                                            />
                                        </div>

                                        <div className='white-box'></div>
                                    </div>
                                </div>

                                <div className='label-sum-container'>

                                    <div className='hidden-task-container'>
                                        <div className='floatin-white-box'></div>
                                        <div className='hidden-task'></div>
                                    </div>

                                    <div className='sum-labels-container'>
                                        {/* Here goes group map */}
                                    </div>

                                </div>

                            </section>

                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </section>}

    </div>
}