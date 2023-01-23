import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { NavBar } from "../cmps/nav-bar";
import { BoardHeader } from "../cmps/board-header";
import { DynamicModal } from "../cmps/dynamic-modal";
import { GroupList } from "../cmps/group-list";
import { SideGroupBar } from "../cmps/side-group-bar";

import { ADD_GROUP_FROM_BUTTOM, DATE_PICKER, LABEL_STATUS_PICKER, MEMEBER_PICKER, ON_DRAG_GROUP, PRIORITY_PICKER, STATUS_PICKER, UPDATE_TASK_DATE, UPDATE_TASK_LABEL_STATUS, UPDATE_TASK_PRIORITY, UPDATE_TASK_STATUS } from "../services/board.service.local";
import { loadBoard, updateBoard, updateGroup, updateTask } from "../store/board.actions";

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Loader, Icon } from 'monday-ui-react-core';
import { Add } from 'monday-ui-react-core/icons';

export function BoardDetails() {

    const board = useSelector((storeState) => storeState.boardModule.board)
    const { boardId } = useParams()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [cmp, setCmp] = useState({})
    const [groupToUpdate, setGroupToUpdate] = useState([])
    const [isDndModeDisabled, setIsDndModeDisabled] = useState(false)

    const boardContainer = useRef()

    useEffect(() => {
        setBoardAndGroups()
    }, [boardId])

    async function setBoardAndGroups() {
        try {
            const board = await loadBoard(boardId)
            setGroupToUpdate(board.groups)
        } catch (err) {
            console.log('err:', err)
        }
    }

    function onUpdateTaskLabel(type, data, labelPick) {
        // console.log('TYPE', type);
        // console.log(labelPick);
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
        // console.log(labelPos);
        // console.log(bbb.top);
        console.log(boardContainer.current.scrollTop);
        console.log(labelPos);
        setIsModalOpen(true)

        // short switch case , maybe swtich case only on info

        // statuses memebers should go on board obj ?
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

    function handleOnDragEnd(result) {

        if (!result.destination) return
        const newOrderedGroups = Array.from(board.groups)
        const [reorderedGroup] = newOrderedGroups.splice(result.source.index, 1)
        newOrderedGroups.splice(result.destination.index, 0, reorderedGroup)
        // board.groups = newOrderedGroups
        console.log('newOrderedGroups:', newOrderedGroups)
        updateBoard(board, newOrderedGroups, ON_DRAG_GROUP)
        setGroupToUpdate(board.groups)
    }

    if (!board.groups || !board) return <div className="loader"><Loader size={Loader.sizes.LARGE} /></div>
    return <section className="board-details">
        <NavBar />
        <SideGroupBar />
        {board && <div ref={boardContainer} className="board-container">
            <BoardHeader
                board={board}
            />
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId='groups'>
                    {(provided) => (

                        <section className="groups-container"
                            {...provided.droppableProps}
                            ref={provided.innerRef}>

                            {board.groups.map((group, index) =>
                                <Draggable key={group.id} draggableId={group.id} index={index} isDragDisabled={isDndModeDisabled}>
                                    {(provided) => (
                                        <GroupList
                                            provided={provided}
                                            key={group.id}
                                            board={board}
                                            group={group}
                                            openModal={openModal}
                                            isDndModeDisabled={isDndModeDisabled}
                                            setIsDndModeDisabled={setIsDndModeDisabled}
                                        />
                                    )}
                                </Draggable>
                            )}
                            {provided.placeholder}
                            <button className="btn clean bottom-add-group-btn"
                                onClick={() => updateGroup(board, null, ADD_GROUP_FROM_BUTTOM)}>
                                <Icon iconType={Icon.type.SVG} icon={Add} iconSize={19} /> Add  new group
                            </button>
                        </section>
                    )}
                </Droppable>
            </DragDropContext>
            {isModalOpen && <DynamicModal cmp={cmp} setIsModalOpen={setIsModalOpen} onUpdateTaskLabel={onUpdateTaskLabel} />}
            <div className="add-group-btn-container">
            </div>
        </div>
        }

    </section >
}