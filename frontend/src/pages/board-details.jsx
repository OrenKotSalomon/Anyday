import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { NavBar } from "../cmps/nav-bar";
import { BoardHeader } from "../cmps/board-header";
import { DynamicModal } from "../cmps/dynamicCmps/dynamic-modal.jsx";
import { GroupPreview } from "../cmps/group-preview";
import { SideGroupBar } from "../cmps/side-group-bar";

import { ADD_GROUP_FROM_BUTTOM, ADD_GROUP_FROM_HEADER, ADD_TASK_FROM_HEADER, DATE_PICKER, DUPLICATE_CHECKED_TASKS, LABEL_STATUS_PICKER, MEMEBER_PICKER, ON_DRAG_GROUP, PRIORITY_PICKER, REMOVE_CHECKED_VALUE_GROUPS, REMOVE_TASKS_FROM_GROUP, STATUS_PICKER, UPDATE_TASK_DATE, UPDATE_TASK_LABEL_STATUS, UPDATE_TASK_MEMBERS, UPDATE_TASK_PRIORITY, UPDATE_TASK_STATUS } from "../services/board.service.local";
import { handleOnDragEnd, loadBoard, onGroupDragStart, setPrevBoard, updateBoard, updateGroup, updateTask } from "../store/board.actions";

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Loader, Icon, DialogContentContainer, MenuItem, Menu, MenuDivider } from 'monday-ui-react-core';
import { Add, Group, Item, Close } from 'monday-ui-react-core/icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCircleArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faCopy } from '@fortawesome/free-regular-svg-icons'
import { utilService } from "../services/util.service";
import { socketService, SOCKET_EMIT_SET_TOPIC, SOCKET_EVENT_UPDATE_BOARD } from "../services/socket.service";
import { Kanban } from "./kanban";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { useDispatch } from "react-redux";
import { SET_FILTERBY } from "../store/board.reducer";

