import { useEffect, useRef, useState } from 'react';

import { utilService } from '../services/util.service';
import { updateGroup } from '../store/board.actions';
import { ADD_GROUP, ADD_GROUP_TASK, boardService, CHANGE_GROUP_COLOR, CHANGE_GROUP_TITLE, DATE_PICKER, DELETE_GROUP, DUPLICATE_GROUP, LABEL_STATUS_PICKER, MEMEBER_PICKER, NUMBER_PICKER, ON_DRAG_TASK, PRIORITY_PICKER, STATUS_PICKER, TEXT_LABEL, UPDATE_GROUP_CHECKED } from '../services/board.service.local';

import { TaskPreview } from "./task-preview";
import { AddLabelModal } from './task-labels-dropdown/add-label-modal';
import { DynamicSummaryCmp } from './dynamicCmps/dynamic-summary-cmp';

import { EditableHeading, Tooltip, MenuButton, Menu, MenuItem, ColorPicker, Icon } from 'monday-ui-react-core'
import { Delete, Bullet, Duplicate, Add, DropdownChevronDown, DropdownChevronRight } from 'monday-ui-react-core/icons'
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { SET_FILTERBY } from '../store/board.reducer';
import { useDispatch } from 'react-redux';

export function GroupPreview({ board, group, openModal, setIsDndModeDisabled, isDndModeDisabled, index, setIsCheckedShow }) {

    const [isAddingLabel, setIsAddingLabel] = useState(false)
    const [isPickColor, setIsPickColor] = useState(false)
    const [groupToUpdate, setGroupToUpdate] = useState(group)
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [listToUpdate, setListToUpdate] = useState(group.tasks)
    const [sortBy, setSortBy] = useState(boardService.getDefaultFilter())

    const dispatch = useDispatch()
    onSetSortBy = useRef(utilService.debounce(onSetSortBy))

    useEffect(() => {

        onSetSortBy.current(sortBy)
    }, [sortBy]);

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

    function handleChangeCheckbox({ target }, groupId) {

        //need to support blocking other groups cannot be checked

        updateGroup(board, { id: groupId, checked: target.checked }, UPDATE_GROUP_CHECKED)
    }
    function SetSortBy(type) {
        setSortBy(prev => {
            return { ...prev, sortBy: type }
        })
    }

    function onSetSortBy(filterBy) {
        filterBy.desc = filterBy.desc * -1
        dispatch({ type: SET_FILTERBY, filterBy })
    }

    function renderGroupLabels(cmp) {
        switch (cmp) {
            case STATUS_PICKER:
                return <div className="status-label-header ">Status
                    <div className='sort-wrapper'
                        onClick={() => SetSortBy(STATUS_PICKER)}
                    >
                        <FontAwesomeIcon className='sort-up' icon={faSortUp} />
                        <FontAwesomeIcon className='sort-down' icon={faSortDown} />
                    </div>
                </div>
            case LABEL_STATUS_PICKER:
                return <div className="label-statuses-header">Label
                    <div className='sort-wrapper'
                        onClick={() => SetSortBy(LABEL_STATUS_PICKER)}
                    >
                        <FontAwesomeIcon className='sort-up' icon={faSortUp} />
                        <FontAwesomeIcon className='sort-down' icon={faSortDown} />
                    </div>
                </div>
            case MEMEBER_PICKER:
                return <div className="person-label-header ">Person
                    {/* <div className='sort-wrapper'
                        onClick={() => SetSortBy(STATUS_PICKER)}
                    >
                        <FontAwesomeIcon className='sort-up' icon={faSortUp} />
                        <FontAwesomeIcon className='sort-down' icon={faSortDown} />
                    </div> */}
                </div>
            case DATE_PICKER:
                return <div className="date-label-header ">Date
                    <div className='sort-wrapper'
                        onClick={() => SetSortBy(DATE_PICKER)}
                    >
                        <FontAwesomeIcon className='sort-up' icon={faSortUp} />
                        <FontAwesomeIcon className='sort-down' icon={faSortDown} />
                    </div>
                </div>
            case PRIORITY_PICKER:
                return <div className="priority-label-header ">Priority
                    <div className='sort-wrapper'
                        onClick={() => SetSortBy(PRIORITY_PICKER)}
                    >
                        <FontAwesomeIcon className='sort-up' icon={faSortUp} />
                        <FontAwesomeIcon className='sort-down' icon={faSortDown} />
                    </div>
                </div>
            case TEXT_LABEL:
                return <div className="priority-label-header ">Text
                    <div className='sort-wrapper'
                        onClick={() => SetSortBy(TEXT_LABEL)}
                    >
                        <FontAwesomeIcon className='sort-up' icon={faSortUp} />
                        <FontAwesomeIcon className='sort-down' icon={faSortDown} />
                    </div>
                </div>
            case NUMBER_PICKER:
                return <div className="date-label-header ">Number
                    <div className='sort-wrapper'
                        onClick={() => SetSortBy(NUMBER_PICKER)}
                    >
                        <FontAwesomeIcon className='sort-up' icon={faSortUp} />
                        <FontAwesomeIcon className='sort-down' icon={faSortDown} />
                    </div>
                </div>
        }
    }

    function onCollapseGroup(group) {
        group.isCollapsed = !group.isCollapsed
        updateGroup(board, group, ON_DRAG_TASK)
    }

    return <div className="group-list">

        {group.isCollapsed &&
            <Draggable key={group.id} draggableId={group.id} index={index} isDragDisabled={isDndModeDisabled}>
                {(provided) => (
                    <section className="collapsed-group-container flex"
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}>

                        <div className="group-header-container collapsed">
                            <div className="group-header-name"
                                style={{ color: group.style }}>

                                <MenuButton className="group-list-menu-btn" >
                                    <Menu
                                        id="menu"
                                        size="medium"
                                        style={{
                                            backgroundColor: 'red',
                                            color: 'red'
                                        }}
                                    >
                                        <MenuItem
                                            onClick={() => onAddGroup(group)}
                                            icon={Add}
                                            title="Add Group"
                                        />
                                        <MenuItem
                                            onClick={() => onSetColorGroup()}
                                            icon={Bullet}
                                            title="Change Color"
                                        />
                                        <MenuItem
                                            onClick={() => onDuplicateGroup(group)}
                                            icon={Duplicate}
                                            title="Duplicate Group"
                                        />
                                        <MenuItem
                                            onClick={() => onDeleteGroup(group)}
                                            icon={Delete}
                                            title="Delete"
                                        />
                                    </Menu>
                                </MenuButton>

                                {isPickColor && <ColorPicker className="group-color-picker"
                                    colorSize={ColorPicker.sizes.SMALL}
                                    onSave={(value) => onColorPick(value)} />}

                            </div>
                            <div className='row-collapsed-group-container'>
                                <div className='main-left-header'>
                                    <div className='floatin-white-box'></div>
                                    <div className="group-collapse-btn-container">
                                        <Tooltip content="Expand group" animationType="expand">
                                            <button onClick={() => onCollapseGroup(group)}><Icon style={{ color: group.style }} iconType={Icon.type.SVG} icon={DropdownChevronRight} iconSize={19} /></button>
                                        </Tooltip>
                                    </div>
                                    <div className='left-row-container collapsed '>
                                        <div style={{ backgroundColor: group.style }} className='left-border collapsed'></div>
                                        <div className='collapsed-group-header'>
                                            <div className="monday-storybook-tooltip_bottom group-list-editable-header flex column">
                                                <Tooltip>
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
                                                <div className='tasks-count-container'>{group.tasks.length + ' '} Tasks</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="main-header-labels-container collapsed flex">
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

                    </section>
                )}
            </Draggable>
        }

        {!group.isCollapsed && <section className='expand-group-container'>
            <div className="group-header-container">
                <Draggable key={group.id} draggableId={group.id} index={index} isDragDisabled={isDndModeDisabled}>
                    {(provided) => (
                        <div className="group-name-wrapper"
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}>

                            <div className="group-header-name"
                                style={{ color: group.style }}>

                                <MenuButton className="group-list-menu-btn" >
                                    <Menu
                                        id="menu"
                                        size="medium"
                                        style={{
                                            backgroundColor: 'red',
                                            color: 'red'
                                        }}
                                    >
                                        <MenuItem
                                            onClick={() => onAddGroup(group)}
                                            icon={Add}
                                            title="Add Group"
                                        />
                                        <MenuItem
                                            onClick={() => onSetColorGroup()}
                                            icon={Bullet}
                                            title="Change Color"
                                        />
                                        <MenuItem
                                            onClick={() => onDuplicateGroup(group)}
                                            icon={Duplicate}
                                            title="Duplicate Group"
                                        />
                                        <MenuItem
                                            onClick={() => onDeleteGroup(group)}
                                            icon={Delete}
                                            title="Delete"
                                        />
                                    </Menu>
                                </MenuButton>

                                {isPickColor && <ColorPicker className="group-color-picker"
                                    colorSize={ColorPicker.sizes.SMALL}
                                    onSave={(value) => onColorPick(value)} />}
                                <div className="group-collapse-btn-container">
                                    <Tooltip content="Collapse group" animationType="expand">
                                        <button onClick={() => onCollapseGroup(group)}><Icon style={{ color: group.style }} iconType={Icon.type.SVG} icon={DropdownChevronDown} iconSize={19} /></button>
                                    </Tooltip>
                                </div>
                                <div className="monday-storybook-tooltip_bottom group-list-editable-header">

                                    <Tooltip>
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
                    )}
                </Draggable>
                <div className='row-header-container'>
                    <div className='main-left-header'>
                        <div className='floatin-white-box'></div>

                        <div className='left-row-container'>
                            <div style={{ backgroundColor: group.style }} className='left-border'></div>
                            <div className='checkbox-row-container'
                                onClick={() => setIsCheckedShow(true)}
                            >
                                <input className='row-checkbox'

                                    onChange={(ev) => handleChangeCheckbox(ev, group.id)}
                                    type="checkbox" checked={group.isChecked} />
                            </div>
                            <div className='task-main-container'>
                                <div className="task-row-container">Item</div>
                            </div>
                        </div>
                    </div>
                    <Droppable droppableId="label" direction="horizontal" type='label-list'>
                        {(provided) => (
                            <div className={`main-header-labels-container flex`}
                                {...provided.droppableProps}
                                ref={provided.innerRef}>
                                {board.cmpsOrder.map((cmp, idx) => {
                                    return <Draggable key={idx} draggableId={cmp} index={idx} >
                                        {(provided, snapshot) => (
                                            <div key={idx}
                                                className={snapshot.isDragging ? 'dragged-label ' : ''}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                ref={provided.innerRef} >
                                                {renderGroupLabels(cmp)}
                                                <div className={snapshot.isDragging ? 'label-white-bgc-on-drag' : ''}></div>
                                            </div>
                                        )}
                                    </Draggable>
                                }
                                )}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
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
                <Droppable droppableId={group.id} type='task-list' >
                    {(taskProvider) => (
                        <section className={`tasks-container`}
                            {...taskProvider.droppableProps}
                            ref={taskProvider.innerRef}>

                            {group.tasks.map((task, index) =>
                                <Draggable key={task.id} draggableId={task.id} index={index} isDragDisabled={isDndModeDisabled} >
                                    {(provided, snapshot) => (
                                        <TaskPreview
                                            snapshot={snapshot}
                                            provided={provided}
                                            key={task.id}
                                            task={task}
                                            board={board}
                                            group={group}
                                            openModal={openModal}
                                            setIsDndModeDisabled={setIsDndModeDisabled}
                                            setIsCheckedShow={setIsCheckedShow}
                                        />
                                    )}
                                </Draggable>
                            )}
                            {taskProvider.placeholder}
                            <div className='add-task-wrapper'>
                                <div className='add-task-container'>
                                    <div className='add-task-input-container'>
                                        <div className='floatin-white-box-under'></div>
                                        <div style={{ backgroundColor: group.style }} className='left-border-add-task'></div>
                                        <div className='checkbox-row-container-add-task'>
                                            <input className='row-checkbox-add-task' type="checkbox" disabled />
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
                                    <div className='summary-for-mobile'>

                                        {
                                            board.cmpsOrder.map((cmp, idx) => {

                                                return <DynamicSummaryCmp
                                                    key={idx}
                                                    cmp={cmp}
                                                    board={board}
                                                    group={group}

                                                />
                                            })
                                        }
                                    </div>
                                    <div className='white-box'></div>
                                </div>

                                <div className='label-sum-container'>

                                    <div className='hidden-task-container'>

                                        <div className='floatin-white-box-sum'></div>
                                        <div className='hidden-task'></div>
                                        <div className='right-floating-border'></div>
                                    </div>

                                    <div className='sum-labels-container'>
                                        {
                                            board.cmpsOrder.map((cmp, idx) => {
                                                return <DynamicSummaryCmp
                                                    key={idx}
                                                    cmp={cmp}
                                                    board={board}
                                                    group={group}
                                                />
                                            })
                                        }

                                    </div>
                                    <div className='white-box'></div>

                                </div>
                            </div>
                        </section>

                    )}
                </Droppable>
            </div>
        </section>}

    </div>
}
