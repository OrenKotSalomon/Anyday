import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { boardService } from "../services/board.service.local"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { addBoard, duplicateBoard, removeBoard } from "../store/board.actions"
import { BoardList } from "./board-list"
// import { Modal, ModalContent, ModalFooter, MenuItem, Button } from 'monday-ui-react-core'
import { Modal, Box } from '@mui/material'
import { Icon } from 'monday-ui-react-core'
import { Add, Filter, Search, Bolt, DropdownChevronRight, DropdownChevronLeft } from 'monday-ui-react-core/icons'

export function SideGroupBar() {

    const [boardToEdit, setBoardToEdit] = useState(boardService.getEmptyBoard())
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSideBarOpen, setIsSideBarOpen] = useState(false)
    const navigate = useNavigate()

    function handleChange({ target }) {
        let { value, name: field, type } = target
        setBoardToEdit(prevBoard => {
            return { ...prevBoard, [field]: value }
        })
    }

    async function onAddBoard() {
        if (!boardToEdit.title) return
        try {
            const savedBoard = await addBoard(boardToEdit)
            setBoardToEdit(boardService.getEmptyBoard())
            setIsModalOpen(!isModalOpen)
            navigate(`/board/${savedBoard._id}`)
            showSuccessMsg(`Board added (id: ${savedBoard._id})`)
        } catch (err) {
            showErrorMsg('Cannot Add Board', err)
        }
    }

    async function onDuplicateBoard(board) {
        await duplicateBoard(board)
        try {
            showSuccessMsg(`Board Duplicated`)
        } catch (err) {
            showErrorMsg('Cannot Remove Board', err)
        }
    }

    async function onRemoveBoard(boardId) {
        await removeBoard(boardId)
        try {
            showSuccessMsg(`Board Removed`)
        } catch (err) {
            showErrorMsg('Cannot Remove Board', err)
        }
    }

    function handleOpen() {
        setIsModalOpen(!isModalOpen)
    }

    function toggleSideBar() {
        setIsSideBarOpen(!isSideBarOpen)
    }

    return <div>
        {!isSideBarOpen && <div className="side-group-bar closed">
            <button className="open-side-bar-btn"
                onClick={() => toggleSideBar()} >
                <Icon iconType={Icon.type.SVG} icon={DropdownChevronRight} iconSize={19} />
            </button>
        </div>}
        {isSideBarOpen && <section className='side-group-bar flex'>
            <div className="workspace-select flex">
                <button className="close-side-bar-btn"
                    onClick={() => toggleSideBar()} >
                    <Icon iconType={Icon.type.SVG} icon={DropdownChevronLeft} iconSize={19} />
                </button>
                <h4>Workspace</h4>
                <span className="workspace">Main Workspace</span>
            </div>
            <div className="side-board-btn-container flex column">
                <button className="add-board-btn btn clean"
                    onClick={handleOpen}>
                    <Icon iconType={Icon.type.SVG} icon={Add} iconSize={19} /> Add
                </button>
                <button className="add-board-btn btn clean"
                    onClick={handleOpen}>
                    <Icon iconType={Icon.type.SVG} icon={Filter} iconSize={19} /> Filter
                </button>
                <input
                    type="text"
                    className="input search-board-input"
                    placeholder="Search"
                />
                <Icon className="input-search-icon" iconType={Icon.type.SVG} icon={Search} iconSize={19} />
                <Icon className="input-bolt-icon" iconType={Icon.type.SVG} icon={Bolt} iconSize={19} />
            </div>
            <Modal
                open={isModalOpen}
                onClose={handleOpen}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="add-board-modal">
                    <div className="modal-header flex">Create Board <span onClick={handleOpen} className="close-add-board-modal">X</span></div>
                    <label htmlFor="text">Board Name: </label>
                    <input type="text"
                        className="input"
                        name="title"
                        id="title"
                        value={boardToEdit.title}
                        onChange={handleChange}
                        placeholder="New Board Name" />
                    <div className="btn-container">
                        <button className="btn clean" onClick={handleOpen}>Cancel</button>
                        <button className="btn" onClick={onAddBoard}>Create Board</button>
                    </div>
                </Box>
            </Modal>

            <hr style={{ width: '90%' }} />
            <section className="board-list">
                <BoardList onDuplicateBoard={onDuplicateBoard} onRemoveBoard={onRemoveBoard} />
            </section>

        </section>}
    </div>
}
