import { GroupList } from "../cmps/group-list";
import { BoardHeader } from "../cmps/board-header";
import { NavBar } from "../cmps/nav-bar";
import { useEffect, useState } from "react";
import { boardService } from "../services/board.service.local";
import { SideGroupBar } from "../cmps/side-group-bar";
import { loadBoards } from "../store/board.actions";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export function BoardDetails() {

    const [board, setBoard] = useState(null)
    const defaultBoard = useSelector((storeState) => storeState.boardModule.boards[0])
    const { boardId } = useParams()

    useEffect(() => {
        if (!boardId) {
            loadBoards().then(() => loadBoard(defaultBoard._id))
        }
        loadBoard(boardId)
    }, [boardId])

    async function loadBoard(boardId) {
        const board = await boardService.getById(boardId)
            setBoard(board)
    }

    if (!board) return <div>Loading...</div>
    return <section className="board-details">
        <div className="nav-container">
            <NavBar />
        </div>
        <div className="side-group-bar-container">
            <SideGroupBar />
        </div>
        <div className="board-container">
            <h1>{board.title}</h1>
            <BoardHeader />
            <section className="groups-container">
                {board.groups.map(group => <GroupList key={group.id} group={group} />)}
            </section>
        </div>
    </section>
}