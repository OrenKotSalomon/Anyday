import { useState } from "react"
import { Navigate } from "react-router-dom"
import { boardService } from "../services/board.service.local"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { addBoard } from "../store/board.actions"
import { BoardList } from "./board-list"

export function SideGroupBar() {

    const [boardToEdit, setBoardToEdit] = useState(boardService.getEmptyBoard())

    function handleChange({ target }) {
        let { value, name: field, type } = target
        setBoardToEdit(prevBoard => {
            return { ...prevBoard, [field]: value }
        })
    }

    async function onAddBoard() {
        const savedBoard = await addBoard(boardToEdit)
        try {
            showSuccessMsg(`Board added (id: ${savedBoard._id})`)
        } catch (err) {
            showErrorMsg('Cannot add Toy', err)
        }
    }

    return <section className='side-group-bar flex'>
        <div className="workspace-select flex">
            <h4>Workspace</h4>
            <span className="workspace">Main Workspace</span>
        </div>
        <label htmlFor="text">Add Board: </label>
        <input type="text"
            name="title"
            id="title"
            value={boardToEdit.title}
            onChange={handleChange}
            placeholder="Add A New Board" />
        <button onClick={onAddBoard}>Add Board</button>
        <hr style={{width: '90%'}} />
        <section className="board-list">
            <BoardList />
        </section>
    </section>

}