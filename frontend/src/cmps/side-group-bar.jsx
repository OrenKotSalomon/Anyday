import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { boardService } from "../services/board.service.local"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { addBoard, removeBoard } from "../store/board.actions"
import { BoardList } from "./board-list"
// import { Modal, ModalContent, ModalFooter, MenuItem, Button } from 'monday-ui-react-core'
import { Modal, Button, Box, Typography } from '@mui/material'

export function SideGroupBar() {

    const [boardToEdit, setBoardToEdit] = useState(boardService.getEmptyBoard())
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()

    function handleChange({ target }) {
        let { value, name: field, type } = target
        setBoardToEdit(prevBoard => {
            return { ...prevBoard, [field]: value }
        })
    }

    async function onAddBoard() {
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

    return <section className='side-group-bar flex'>
        <div className="workspace-select flex">
            <h4>Workspace</h4>
            <span className="workspace">Main Workspace</span>
        </div>
        <button className="btn" onClick={handleOpen}>Add Board</button>
        <Modal
            open={isOpen}
            onClose={handleOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className="add-board-modal">
                <label htmlFor="text">Add Board: </label>
                <input type="text"
                    className="input"
                    name="title"
                    id="title"
                    value={boardToEdit.title}
                    onChange={handleChange}
                    placeholder="Add A New Board" />
                <button className="btn" onClick={onAddBoard}>Add Board</button>
            </Box>
        </Modal>

        <hr style={{ width: '90%' }} />
        <section className="board-list">
            <BoardList onRemoveBoard={onRemoveBoard} />
        </section>

    </section>
}
