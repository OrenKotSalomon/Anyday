import { boardService } from './services/board.service.js'
import { userService } from './services/user.service.js'
import { utilService } from './services/util.service.js'

console.log('Simple driver to test some API calls')

window.onLoadBoards = onLoadBoards
window.onLoadUsers = onLoadUsers
window.onAddBoard = onAddBoard
window.onGetBoardById = onGetBoardById
window.onRemoveBoard = onRemoveBoard
window.onAddBoardMsg = onAddBoardMsg

async function onLoadBoards() {
    const boards = await boardService.query()
    render('Boards', boards)
}
async function onLoadUsers() {
    const users = await userService.query()
    render('Users', users)
}

async function onGetBoardById() {
    const id = prompt('Board id?')
    if (!id) return
    const board = await boardService.getById(id)
    render('Board', board)
}

async function onRemoveBoard() {
    const id = prompt('Board id?')
    if (!id) return
    await boardService.remove(id)
    render('Removed Board')
}

async function onAddBoard() {
    await userService.login({ email: 'muki', password: '123' })
    const savedBoard = await boardService.save(boardService.getEmptyBoard())
    render('Saved Board', savedBoard)
}

async function onAddBoardMsg() {
    await userService.login({ email: 'muki', password: '123' })
    const id = prompt('Board id?')
    if (!id) return

    const savedMsg = await boardService.addBoardMsg(id, 'some msg')
    render('Saved Msg', savedMsg)
}

function render(title, mix = '') {
    // console.log(title, mix)
    const output = utilService.prettyJSON(mix)
    document.querySelector('h2').innerText = title
    document.querySelector('pre').innerHTML = output
}

