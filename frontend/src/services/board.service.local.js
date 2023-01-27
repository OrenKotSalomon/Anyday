
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { httpService } from './http.service.js'

const BOARD_KEY = 'boardDB'
const BASE_URL = 'board/'

//Board
export const CHANGE_TITLE = 'CHANGE_TITLE'
export const ON_DRAG_GROUP = 'ON_DRAG_GROUP'
export const ON_DRAG_LABEL = 'ON_DRAG_LABEL'
export const ON_DRAG_STATUS = 'ON_DRAG_STATUS'
export const ON_DRAG_CARD = 'ON_DRAG_CARD'

//Groups
export const CHANGE_GROUP_TITLE = 'CHANGE_GROUP_TITLE'
export const CHANGE_GROUP_COLOR = 'CHANGE_GROUP_COLOR'
export const ADD_GROUP_FROM_HEADER = 'ADD_GROUP_FROM_HEADER'
export const ADD_GROUP_FROM_BUTTOM = 'ADD_GROUP_FROM_BUTTOM'
export const ADD_GROUP = 'ADD_GROUP'
export const DUPLICATE_GROUP = 'DUPLICATE_GROUP'
export const ADD_GROUP_TASK = 'ADD_GROUP_TASK'
export const DELETE_GROUP = 'DELETE_GROUP'
export const ON_DRAG_TASK = 'ON_DRAG_TASK'
export const UPDATE_GROUP_CHECKED = 'UPDATE_GROUP_CHECKED'
export const REMOVE_TASKS_FROM_GROUP = 'REMOVE_TASKS_FROM_GROUP'
export const DELETE_SELECTED_TASKS = 'REMOVE_TASKS_FROM_GROUP'
export const REMOVE_CHECKED_VALUE_GROUPS = 'REMOVE_CHECKED_VALUE_GROUPS'
export const MOVE_TASK_TO_GROUP = 'MOVE_TASK_TO_GROUP'

//Tasks
export const DELETE_TASK = 'DELETE_TASK'
export const DUPLICATE_TASK = 'DUPLICATE_TASK'
export const CHANGE_TASK_TITLE = 'CHANGE_TASK_TITLE'
export const ADD_TASK_FROM_HEADER = 'ADD_TASK_FROM_HEADER'
export const ADD_TASK_COMMENT = 'ADD_TASK_COMMENT'
export const DELETE_TASK_COMMENT = 'DELETE_TASK_COMMENT'
export const PIN_TASK_COMMENT = 'PIN_TASK_COMMENT'
export const UNPIN_TASK_COMMENT = 'UNPIN_TASK_COMMENT'
export const UPDATE_TASK_STATUS = 'UPDATE_TASK_STATUS'
export const UPDATE_TASK_DATE = 'UPDATE_TASK_DATE'
export const UPDATE_TASK_MEMBERS = 'UPDATE_TASK_MEMBERS'
export const UPDATE_TASK_PRIORITY = 'UPDATE_TASK_PRIORITY'
export const UPDATE_TASK_LABEL_STATUS = 'UPDATE_TASK_LABEL_STATUS'
export const UPDATE_TASK_LABEL_NUMBER = 'UPDATE_TASK_LABEL_NUMBER'
export const UPDATE_TASK_LABEL_TEXT = 'UPDATE_TASK_LABEL_TEXT'
export const UPDATE_TASK_CHECKED = 'UPDATE_TASK_CHECKED'
export const DUPLICATE_CHECKED_TASKS = 'DUPLICATE_CHECKED_TASKS'

// Dynamic modal/component
export const DATE_PICKER = 'DATE_PICKER'
export const STATUS_PICKER = 'STATUS_PICKER'
export const MEMEBER_PICKER = 'MEMEBER_PICKER'
export const PRIORITY_PICKER = 'PRIORITY_PICKER'
export const TEXT_LABEL = 'TEXT_LABEL'
export const LABEL_STATUS_PICKER = 'LABEL_STATUS_PICKER'
export const NUMBER_PICKER = 'NUMBER_PICKER'

