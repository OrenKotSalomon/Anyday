import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { NavBar } from "../cmps/nav-bar";
import { SideGroupBar } from "../cmps/side-group-bar";
import { BoardHeader } from "../cmps/board-header";
import { handleOnDragEnd, loadBoard, loadBoards } from "../store/board.actions";
import { socketService, SOCKET_EMIT_SET_TOPIC, SOCKET_EVENT_UPDATE_BOARD } from "../services/socket.service";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { StatusesList } from "../cmps/kanban/statuses-list";
import { Loader } from 'monday-ui-react-core';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, RadialLinearScale } from 'chart.js';
import { Doughnut, PolarArea, Pie, Line, Bar } from 'react-chartjs-2';
import { Icon } from 'monday-ui-react-core';
import { Board, Group, Note } from 'monday-ui-react-core/icons';
import { LineChart } from "../cmps/charts/line-chart.jsx";
import { HorizontalChart } from "../cmps/charts/horizontal-chart.jsx";
import { RadarChart } from "../cmps/charts/radar-chart";


ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export function Dashboard() {

    const { boardId } = useParams()
    const board = useSelector((storeState) => storeState.boardModule.board)
    const boards = useSelector((storeState) => storeState.boardModule.boards)
    const [groups, setGroups] = useState([])
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        loadBoards()
        loadBoard(boardId)
        loadCounts(boards)
    }, [boardId])

    function loadCounts(boards) {
        let groups = []
        let tasks = []
        boards.forEach(board =>
            board.groups.forEach(group => {
                groups.push(group)
                group.tasks.forEach(task => tasks.push(task))
            }))
        setGroups(groups)
        setTasks(tasks)
    }

    function getStatusesMap() {
        const statusMap = []
        board.groups.forEach(group =>
            group.tasks.forEach(task =>
                statusMap.push(task.status.charAt(0).toUpperCase() + task.status.slice(1))))

        return statusMap.reduce((acc, val) => {
            acc[val] = acc[val] ? ++acc[val] : 1
            return acc
        }, {})
    }


    function getPriorityMap() {
        const priorityMap = []
        board.groups.forEach(group =>
            group.tasks.forEach(task =>
                priorityMap.push(task.status.charAt(0).toUpperCase() + task.status.slice(1))))

        return priorityMap.reduce((acc, val) => {
            acc[val] = acc[val] ? ++acc[val] : 1
            return acc
        }, {})
    }

    const statusesMap = getStatusesMap()
    const priorityMap = getPriorityMap()

    // const data = {
    //     labels: Object.keys(statusesMap),
    //     datasets: [
    //         {
    //             label: 'Tasks',
    //             data: Object.values(statusesMap),
    //             backgroundColor: [
    //                 'rgba(255, 99, 132, 0.2)',
    //                 'rgba(54, 162, 235, 0.2)',
    //                 'rgba(255, 206, 86, 0.2)',
    //                 'rgba(75, 192, 192, 0.2)',
    //                 'rgba(153, 102, 255, 0.2)',
    //                 'rgba(255, 159, 64, 0.2)',
    //                 'rgba(269, 140, 205, 0.5)',
    //             ],
    //             borderColor: [
    //                 'rgba(255, 99, 132, 0.5)',
    //                 'rgba(54, 162, 235, 0.5)',
    //                 'rgba(255, 206, 86, 0.5)',
    //                 'rgba(75, 192, 192, 0.5)',
    //                 'rgba(153, 102, 255, 0.5)',
    //                 'rgba(255, 159, 64, 0.5)',
    //                 'rgba(269, 140, 205, 0.5)',
    //             ],
    //             borderWidth: 2,
    //         },
    //     ],
    // };

    const data = {
        labels: Object.keys(statusesMap),
        datasets: [
            {
                label: 'Tasks',
                data: Object.values(statusesMap),
                backgroundColor: [
                    'rgb(196, 196, 196)',
                    'rgb(0, 200, 117)',
                    'rgb(226, 68, 92)',
                    'rgb(253, 171, 61)'
                ],
                hoverOffset: 4
            },
        ],
    };


    const priorityData = {
        labels: Object.keys(priorityMap),
        datasets: [
            {
                label: 'priorities',
                data: Object.values(priorityMap),
                backgroundColor: [
                    'rgba(196, 196, 196, 1)',
                    'rgba(87, 155, 252, 1)',
                    'rgba(85, 89, 223, 1)',
                    'rgba(64, 22, 148, 1)',
                    'rgba(51, 51, 51, 1)'
                ],
                hoverOffset: 5
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

                <div className="dashboard-cards-container">
                    <div className="card-boards">
                        <div className="card-icon">
                            <Icon iconType={Icon.type.SVG} icon={Board} iconSize={22} />
                        </div>
                        <div className="dash-board-card-counter">{boards && boards.length}</div>
                        <div className="dash-board-card-counter-by">Boards</div>
                    </div>
                    <div className="card-groups">
                        <div className="card-icon">
                            <Icon iconType={Icon.type.SVG} icon={Group} iconSize={22} />
                        </div>
                        <div className="dash-board-card-counter">{groups && groups.length}</div>
                        <div className="dash-board-card-counter-by">Groups</div>
                    </div>
                    <div className="card-tasks">
                        <div className="card-icon">
                            <Icon iconType={Icon.type.SVG} icon={Note} iconSize={22} />
                        </div>
                        <div className="dash-board-card-counter">{tasks && tasks.length}</div>
                        <div className="dash-board-card-counter-by">Tasks</div>
                    </div>
                </div>

                <h1 className="dashboard-second-line-header">Status Summary</h1>
                <div className="dashboard-second-line">

                    <div className="dashboard-status-line">
                        <LineChart />
                    </div>

                    <div className="dashboard-status-polar">
                        <Pie data={data} />
                    </div>
                </div>

                <div className="dashboard-second-line">

                    <div className="dashboard-status-line">
                        <HorizontalChart />
                    </div>

                    <div className="dashboard-status-polar">
                        <RadarChart priorityData={priorityData} />
                    </div>
                </div>




            </section>


        </div>

    </section>
}