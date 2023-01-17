import { GroupList } from "../cmps/group-list";
import { BoardHeader } from "../cmps/board-header";
import { NavBar } from "../cmps/nav-bar";
import { useEffect } from "react";
import { boardService } from "../services/board.service.local";

export function BoardDetails({ board, groups }) {

    useEffect(() => {
        boardService.createDemoBoard()
    })
    
    return <section className="board-details">
        <div className="nav-container">
            <NavBar />
        </div>
        <div className="board-container">
            <h1>Board Title</h1>
            <BoardHeader />
            <section className="groups-container">
                <GroupList />
            </section>
        </div>
    </section>
}