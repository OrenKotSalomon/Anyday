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
import { Chart as ChartJS, ArcElement, Tooltip, Legend, RadialLinearScale } from 'chart.js';
import { Doughnut, PolarArea } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export function Dashboard() {

    const { boardId } = useParams()
    const board = useSelector((storeState) => storeState.boardModule.board)

    useEffect(() => {
        loadBoard(boardId)
    }, [boardId])

    function getStatuses() {
        
    }

    const data = {
        labels: ['name', 'description', 'description', 'description'],
        datasets: [
            {
                label: 'Status Summary',
                data: [5, 8, 6, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(269, 140, 205, 0.5)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(269, 140, 205, 0.5)',
                ],
                borderWidth: 2,
            },
        ],
    };


    if (!board.groups || !board) return <div className="loader"><Loader size={Loader.sizes.LARGE} /></div>
    return <section className='board-details'>
        <NavBar />
        <SideGroupBar />
        <div className="board-container">
            <BoardHeader board={board} />
            <section className="dashboard">

                <div style={{ width: '40%', margin: 'auto' }}>
                    <h1>Status Summary</h1>
                    <Doughnut data={data} />
                </div>

            </section>


        </div>

    </section>
}