export function BoardDetails() {

    const board = useSelector((storeState) => storeState.boardModule.board)
    const filterBy = useSelector((storeState) => storeState.boardModule.filterBy)
    const prevBoard = useSelector((storeState) => storeState.boardModule.prevBoard)
    const { boardId } = useParams()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [cmp, setCmp] = useState({})
    const [isDndModeDisabled, setIsDndModeDisabled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isCheckedShow, setIsCheckedShow] = useState(false)
    const [isMoveToShow, setisMoveToShow] = useState(false)

    const boardContainer = useRef()
    const dispatch = useDispatch()
    useEffect(() => {
        loadBoard(boardId, filterBy)
        socketService.on(SOCKET_EVENT_UPDATE_BOARD, loadBoard)
        socketService.emit(SOCKET_EMIT_SET_TOPIC, boardId)
        return () => {
            socketService.off(SOCKET_EVENT_UPDATE_BOARD, loadBoard)
        }
    }, [boardId, filterBy])

    function onUpdateTaskLabel(type, data, labelPick) {
        data.labelPick = labelPick
        console.log(data);
        switch (type) {
            case UPDATE_TASK_STATUS:
                return updateTask(board, data, UPDATE_TASK_STATUS)
            case UPDATE_TASK_LABEL_STATUS:
                return updateTask(board, data, UPDATE_TASK_LABEL_STATUS)
            case UPDATE_TASK_DATE:
                return updateTask(board, data, UPDATE_TASK_DATE)
            case UPDATE_TASK_PRIORITY:
                return updateTask(board, data, UPDATE_TASK_PRIORITY)
            case UPDATE_TASK_MEMBERS:
                return updateTask(board, data, UPDATE_TASK_MEMBERS)

        }

    }
    // 
    function checkIfTaskChecked() {
        let copyBoard = structuredClone(board)
        let tasksChecked = copyBoard.groups.map(group => {
            return group.tasks.filter(task => task.isChecked)

        })

        return tasksChecked.flat(1).length
    }

    function openModal(ev, data, info) {
        let labelPos = ev.target.getBoundingClientRect()
        let boardScrollTop = boardContainer.current.scrollTop
        let boardScrollLeft = boardContainer.current.scrollLeft
        setIsModalOpen(true)

        switch (info) {
            case STATUS_PICKER:
                return setCmp(prev => {
                    return {
                        ...prev,
                        data: { groupId: data.groupId, taskId: data.task.id },
                        pos: { top: labelPos.top + boardScrollTop, left: labelPos.left + boardScrollLeft },
                        type: info,
                        statuses: board.statuses
                    }
                })
            case LABEL_STATUS_PICKER:
                return setCmp(prev => {
                    return {
                        ...prev,
                        data: { groupId: data.groupId, taskId: data.task.id },
                        pos: { top: labelPos.top + boardScrollTop, left: labelPos.left + boardScrollLeft },
                        type: info,
                        labelStatuses: board.labelStatuses
                    }
                })
            case MEMEBER_PICKER:
                return setCmp(prev => {
                    return {
                        ...prev,
                        data: { groupId: data.groupId, taskId: data.task.id },
                        type: info,
                        pos: { top: labelPos.top + boardScrollTop, left: labelPos.left + boardScrollLeft },
                        info: {
                            selectedMembers: ['m1', 'm2'],
                            members: data.task.members
                        }
                    }
                })
            case DATE_PICKER:
                return setCmp(prev => {
                    return {
                        ...prev,
                        data: { groupId: data.groupId, taskId: data.task.id },
                        type: info,
                        pos: { top: labelPos.top + boardScrollTop, left: labelPos.left + boardScrollLeft },
                        info: {
                            selectedDate: data.task.dueDate
                        }
                    }
                })
            case PRIORITY_PICKER:
                return setCmp(prev => {
                    return {
                        ...prev,
                        data: { groupId: data.groupId, taskId: data.task.id },
                        pos: { top: labelPos.top + boardScrollTop, left: labelPos.left + boardScrollLeft },
                        type: info,
                        priorities: board.priorities
                    }
                })
        }
    }

    function onAddFromMobile(ev, type) {
        ev.preventDefault()
        switch (type) {
            case 'task':
                setIsMobileMenuOpen(false)
                return updateTask(board, undefined, ADD_TASK_FROM_HEADER)
            case 'group':
                setIsMobileMenuOpen(false)
                return updateGroup(board, null, ADD_GROUP_FROM_HEADER)

        }
    }

    function onCloseCheckedModal() {

        updateGroup(board, false, REMOVE_CHECKED_VALUE_GROUPS)
        setIsCheckedShow(false)

    }
    function onDeleteTasks() {
        // let boardToUpdate = structuredClone(board)

        let boardToUpdate = structuredClone(board)
        let remainingTasks = boardToUpdate.groups.map(group => {
            return group.tasks.filter(task => !task.isChecked)

        })
        try {
            updateGroup(boardToUpdate, remainingTasks, REMOVE_TASKS_FROM_GROUP)
            showSuccessMsg(`successfully deleted ${checkIfTaskChecked()} tasks`)
        } catch (error) {
            showErrorMsg('Couldn\'t delete tasks')
            console.log(error);
        }

    }

    function onDuplicateTasks() {
        let boardToUpdate = structuredClone(board)
        let CheckedTasks = boardToUpdate.groups.map(group => {
            return group.tasks.filter(task => {
                if (task.isChecked) {
                    task.title = task.title + ' Copy'
                    task.isChecked = false
                    task.id = utilService.makeId()
                    return task
                }
            })

        })
        try {
            updateGroup(board, CheckedTasks, DUPLICATE_CHECKED_TASKS)
            showSuccessMsg('Successfully duplicated tasks')
        } catch (error) {

            showErrorMsg('Cannot duplicated tasks')
        }
    }

    function onDragGroup(e) {
        console.log('e:', e)
        // if (task) return
        setPrevBoard(board)
        onGroupDragStart(board)
    }

    function onSetFilterBy(filterBy) {
        dispatch({ type: SET_FILTERBY, filterBy })
    }

    if (!board.groups || !board) return <div className="loader"><Loader size={Loader.sizes.LARGE} /></div>
    return <section className="board-details">
        <NavBar />
        <SideGroupBar />
        {board && <div ref={boardContainer} className="board-container">
            <BoardHeader board={board} onSetFilterBy={onSetFilterBy} />

            <DragDropContext onDragStart={(e) => onDragGroup(e)} onDragEnd={(res) => handleOnDragEnd(res, 'group', { prevBoard, grouplist: prevBoard.groups })}>
                <Droppable droppableId='groups' >
                    {(provided) => (

                        <section className="groups-container"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >

                            {board.groups.map((group, index) =>
                                <GroupPreview
                                    index={index}

                                    // provided={provided}
                                    key={group.id}
                                    board={board}
                                    group={group}
                                    openModal={openModal}
                                    isDndModeDisabled={isDndModeDisabled}
                                    setIsDndModeDisabled={setIsDndModeDisabled}
                                    setIsCheckedShow={setIsCheckedShow}
                                />
                            )}

                            {provided.placeholder}
                            <div className="bottom-add-group-btn-container">

                                <button className="btn clean bottom-add-group-btn"
                                    onClick={() => updateGroup(board, null, ADD_GROUP_FROM_BUTTOM)}>
                                    <Icon iconType={Icon.type.SVG} icon={Add} iconSize={19} /> Add  new group
                                </button>
                            </div>
                        </section>
                    )}
                </Droppable>
            </DragDropContext>
            {isModalOpen && <DynamicModal cmp={cmp} setIsModalOpen={setIsModalOpen} onUpdateTaskLabel={onUpdateTaskLabel} />}
            <div className="add-group-btn-container">
            </div>

            {isCheckedShow && <div className="checkbox-modal-wrapper">
                <div className="checkbox-modal-container">
                    <div className="number-of-checked">
                        <div className="checked-num">{checkIfTaskChecked()}</div>
                    </div>
                    <div className="item-select-container">

                        <div className="selected-txt">
                            {checkIfTaskChecked() === 1 ? 'Item selected' : 'Items selected'}
                        </div>
                    </div>
                    <div className="btns-container">
                        <div className="checknox-delete-btn-container-temp">
                            <button>

                            </button>
                            <span>delete</span>
                        </div>
                        <div className="checknox-delete-btn-container-temp">
                            <button>delete</button>
                            <span>delete</span>
                        </div>
                        <div className="checknox-delete-btn-container-temp">
                            <button>delete</button>
                            <span>delete</span>
                        </div>

                        <div className="checknox-delete-btn-container">
                            <button onClick={onDuplicateTasks}>
                                <FontAwesomeIcon
                                    className="icon-delete"
                                    icon={faCopy} />
                            </button>
                            <span>Duplicate</span>
                        </div>
                        <div className="checknox-delete-btn-container">
                            <button onClick={onDeleteTasks}>
                                <FontAwesomeIcon
                                    className="icon-delete"
                                    icon={faTrash} />

                            </button>
                            <span>Delete</span>
                        </div>
                        <div className="checknox-move-btn-container">
                            <button onClick={() => setisMoveToShow(!isMoveToShow)}>      <FontAwesomeIcon
                                className="icon-delete"
                                icon={faCircleArrowRight} /></button>
                            <span>Move to</span>
                        </div>
                    </div>
                    <div className="close-checked-modal">
                        <button onClick={onCloseCheckedModal}>
                            <Icon iconType={Icon.type.SVG} icon={Close} iconSize={18} customColor={'#323338'} />

                        </button>
                    </div>

                </div>

            </div>}

        </div>
        }

        {isMobileMenuOpen &&
            <div className="mobile-add-menu-container">

                <DialogContentContainer >
                    <Menu
                        size='xxs'
                        className='mobile-menu-add-bottom'
                        focusOnMount={true}
                    >
                        <MenuItem
                            icon={Item}
                            title="Add Task"
                            onClick={(ev) => onAddFromMobile(ev, 'task')}
                        />
                        <MenuDivider />
                        {/* <MenuItem
                    //// NEED TO ADD STATUS PICKER AND ADD IT.
                            //   icon={}
                            title="Delete"
                        /> */}
                        <MenuItem
                            icon={Group}
                            title="Add Group"
                            onClick={(ev) => onAddFromMobile(ev, 'group')}
                        />
                    </Menu>
                </DialogContentContainer>

            </div>

        }

        <div className="btn-add-mobile-container">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="btn-add-mobile">
                <Icon className='icon-mobile-add'
                    ignoreFocusStyle={true}
                    style={{ rotate: isMobileMenuOpen ? '405deg' : '0deg' }} iconType={Icon.type.SVG} icon={Add} iconSize={22} />
            </button>
        </div>

    </section >
}