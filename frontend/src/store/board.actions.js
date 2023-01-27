import { boardService, ON_DRAG_GROUP, ON_DRAG_LABEL, ON_DRAG_TASK } from "../services/board.service.local.js";
import { userService } from "../services/user.service.js";
import { store } from './store.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { ADD_BOARD, REMOVE_BOARD, SET_BOARDS, UNDO_REMOVE_BOARD, UPDATE_BOARD, SET_BOARD, SET_PREV_BOARD } from "./board.reducer.js";
import { socketService, SOCKET_EMIT_UPDATE_BOARD } from "../services/socket.service.js";

// Action Creators:
export function getActionRemoveboard(boardId) {
    return {
        type: REMOVE_BOARD,
        boardId
    }
}
export function getActionAddboard(board) {
    return {
        type: ADD_BOARD,
        board
    }
}
export function getActionUpdateboard(board) {
    return {
        type: UPDATE_BOARD,
        board
    }
}

export async function loadBoard(boardId, filterBy) {
    try {
        const board = await boardService.getById(boardId, filterBy)
        store.dispatch({ type: SET_BOARD, board })
        return board
    } catch (err) {
        console.log('Cannot load board', err)
        throw err
    }
}

export async function loadBoards() {
    try {
        const boards = await boardService.query()
        store.dispatch({ type: SET_BOARDS, boards })
    } catch (err) {
        console.log('Cannot load boards', err)
        throw err
    }
}

export async function duplicateBoard(board) {
    try {
        const duplicatedBoard = await boardService.duplicate(board)
        store.dispatch(getActionAddboard(duplicatedBoard))
    } catch (err) {
        console.log('Cannot duplicate board', err)
        throw err
    }
}

export async function removeBoard(boardId) {
    try {
        await boardService.remove(boardId)
        store.dispatch(getActionRemoveboard(boardId))
    } catch (err) {
        console.log('Cannot remove board', err)
        throw err
    }
}

export async function addBoard(board) {
    try {
        console.log('board', board);

        const savedBoard = await boardService.save(board)
        console.log('savedBoard', savedBoard);
        store.dispatch(getActionAddboard(savedBoard))
        return savedBoard
    } catch (err) {
        console.log('Cannot add board', err)
        throw err
    }
}

export async function updateBoard(board, data, type) {
    try {
        const boardToUpdate = await boardService.updateBoardService(board, data, type)
        const savedBoard = await boardService.save(boardToUpdate)
        socketService.emit(SOCKET_EMIT_UPDATE_BOARD, savedBoard._id)
        store.dispatch(getActionUpdateboard(savedBoard))
        return savedBoard
    } catch (err) {
        throw err
    }

}

export async function updateGroup(board, data, type) {
    try {
        const boardToUpdate = await boardService.updateGroupsService(board, data, type)
        console.log('boardToUpdate', boardToUpdate);

        const savedBoard = await boardService.save(boardToUpdate)

        socketService.emit(SOCKET_EMIT_UPDATE_BOARD, savedBoard._id)
        store.dispatch(getActionUpdateboard(savedBoard))
        return savedBoard
    } catch (err) {
        console.log('Cannot save board', err)
        throw err
    }
}

export async function updateTask(board, data, type, isDelete) {
    try {
        const boardToUpdate = await boardService.updateTaskService(board, data, type, isDelete)
        const savedBoard = await boardService.save(boardToUpdate)
        socketService.emit(SOCKET_EMIT_UPDATE_BOARD, savedBoard._id)
        store.dispatch(getActionUpdateboard(savedBoard))
        return savedBoard
    } catch (err) {
        console.log('Cannot save board', err)
        throw err
    }
}

export function setPrevBoard(board) {
    store.dispatch({ type: SET_PREV_BOARD, prevBoard: board })
}

export function onGroupDragStart(board) {
    const newBoard = structuredClone(board)
    newBoard.groups.map(group => group.isCollapsed = true)
    store.dispatch({ type: SET_BOARD, board: newBoard })
}

export function handleOnDragEnd(res, type, data) {
    if (!res.destination) return

    let board
    if (data.board) board = data.board
    if (data.prevBoard) board = data.prevBoard

    const { source, destination } = res
    const draggedFromId = source.droppableId
    const draggedToId = destination.droppableId

    switch (type) {
        case 'task':
            if (source.droppableId !== destination.droppableId) {
                const sourceGroup = board.groups.find(group => group.id === draggedFromId)
                const destGroup = board.groups.find(group => group.id === draggedToId)
                const sourceTasks = sourceGroup.tasks
                const destTasks = destGroup.tasks
                const [removed] = sourceTasks.splice(source.index, 1)
                destTasks.splice(destination.index, 0, removed)
            } else {
                const group = board.groups.find(group => group.id === draggedFromId)
                const [removed] = group.tasks.splice(source.index, 1)
                group.tasks.splice(destination.index, 0, removed)
            } return updateBoard(board, board.groups, ON_DRAG_GROUP)
        case 'group':
            const groupsToUpdate = data.grouplist
            const [reorderedGroup] = groupsToUpdate.splice(res.source.index, 1)
            groupsToUpdate.splice(res.destination.index, 0, reorderedGroup)
            store.dispatch({ type: SET_BOARD, board })
            return updateBoard(board, groupsToUpdate, ON_DRAG_GROUP)

        case 'label':
            const newOrderedLabels = data.cmpsOrder
            const [reorderedLabel] = newOrderedLabels.splice(res.source.index, 1)
            newOrderedLabels.splice(res.destination.index, 0, reorderedLabel)
            return updateBoard(board, newOrderedLabels, ON_DRAG_LABEL)

        default:
            return updateGroup(board, data.group, ON_DRAG_TASK)
    }

}

// Demo for Optimistic Mutation
// (IOW - Assuming the server call will work, so updating the UI first)
// export function onRemoveboardOptimistic(boardId) {
//     store.dispatch({
//         type: REMOVE_BOARD,
//         boardId
//     })
//     showSuccessMsg('board removed')

//     boardService.remove(boardId)
//         .then(() => {
//             console.log('Server Reported - Deleted Succesfully');
//         })
//         .catch(err => {
//             showErrorMsg('Cannot remove board')
//             console.log('Cannot load boards', err)
//             store.dispatch({
//                 type: REMOVE_FROM_BOARD,
//             })
//         })
// }
