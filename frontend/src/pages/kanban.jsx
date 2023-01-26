import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { NavBar } from "../cmps/nav-bar";
import { SideGroupBar } from "../cmps/side-group-bar";
import { BoardHeader } from "../cmps/board-header";
import { loadBoard } from "../store/board.actions";
import { socketService, SOCKET_EMIT_SET_TOPIC, SOCKET_EVENT_UPDATE_BOARD } from "../services/socket.service";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { LabelList } from "../cmps/kanban/label-list";
import { Loader } from 'monday-ui-react-core';


export function Kanban() {

    const { boardId } = useParams()
    const board = useSelector((storeState) => storeState.boardModule.board)

    useEffect(() => {
        loadBoard(boardId)
        // socketService.on(SOCKET_EVENT_UPDATE_BOARD, loadBoard)
        // socketService.emit(SOCKET_EMIT_SET_TOPIC, boardId)
        // return () => {
        //     socketService.off(SOCKET_EVENT_UPDATE_BOARD, loadBoard)
        // }
    }, [boardId])

    if (!board.groups || !board) return <div className="loader"><Loader size={Loader.sizes.LARGE} /></div>

    return <section className="board-details">
        <NavBar />
        <SideGroupBar />
        <div className="board-container">
            <BoardHeader board={board} />
        {board && <section className='main-kanban-container flex'>

            <DragDropContext>

                {/* <Droppable> */}
                    {board.statuses.map(status => <LabelList key={status.label} status={status} />)}

                {/* </Droppable> */}

            </DragDropContext>


        </section>}

        </div>
    </section>
}