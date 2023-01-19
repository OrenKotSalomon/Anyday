import { GroupList } from "../cmps/group-list";
import { BoardHeader } from "../cmps/board-header";
import { NavBar } from "../cmps/nav-bar";
import { useEffect, useState } from "react";
import { boardService } from "../services/board.service.local";
import { SideGroupBar } from "../cmps/side-group-bar";
import { loadBoard, loadBoards, updateBoard } from "../store/board.actions";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Loader } from 'monday-ui-react-core'

export function BoardDetails() {
    const board = useSelector((storeState) => storeState.boardModule.board)

    const { boardId } = useParams()

    useEffect(() => {
        loadBoard(boardId)
    }, [boardId])

    if (!board) return <div className="loader"><Loader size={Loader.sizes.LARGE} /></div>
    return <section className="board-details">
        <NavBar />
        <SideGroupBar />
        {board && <div className="board-container">
            <BoardHeader
                board={board}
            />
            <section className="groups-container">
                {board.groups.map(group => <GroupList key={group.id} board={board} group={group} />)}
            </section>
        </div>}
    </section>
}