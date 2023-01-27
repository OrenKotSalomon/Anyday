import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { NavBar } from "../cmps/nav-bar";
import { SideGroupBar } from "../cmps/side-group-bar";
import { BoardHeader } from "../cmps/board-header";
import { handleOnDragEnd, loadBoard } from "../store/board.actions";
import { socketService, SOCKET_EMIT_SET_TOPIC, SOCKET_EVENT_UPDATE_BOARD } from "../services/socket.service";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { StatusesList } from "../cmps/kanban/statuses-list";
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

            <DragDropContext onDragEnd={(res) => handleOnDragEnd(res, { board, statuses: board.statuses })}>
                <Droppable droppableId={board._id} direction='horizontal' type='statuses-list' >
                    {provided =>

                        <section className='main-kanban-container flex'
                            // {...provided.droppableProps}
                            ref={provided.innerRef}>

                            {/* DragHere */}
                            {board.statuses.map((status, idx) =>
                                <Draggable
                                    draggableId={status.id}
                                    key={status.id}
                                    index={idx}
                                >
                                    {provided =>

                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}>

                                            <StatusesList key={status.label} status={status} board={board} provided={provided} />
                                        </div>
                                    }
                                </Draggable>
                            )}
                            {/* DragHere */}

                            {provided.placeholder}
                        </section>
                    }


                </Droppable>
            </DragDropContext>


        </div>
    </section>
}