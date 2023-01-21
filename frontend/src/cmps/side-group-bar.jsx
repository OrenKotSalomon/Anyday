import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { boardService } from "../services/board.service.local"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { addBoard, duplicateBoard, removeBoard } from "../store/board.actions"
import { BoardList } from "./board-list"
// import { Modal, ModalContent, ModalFooter, MenuItem, Button } from 'monday-ui-react-core'
import { Modal, Box } from '@mui/material'
import { Button } from 'monday-ui-react-core'
import { Add } from 'monday-ui-react-core/icons'

export function SideGroupBar() {

    const [boardToEdit, setBoardToEdit] = useState(boardService.getEmptyBoard())
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()
    console.log(boardToEdit);
    function handleChange({ target }) {
        let { value, name: field, type } = target
        setBoardToEdit(prevBoard => {
            return { ...prevBoard, [field]: value }
        })
    }

    async function onAddBoard() {
        if (!boardToEdit.title) return
        const savedBoard = await addBoard(boardToEdit)
        try {
            setBoardToEdit(boardService.getEmptyBoard())
            setIsOpen(!isOpen)
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
        setIsOpen(!isOpen)
    }

    return <div className='side-group-bar-container'><section className='side-group-bar flex'>
        <div className="workspace-select flex">
            <h4>Workspace</h4>
            <span className="workspace">Main Workspace</span>
        </div>
        <button className="add-board-btn btn clean" onClick={handleOpen}><span>+</span> Add</button>
        <Modal
            open={isOpen}
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

    </section>
    </div>
}
