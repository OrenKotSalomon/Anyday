import { boardService } from "../services/board.service.local.js";
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
        console.log('board from Store:', board)
        store.dispatch({ type: SET_BOARD, board })
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
        const savedBoard = await boardService.save(board)
        console.log('Added board', savedBoard)
        store.dispatch(getActionAddboard(savedBoard))
        return savedBoard
    } catch (err) {
        console.log('Cannot add board', err)
        throw err
    }
}

export async function updateBoard(board, data, type) {
    try {
        // todo
        const boardToUpdate = boardService.boardServiceReducer(board, data, type)

        const savedBoard = await boardService.save(boardToUpdate)
        console.log('Updated board:', savedBoard)
        store.dispatch(getActionUpdateboard(savedBoard))
        console.log('savedBoard:', savedBoard)
        return savedBoard
    } catch (err) {
        console.log('Cannot save board', err)
        throw err
    }

}

export async function updateGroup(board, data, type) {
    try {
        // todo
        const boardToUpdate = boardService.groupServiceReducer(board, data, type)

        const savedBoard = await boardService.save(boardToUpdate)
        console.log('Updated board:', savedBoard)
        store.dispatch(getActionUpdateboard(savedBoard))
        console.log('savedBoard:', savedBoard)
        return savedBoard
    } catch (err) {
        console.log('Cannot save board', err)
        throw err
    }

}

export async function updateTask(board, data, type) {
    try {
        // todo
        const boardToUpdate = boardService.taskServiceReducer(board, data, type)

        const savedBoard = await boardService.save(boardToUpdate)
        console.log('Updated board:', savedBoard)
        store.dispatch(getActionUpdateboard(savedBoard))
        console.log('savedBoard:', savedBoard)
        return savedBoard
    } catch (err) {
        console.log('Cannot save board', err)
        throw err
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