export const boardService = {
    query,
    getById,
    save,
    duplicate,
    remove,
    getEmptyBoard,
    addBoardMsg,
    updateBoardService,
    updateGroupsService,
    updateTaskService,
    getDefaultFilter
}

window.bs = boardService

async function query(filterBy = getDefaultFilter()) {
    const queryParams = `?title=${filterBy.title}&sortBy=${filterBy.sortBy}&desc=${filterBy.desc}`
    // let boards = await storageService.query(BOARD_KEY)
    let boards = await httpService.get(BASE_URL)

    if (!boards.length) {
        // await storageService.post(BOARD_KEY, demoBoard)
        await httpService.post('board', demoBoard)
        // boards = await storageService.query(BOARD_KEY)
        boards = await httpService.get(BASE_URL + queryParams)
        return boards
    }

    // Filters
    // if (filterBy.txt) {
    //     const regex = new RegExp(filterBy.txt, 'i')
    //     regex.test(board.vendor) || regex.test(board.description)
    //     boards = boards.filter(board => {
    //         board.groups.
    //     })
    // }
    // if (filterBy.price) {
    //     boards = boards.filter(board => board.price <= filterBy.price)
    // }
    return boards
}

async function getById(boardId, filterBy = getDefaultFilter()) {

    try {
        const board = await httpService.get(`board/${boardId}`)
        let filteredBoard = structuredClone(board)
        let filteredGroups = filteredBoard.groups
        // let filteredTasks
        if (filterBy.title) {
            const regex = new RegExp(filterBy.title, 'i')
            let check = filteredGroups.filter((group, idx) => {
                if (group.title.match(regex)) return true
                let tasks = group.tasks.filter(task => (task.title.match(regex)))

                if (tasks.length) return filteredGroups[idx].tasks = tasks
            })
            filteredBoard.groups = check
        }

        if (filterBy.label.length) {
            const regex = new RegExp(filterBy.label, 'i')
            let check = filteredGroups.filter((group, idx) => {
                let tasks = group.tasks.filter(task => {
                    if (filterBy.label.includes(task.status) || filterBy.label.includes(task.priority) || filterBy.label.includes(task.labelStatus)) {
                        return true
                    }
                    return false
                })
                if (tasks.length) return filteredGroups[idx].tasks = tasks
            })
            filteredBoard.groups = check

        }

        return filteredBoard
    } catch (error) {
        throw new Error('cant load board from service front', error)
    }
}

async function remove(boardId,) {
    // throw new Error('Nope')
    // await storageService.remove(BOARD_KEY, boardId)
    return httpService.delete(`board/${boardId}`)

}

async function save(board) {
    var savedBoard
    if (board._id) {

        // savedBoard = await storageService.put(BOARD_KEY, board)
        savedBoard = await httpService.put(`board/${board._id}`, board)
        return savedBoard
    } else {
        // Later, owner is set by the backend
        board.owner = userService.getLoggedinUser()
        // savedBoard = await storageService.post(BOARD_KEY, board)
        savedBoard = await httpService.post('board', board)
    }
    return savedBoard
}

async function duplicate(board) {
    let newBoard = structuredClone(board)
    // newBoard._id = utilService.makeId()
    delete newBoard._id
    newBoard.title = `Duplicate of ${board.title}`
    newBoard.groups.map(group => {
        group.id = utilService.makeId()
        group.tasks.map(task => task.id = utilService.makeId())
        return group
    })
    // await storageService.post(BOARD_KEY, newBoard)
    newBoard = await httpService.post('board', newBoard)
    return newBoard
}

