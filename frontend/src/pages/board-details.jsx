import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { NavBar } from "../cmps/nav-bar";
import { BoardHeader } from "../cmps/board-header";
import { DynamicModal } from "../cmps/dynamicCmps/dynamic-modal.jsx";
import { GroupPreview } from "../cmps/group-preview";
import { SideGroupBar } from "../cmps/side-group-bar";

import { ADD_GROUP_FROM_BUTTOM, ADD_GROUP_FROM_HEADER, ADD_TASK_FROM_HEADER, DATE_PICKER, LABEL_STATUS_PICKER, MEMEBER_PICKER, ON_DRAG_GROUP, PRIORITY_PICKER, STATUS_PICKER, UPDATE_TASK_DATE, UPDATE_TASK_LABEL_STATUS, UPDATE_TASK_PRIORITY, UPDATE_TASK_STATUS } from "../services/board.service.local";
import { handleOnDragEnd, loadBoard, onGroupDragStart, setPrevBoard, updateBoard, updateGroup, updateTask } from "../store/board.actions";

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Loader, Icon, DialogContentContainer, MenuItem, Menu, MenuDivider } from 'monday-ui-react-core';
import { Add, Group, Item } from 'monday-ui-react-core/icons';

export function BoardDetails() {

    const board = useSelector((storeState) => storeState.boardModule.board)
    const prevBoard = useSelector((storeState) => storeState.boardModule.prevBoard)
    const { boardId } = useParams()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [cmp, setCmp] = useState({})
    const [isDndModeDisabled, setIsDndModeDisabled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const boardContainer = useRef()

    useEffect(() => {
        loadBoard(boardId)
    }, [boardId])

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
        }

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

    function onDragGroup() {
        setPrevBoard(board)
        onGroupDragStart(board)
    }

    if (!board.groups || !board) return <div className="loader"><Loader size={Loader.sizes.LARGE} /></div>
    return <section className="board-details">
        <NavBar />
        <SideGroupBar />
        {board && <div ref={boardContainer} className="board-container">
            <BoardHeader board={board} />

            <DragDropContext onDragStart={onDragGroup} onDragEnd={(res) => handleOnDragEnd(res, 'group', { prevBoard, grouplist: prevBoard.groups })}>
                <Droppable droppableId='groups'>
                    {(provided) => (

                        <section className="groups-container"
                            {...provided.droppableProps}
                            ref={provided.innerRef}>

                            {/* Drag Here */}
                            <DragDropContext onDragEnd={(result) => handleOnDragEnd(result, 'task', { board })} >
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
                                    />
                                )}
                            </DragDropContext>
                            {/* Drag Here */}

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