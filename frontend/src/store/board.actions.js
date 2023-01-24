import { boardService, ON_DRAG_TASK } from "../services/board.service.local.js";
import { userService } from "../services/user.service.js";
import { store } from './store.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { ADD_BOARD, REMOVE_BOARD, SET_BOARDS, UNDO_REMOVE_BOARD, UPDATE_BOARD, SET_BOARD } from "./board.reducer.js";

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

export async function loadBoard(boardId) {
    try {
        const board = await boardService.getById(boardId)
        store.dispatch({ type: SET_BOARD, board })
        // return board
    } catch (err) {
        console.log('Cannot load board', err)
        throw err
    }
}

export async function loadBoards() {
    try {
        const boards = await boardService.query()
        console.log('boards from DB:', boards)
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
        const boardToUpdate = boardService.boardServiceReducer(board, data, type)
        const savedBoard = await boardService.save(boardToUpdate)
        store.dispatch(getActionUpdateboard(savedBoard))
        return savedBoard
    } catch (err) {
        throw err
    }

}

export async function updateGroup(board, data, type) {
    try {
        const boardToUpdate = boardService.groupServiceReducer(board, data, type)
        const savedBoard = await boardService.save(boardToUpdate)
        store.dispatch(getActionUpdateboard(savedBoard))
        return savedBoard
    } catch (err) {
        console.log('Cannot save board', err)
        throw err
    }
}

export async function updateTask(board, data, type) {
    try {
        const boardToUpdate = boardService.taskServiceReducer(board, data, type)
        const savedBoard = await boardService.save(boardToUpdate)
        store.dispatch(getActionUpdateboard(savedBoard))
        return savedBoard
    } catch (err) {
        console.log('Cannot save board', err)
        throw err
    }
}

export function handleOnDragEnd(result, type, data) {

    if (!result.destination) return

    switch (type) {
        
        case 'group':
            const groupsToUpdate = data.grouplist
            const [reorderedGroup] = groupsToUpdate.splice(result.source.index, 1)
            groupsToUpdate.splice(result.destination.index, 0, reorderedGroup)
            return updateBoard(data.board, groupsToUpdate, ON_DRAG_TASK)

        case 'task':
            const newOrderedTasks = data.listToUpdate
            const [reorderedTask] = newOrderedTasks.splice(result.source.index, 1)
            newOrderedTasks.splice(result.destination.index, 0, reorderedTask)
            data.group.tasks = newOrderedTasks
            return updateGroup(data.board, data.group, ON_DRAG_TASK)

        default:
            return updateGroup(data.board, data.group, ON_DRAG_TASK)
    }
    // const newOrderedTasks = Array.from(listToUpdate)
    // const [reorderedTask] = newOrderedTasks.splice(result.source.index, 1)
    // newOrderedTasks.splice(result.destination.index, 0, reorderedTask)
    // group.tasks = newOrderedTasks
    // updateGroup(board, group, ON_DRAG_TASK)
    // setListToUpdate(newOrderedTasks)
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
