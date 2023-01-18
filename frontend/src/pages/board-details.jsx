import { GroupList } from "../cmps/group-list";
import { BoardHeader } from "../cmps/board-header";
import { NavBar } from "../cmps/nav-bar";
import { useEffect, useState } from "react";
import { boardService } from "../services/board.service.local";
import { SideGroupBar } from "../cmps/side-group-bar";
import { loadBoards, updateBoard } from "../store/board.actions";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SelectBoard } from "../cmps/select-board";

export function BoardDetails() {

    const [board, setBoard] = useState(null)
    const defaultBoard = useSelector((storeState) => storeState.boardModule.boards[0])
    const { boardId } = useParams()

    useEffect(() => {
        if (!boardId) getDefaultBoard()
        else loadBoard(boardId)
    }, [boardId])

    async function getDefaultBoard() {
        await loadBoards()
        if (defaultBoard) loadBoard(defaultBoard._id)
    }

    async function loadBoard(boardId) {
        const board = await boardService.getById(boardId)
        setBoard(board)
    }

    function addNewTask(boardToUpdate) {

        updateBoard(boardToUpdate)
    }

    function editBoardTitle(boardToUpdate) {

        updateBoard(boardToUpdate)

    }

    if (!board) return <div>Loading...</div>
    return <section className="board-details">
        <NavBar />
        <SideGroupBar />
        {!boardId && <SelectBoard />}
        {boardId && <div className="board-container">
            <BoardHeader
                addNewTask={addNewTask} editBoardTitle={editBoardTitle}
                board={board} />
            <section className="groups-container">
                {board.groups.map(group => <GroupList key={group.id} board={board} group={group} />)}
            </section>
        </div>}
    </section>
}