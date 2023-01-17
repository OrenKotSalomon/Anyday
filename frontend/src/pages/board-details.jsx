import { GroupList } from "../cmps/group-list";
import { BoardHeader } from "../cmps/board-header";
import { NavBar } from "../cmps/nav-bar";
import { useEffect, useState } from "react";
import { boardService } from "../services/board.service.local";
import { SideGroupBar } from "../cmps/side-group-bar";
import { loadBoards as loadBoards } from "../store/board.actions";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export function BoardDetails() {

    // const [board, setBoard] = useState(null)
    const board = useSelector((storeState) => storeState.boardModule.boards[0])
    const { boardId } = useParams()
    useEffect(() => {
        // boardService.createDemoBoard()
        console.log('boardId:', boardId)
        loadBoards()
    }, [])

    // async function loadBoard() {
    //     const boardFromStorage = await boardService.query()
    //     console.log('boardFromStorage:', boardFromStorage)
    //     setBoard(boardFromStorage[0])
    // }

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