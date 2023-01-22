import { useRef, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { boardService } from "../services/board.service.local"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { addBoard, duplicateBoard, removeBoard } from "../store/board.actions"
import { BoardList } from "./board-list"
// import { Modal, ModalContent, ModalFooter, MenuItem, Button } from 'monday-ui-react-core'
import { Modal, Box } from '@mui/material'
import { Icon } from 'monday-ui-react-core'
import { Add, Filter, Search, Bolt, DropdownChevronRight, DropdownChevronLeft, CloseSmall } from 'monday-ui-react-core/icons'

export function SideGroupBar() {

    const [boardToEdit, setBoardToEdit] = useState(boardService.getEmptyBoard())
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSideBarOpen, setIsSideBarOpen] = useState(false)
    const navigate = useNavigate()
    const sideBar = useRef()

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

        <section className={`side-group-bar ${isSideBarOpen ? '' : 'closed'} flex`}>
            <div className="workspace-select flex" style={{ opacity: '1' }}>
                <div className={`close-side-bar-btn ${isSideBarOpen ? '' : 'closed-btn'} `}
                    onClick={() => toggleSideBar()} >

                    <Icon iconType={Icon.type.SVG} ignoreFocusStyle={true} icon={DropdownChevronLeft} iconSize={19} />

                </div>
                <h4 className="workspace-header" style={{ display: `${isSideBarOpen ? '' : 'none'}` }}  >Workspace</h4>
                <span className="workspace" style={{ display: `${isSideBarOpen ? '' : 'none'}` }} >Main workspace</span>
            </div>
            <div className="side-board-btn-container flex column" style={{ display: `${isSideBarOpen ? '' : 'none'}` }}>
                <button className="add-board-btn btn clean"
                    onClick={handleOpen}>
                    <Icon iconType={Icon.type.SVG} icon={Add} iconSize={19} /> Add
                </button>
                <button className="add-board-btn btn clean"
                    onClick={handleOpen}>
                    <Icon iconType={Icon.type.SVG} icon={Filter} iconSize={19} /> Filters
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
                <span onClick={handleOpen} className="close-add-board-modal"><Icon className="input-bolt-icon" iconType={Icon.type.SVG} icon={CloseSmall} iconSize={19} /></span>
                    <div className="modal-header flex">Create Board </div>
                    <div className="add-board-label-and-input-container flex column">
                        <label htmlFor="text">Board Name </label>
                        <input type="text"
                            className="input"
                            name="title"
                            id="title"
                            value={boardToEdit.title}
                            onChange={handleChange}
                            placeholder="New Board Name" />
                    </div>
                    <div className="btn-container">
                        <button className="btn clean" onClick={handleOpen}>Cancel</button>
                        <button className="btn" onClick={onAddBoard}>Create Board</button>
                    </div>
                </Box>
            </Modal>

            {/* <hr style={{ width: '90%', display: `${isSideBarOpen ? '' : 'none'}` }} /> */}
            <div className="spacer" style={{ display: `${isSideBarOpen ? '' : 'none'}` }} ></div>
            <section className="board-list" style={{ display: `${isSideBarOpen ? '' : 'none'}` }}>
                <BoardList onDuplicateBoard={onDuplicateBoard} onRemoveBoard={onRemoveBoard} />
            </section>

        </section>
    </div>
}
