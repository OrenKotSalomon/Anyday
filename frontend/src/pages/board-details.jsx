import { GroupList } from "../cmps/group-list";
import { BoardHeader } from "../cmps/board-header";
import { NavBar } from "../cmps/nav-bar";
import { useEffect, useState } from "react";
import { boardService } from "../services/board.service.local";

export function BoardDetails() {

    const [board, setBoard] = useState(null)

    useEffect(() => {
        // boardService.createDemoBoard()
        loadBoard()
    }, [])

    async function loadBoard() {
        const boardFromStorage = await boardService.query()
        setBoard(boardFromStorage[0])
    }

    if (!board) return <div>Loading...</div>
    return <section className="board-details">
        <div className="nav-container">
            <NavBar />
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