async function addBoardMsg(boardId, txt) {
    // Later, this is all done by the backend
    const board = await getById(boardId)
    if (!board.msgs) board.msgs = []

    const msg = {
        id: utilService.makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    board.msgs.push(msg)
    await storageService.put(BOARD_KEY, board)

    return msg
}

function getNewTask() {
    return {
        id: utilService.makeId(),
        title: 'New Task',
        status: 'default',
        priority: 'default',
        members: [],
        isChecked: false,
        dueDate: (Date.now() / 1000),
        labelStatus: 'default',
        number: 0,
        txt: ''
    }

}

async function updateBoardService(board, data, type) {
    let boardToUpdate = await getById(board._id)
    board = structuredClone(boardToUpdate)
    switch (type) {
        case CHANGE_TITLE:
            board.title = data
            return board
        case ON_DRAG_GROUP:
            board.groups = data
            return board
        case ON_DRAG_LABEL:
            board.cmpsOrder = data
            return board
        case ON_DRAG_STATUS:
            board.statuses = data
            return board
        case ON_DRAG_CARD:
            board.groups = data
            return board
        default:
            return board
    }
}

async function updateGroupsService(board, data, type) {
    let boardToUpdate = await getById(board._id)
    board = structuredClone(boardToUpdate)
    let groupToUpdate
    let newTask = getNewTask()
    let groupIdx
    switch (type) {
        case CHANGE_GROUP_TITLE:
            groupIdx = board.groups.findIndex(currGroup => currGroup.id === data.id)
            board.groups.splice(groupIdx, 1, data)
            return board
        case CHANGE_GROUP_COLOR:
            groupToUpdate = board.groups.find(currGroup => currGroup.id === data.group.id)
            groupToUpdate.style = data.color
            return board
        case ADD_GROUP_FROM_HEADER:
            board.groups.unshift(getEmptyGroup())
            return board
        case ADD_GROUP_FROM_BUTTOM:
            board.groups.push(getEmptyGroup())
            return board
        case ADD_GROUP:
            groupIdx = board.groups.findIndex(currGroup => currGroup.id === data.id)
            board.groups.splice(groupIdx + 1, 0, getEmptyGroup())
            return board
        case DUPLICATE_GROUP:
            groupIdx = board.groups.findIndex(currGroup => currGroup.id === data.id)
            data.id = utilService.makeId()
            board.groups.splice(groupIdx, 0, data)
            return board
        case ADD_GROUP_TASK:
            groupToUpdate = board.groups.find(group => group.id === data.group.id)
            newTask.title = data.newTaskTitle
            if (data.status) newTask.status = data.status
            groupToUpdate.tasks.push(newTask)
            return board
        case DELETE_GROUP:
            board.groups = board.groups.filter(group => group.id !== data.id)
            return board
        case ON_DRAG_TASK:
            groupIdx = board.groups.findIndex(currGroup => currGroup.id === data.id)
            board.groups.splice(groupIdx, 1, data)
            return board
        case UPDATE_GROUP_CHECKED:
            console.log('hhhh');

            groupToUpdate = board.groups.find(currGroup => currGroup.id === data.id)
            groupToUpdate.tasks.forEach(task => task.isChecked = data.checked)
            groupToUpdate.isChecked = data.checked
            return board
        case REMOVE_TASKS_FROM_GROUP:
            groupToUpdate = board.groups.map((group, idx) => {
                group.isChecked = false
                return group.tasks = data[idx]
            })

            return board
        case REMOVE_CHECKED_VALUE_GROUPS:
            groupToUpdate = board.groups.forEach((group, idx) => {
                group.isChecked = data
                group.tasks.forEach(task => {

                    task.isChecked = data
                })
            })
            return board
        case DUPLICATE_CHECKED_TASKS:
            groupToUpdate = board.groups.forEach((group, Groupidx) => {
                group.isChecked = false
                group.tasks.forEach((task, taskIdx) => {
                    if (data[Groupidx][taskIdx]) group.tasks.splice(taskIdx, 0, data[Groupidx][taskIdx])
                    task.isChecked = false

                })
            })

            return board
        case MOVE_TASK_TO_GROUP:
            groupToUpdate = board.groups.findIndex(group => group.id === data.groupId)
            data.tasks.forEach((dTask, dTaskIdx) => {
                board.groups.forEach((group, groupIdx) => {
                    group.tasks.forEach((task, taskIdx) => {
                        if (dTask.id === task.id) {
                            group.tasks.splice(taskIdx, 1)
                            board.groups[groupToUpdate].tasks.push(task)
                        }
                        task.isChecked = false
                    })
                    group.isChecked = false
                });

            })

            return board
        default:
            return board
    }
}

async function updateTaskService(board, data, type, isDelete) {
    let boardToUpdate = await getById(board._id)
    board = structuredClone(boardToUpdate)
    const newTask = getNewTask()
    let currTask, groupIdx, taskIdx

    if (data) {
        groupIdx = board.groups.findIndex(currGroup => currGroup.id === data.groupId)
        taskIdx = board.groups[groupIdx].tasks.findIndex(currGroup => currGroup.id === data.taskId)
    }

    switch (type) {
        case DELETE_TASK:
            board.groups[groupIdx].tasks = board.groups[groupIdx].tasks.filter(task => task.id !== data.taskId)

            return board
        case DUPLICATE_TASK:
            data.taskToDuplicate.id = utilService.makeId()
            board.groups[groupIdx].tasks.splice(taskIdx + 1, 0, data.taskToDuplicate)
            return board
        case ADD_TASK_FROM_HEADER:
            board.groups[0].tasks.unshift(newTask)
            return board
        case CHANGE_TASK_TITLE:
            board.groups[groupIdx].tasks[taskIdx].title = data.title
            return board
        case ADD_TASK_COMMENT:
            if (!board.groups[groupIdx].tasks[taskIdx].comments) {
                board.groups[groupIdx].tasks[taskIdx].comments = []
            }
            board.groups[groupIdx].tasks[taskIdx].comments.unshift(data.comment)
            return board
        case DELETE_TASK_COMMENT:
            currTask = board.groups[groupIdx].tasks[taskIdx]
            if (!data.isPinned) {
                let deleteCommentIdx = currTask.comments.findIndex(currComment => currComment.id === data.commentIdx)
                currTask.comments.splice(deleteCommentIdx, 1)
            } else {
                let deleteCommentIdx = currTask.pinnedComments.findIndex(currComment => currComment.id === data.commentIdx)
                currTask.pinnedComments.splice(deleteCommentIdx, 1)
            }
            return board
        case PIN_TASK_COMMENT:
            currTask = board.groups[groupIdx].tasks[taskIdx]
            let PinCommentIdx = currTask.comments.findIndex(currComment => currComment.id === data.commentIdx)
            if (!Array.isArray(board.groups[groupIdx].tasks[taskIdx].pinnedComments)) {
                board.groups[groupIdx].tasks[taskIdx].pinnedComments = []
            }
            board.groups[groupIdx].tasks[taskIdx].pinnedComments.unshift(board.groups[groupIdx].tasks[taskIdx].comments[PinCommentIdx])
            currTask.comments.splice(PinCommentIdx, 1)
            return board
        case UNPIN_TASK_COMMENT:
            currTask = board.groups[groupIdx].tasks[taskIdx]
            let UnpinCommentIdx = currTask.pinnedComments.findIndex(currComment => currComment.id === data.commentIdx)
            if (!Array.isArray(board.groups[groupIdx].tasks[taskIdx].comments)) {
                board.groups[groupIdx].tasks[taskIdx].comments = []
            }
            board.groups[groupIdx].tasks[taskIdx].comments.unshift(board.groups[groupIdx].tasks[taskIdx].pinnedComments[UnpinCommentIdx])
            currTask.pinnedComments.splice(UnpinCommentIdx, 1)
            return board
        // Need to make it Dynamic for each label
        case UPDATE_TASK_STATUS:
            board.groups[groupIdx].tasks[taskIdx].status = data.labelPick
            return board
        case UPDATE_TASK_LABEL_STATUS:
            board.groups[groupIdx].tasks[taskIdx].labelStatus = data.labelPick
            return board
        case UPDATE_TASK_MEMBERS:
            if (isDelete) {
                let memberToDeleteIdx = board.groups[groupIdx].tasks[taskIdx].members.findIndex(member => member._id === data.labelPick._id)
                board.groups[groupIdx].tasks[taskIdx].members.splice(memberToDeleteIdx, 1)
            } else {
                if (board.groups[groupIdx].tasks[taskIdx].members.some((member) => member._id === data.labelPick._id)) return
                board.groups[groupIdx].tasks[taskIdx].members.push(data.labelPick)
            }
            return board
        case UPDATE_TASK_DATE:
            board.groups[groupIdx].tasks[taskIdx].dueDate = data.labelPick
            return board
        case UPDATE_TASK_PRIORITY:
            board.groups[groupIdx].tasks[taskIdx].priority = data.labelPick
            return board
        case UPDATE_TASK_LABEL_NUMBER:
            board.groups[groupIdx].tasks[taskIdx].number = data.labelPick
            return board
        case UPDATE_TASK_LABEL_TEXT:
            board.groups[groupIdx].tasks[taskIdx].txt = data.labelPick
            return board
        case UPDATE_TASK_CHECKED:
            board.groups[groupIdx].tasks[taskIdx].isChecked = data.checked
            return board
        default:
            return board
    }
}

function getDefaultFilter() {
    return { title: '', sortBy: '', label: [], desc: 1 }
}

function getEmptyGroup() {
    return {
        id: utilService.makeId(),
        title: 'New Group',
        archivedAt: 1589983468418,
        isCollapsed: false,
        isChecked: false,
        tasks: [
            {
                id: utilService.makeId(),
                isChecked: false,
                title: 'Task 1',
                status: 'default',
                priority: 'default',
                members: [],
                dueDate: '',
                labelStatus: 'default',
                number: 0,
                txt: ''
            },
            {
                id: utilService.makeId(),
                isChecked: false,
                title: 'Task 2',
                status: 'default',
                priority: 'default',
                members: [],
                dueDate: '',
                labelStatus: 'default',
                number: 0,
                txt: ''
            }
        ],
        style: '#808080'
    }
}

function getEmptyBoard() {
    return {
        title: '',
        isStarred: false,
        archivedAt: 1589983468418,
        statuses: [
            {
                id: utilService.makeId(),
                label: 'done',
                bgColor: '#00c875'
            },
            {
                id: utilService.makeId(),
                label: 'working on it',
                bgColor: '#fdab3d'
            },
            {
                id: utilService.makeId(),
                label: 'stuck',
                bgColor: '#e2445c'
            },
            {
                id: utilService.makeId(),
                label: 'default',
                bgColor: '#c4c4c4'
            },
        ],
        priorities: [
            {
                label: 'critical ⚠️',
                bgColor: '#333333'
            },
            {
                label: 'high',
                bgColor: '#401694'
            },
            {
                label: 'medium',
                bgColor: '#5559df'
            },
            {
                label: 'low',
                bgColor: '#579bfc'
            },
            {
                label: 'default',
                bgColor: '#c4c4c4'
            },
        ],
        labelStatuses: [
            {
                label: 'label 1',
                bgColor: '#9aadbd'
            },
            {
                label: 'label 2',
                bgColor: '#0086c0'
            },
            {
                label: 'label 3',
                bgColor: '#9d99b9'
            },
            {
                label: 'default',
                bgColor: '#c4c4c4'
            }
        ],
        groups: [
            {
                id: utilService.makeId(),
                title: 'Group 1',
                archivedAt: 1589983468418,
                isCollapsed: false,
                isChecked: false,
                tasks: [
                    {
                        id: utilService.makeId(),
                        isChecked: false,
                        title: 'Task 1',
                        status: 'default',
                        priority: 'default',
                        members: [],
                        labelStatus: 'label 1',
                        dueDate: 1589983468418,
                        number: 0,
                        txt: ''
                    },
                    {
                        id: utilService.makeId(),
                        isChecked: false,
                        title: 'Task 2',
                        status: 'default',
                        priority: 'default',
                        number: 0,
                        members: [],
                        labelStatus: 'label 2',
                        dueDate: 1589983468418,
                        txt: ''
                    }
                ],
                style: 'lightpink'
            },
            {
                id: utilService.makeId(),
                title: 'Group 2',
                archivedAt: 1589983468418,
                isCollapsed: false,
                isChecked: false,
                tasks: [
                    {
                        id: utilService.makeId(),
                        isChecked: false,
                        title: 'Task 3',
                        status: 'default',
                        priority: 'default',
                        members: [],
                        labelStatus: 'label 3',
                        number: 0,
                        dueDate: 1589983468418,

                        txt: ''
                    },
                    {
                        id: utilService.makeId(),
                        isChecked: false,
                        title: 'Task 4',
                        status: 'default',
                        priority: 'default',
                        members: [],
                        labelStatus: 'default',
                        dueDate: 1589983468418,
                        number: 0,
                        txt: ''
                    }
                ],
                style: 'gold'
            },
            {
                id: utilService.makeId(),
                title: 'Group 3',
                archivedAt: 1589983468418,
                isCollapsed: false,
                isChecked: false,
                tasks: [
                    {
                        id: utilService.makeId(),
                        isChecked: false,
                        title: 'Task 5',
                        status: 'default',
                        priority: 'default',
                        members: [],
                        labelStatus: 'label 1',
                        dueDate: 1589983468418,
                        number: 0,
                        txt: ''
                    },
                    {
                        id: utilService.makeId(),
                        isChecked: false,
                        title: 'Task 6',
                        status: 'default',
                        priority: 'default',
                        members: [],
                        labelStatus: 'label 2',
                        dueDate: 1589983468418,
                        number: 0,
                        txt: ''
                    }
                ],
                style: 'lightblue'
            },
        ],
        cmpsOrder: [MEMEBER_PICKER, STATUS_PICKER, DATE_PICKER, PRIORITY_PICKER, TEXT_LABEL, LABEL_STATUS_PICKER, NUMBER_PICKER]
    }
}

// TEST DATA
// storageService.post(BOARD_KEY, {vendor: 'Subali Rahok 2', price: 980}).then(x => console.log(x))

const demoBoard = {
    title: 'Demo Board',
    isStarred: false,
    archivedAt: 1589983468418,
    statuses: [
        {
            id: utilService.makeId(),
            label: 'done',
            bgColor: '#00c875'
        },
        {
            id: utilService.makeId(),
            label: 'working on it',
            bgColor: '#fdab3d'
        },
        {
            id: utilService.makeId(),
            label: 'stuck',
            bgColor: '#e2445c'
        },
        {
            id: utilService.makeId(),
            label: 'default',
            bgColor: '#c4c4c4'
        },
    ],
    priorities: [
        {
            label: 'critical ⚠️',
            bgColor: '#333333'
        },
        {
            label: 'high',
            bgColor: '#401694'
        },
        {
            label: 'medium',
            bgColor: '#5559df'
        },
        {
            label: 'low',
            bgColor: '#579bfc'
        },
        {
            label: 'default',
            bgColor: '#c4c4c4'
        },
    ], labelStatuses: [
        {
            label: 'label 1',
            bgColor: '#9aadbd'
        },
        {
            label: 'label 2',
            bgColor: '#0086c0'
        },
        {
            label: 'label 3',
            bgColor: '#9d99b9'
        },
        {
            label: 'default',
            bgColor: '#c4c4c4'
        }
    ],
    groups: [
        {
            id: utilService.makeId(),
            title: 'Group 1',
            archivedAt: 1589983468418,
            isCollapsed: false,
            isChecked: false,
            tasks: [
                {
                    id: utilService.makeId(),
                    isChecked: false,
                    title: 'Task 1',
                    status: 'done',
                    priority: 'critical ⚠️',
                    members: [{
                        fullname: 'Harel',
                        imgUrl: ''
                    }],
                    labelStatus: 'label 2',
                    dueDate: 1589983468418
                },
                {
                    id: utilService.makeId(),
                    isChecked: false,
                    title: 'Task 2',
                    status: 'done',
                    priority: 'medium',
                    members: [{
                        fullname: 'Yossi',
                        imgUrl: ''
                    }],
                    labelStatus: 'default',
                    dueDate: 158993468418
                }
            ],
            style: 'lightpink'
        },
        {
            id: utilService.makeId(),
            title: 'Group 2',
            archivedAt: 1589983468418,
            isCollapsed: false,
            isChecked: false,
            tasks: [
                {
                    id: utilService.makeId(),
                    isChecked: false,
                    title: 'Task 3',
                    status: 'stuck',
                    priority: 'default',
                    members: [{
                        fullname: 'Yossi',
                        imgUrl: ''
                    }],
                    labelStatus: 'label 2',
                    dueDate: 1589983468418
                },
                {
                    id: utilService.makeId(),
                    isChecked: false,
                    title: 'Task 4',
                    status: 'working on it',
                    priority: 'low',
                    members: [{
                        fullname: 'Oren',
                        imgUrl: ''
                    }],
                    labelStatus: 'label 1',
                    dueDate: 1589983468418

                }
            ],
            style: 'gold'
        },
        {
            id: utilService.makeId(),
            title: 'Group 3',
            archivedAt: 1589983468418,
            isCollapsed: false,
            isChecked: false,
            tasks: [
                {
                    id: utilService.makeId(),
                    isChecked: false,
                    title: 'Task 5',
                    status: 'done',
                    priority: 'default',
                    members: [{
                        fullname: 'Oren',
                        imgUrl: ''
                    }],
                    labelStatus: 'label 1',
                    dueDate: 1589983468418
                },
                {
                    id: utilService.makeId(),
                    isChecked: false,
                    title: 'Task 6',
                    status: 'default',
                    priority: 'default',
                    members: {
                        fullname: 'KAKa',
                        imgUrl: ''
                    },
                    labelStatus: 'label 3',
                    dueDate: 1589983468418
                }
            ],
            style: 'lightblue'
        },
    ],
    cmpsOrder: [MEMEBER_PICKER, STATUS_PICKER, DATE_PICKER, PRIORITY_PICKER, TEXT_LABEL, LABEL_STATUS_PICKER, NUMBER_PICKER]

}

// const board = {

    // 'createdBy': {
    //     '_id': 'u101',
    //     'fullname': 'Abi Abambi',
    //     'imgUrl': 'http://some-img'
    // },
    // 'style': {},
    // 'labels': [
    //     {
    //         'id': 'l101',
    //         'title': 'Done',
    //         'color': '#61bd4f'
    //     },
    //     {
    //         'id': 'l102',
    //         'title': 'Progress',
    //         'color': '#61bd33'
    //     }
    // ],
    // 'members': [
    //     {
    //         '_id': 'u101',
    //         'fullname': 'Tal Tarablus',
    //         'imgUrl': 'https://www.google.com'
    //     }
    // ],
//     'groups': [
//         {
//             'id': 'g102',
//             'title': 'Group 2',
//             'tasks': [
//                 {
//                     'id': 'c103',
//                     'title': 'Do that',
//                     'archivedAt': 1589983468418,
//                 },
//                 {
//                     'id': 'c104',
//                     'title': 'Help me',
//                     'status': 'in-progress', // monday
//                     'priority': 'high',
//                     'description': 'description',
//                     'comments': [
//                         {
//                             'id': 'ZdPnm',
//                             'txt': 'also @yaronb please CR this',
//                             'createdAt': 1590999817436,
//                             'byMember': {
//                                 '_id': 'u101',
//                                 'fullname': 'Tal Tarablus',
//                                 'imgUrl': 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg'
//                             }
//                         }
//                     ],
//                     'checklists': [
//                         {
//                             'id': 'YEhmF',
//                             'title': 'Checklist',
//                             'todos': [
//                                 {
//                                     'id': '212jX',
//                                     'title': 'To Do 1',
//                                     'isDone': false
//                                 }
//                             ]
//                         }
//                     ],
//                     'memberIds': ['u101'],
//                     'labelIds': ['l101', 'l102'],
//                     'dueDate': 16156215211,
//                     'byMember': {
//                         '_id': 'u101',
//                         'username': 'Tal',
//                         'fullname': 'Tal Tarablus',
//                         'imgUrl': 'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg'
//                     },
//                     'style': {
//                         'bgColor': '#26de81'
//                     }
//                 }
//             ],
//             'style': {}
//         },
//     ],
//     'activities': [
//         {
//             'id': 'a101',
//             'txt': 'Changed Color',
//             'createdAt': 154514,
//             'byMember': {
//                 '_id': 'u101',
//                 'fullname': 'Abi Abambi',
//                 'imgUrl': 'http://some-img'
//             },
//             'task': {
//                 'id': 'c101',
//                 'title': 'Replace Logo'
//             }
//         }
//     ],

//     'cmpsOrder': ['status-picker', 'member-picker', 'date-picker']
// }