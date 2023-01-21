import { GroupList } from "../cmps/group-list";
import { BoardHeader } from "../cmps/board-header";
import { NavBar } from "../cmps/nav-bar";
import { Fragment, useEffect, useState } from "react";
import { boardService } from "../services/board.service.local";
import { SideGroupBar } from "../cmps/side-group-bar";
import { loadBoard, loadBoards, updateBoard } from "../store/board.actions";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Loader } from 'monday-ui-react-core';
import { DynamicModal } from "../cmps/dynamic-modal";

export function BoardDetails() {
    const board = useSelector((storeState) => storeState.boardModule.board)
    const { boardId } = useParams()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [cmp, setCmp] = useState({})

    useEffect(() => {
        loadBoard(boardId)
    }, [boardId])
    function openModal(ev, task, info) {
        let ssss = ev.target.getBoundingClientRect()
        console.log(ssss);
        console.log(ev.target.offsetLeft);
        console.log(ev.target.offsetTop);
        setIsModalOpen(true)

        // statuses memebers should go on board obj ?
        switch (info) {
            case 'status-picker':
                return setCmp(prev => {
                    return {
                        ...prev,
                        type: info,
                        statuses: [
                            {
                                label: 'done',
                                bgColor: '#00c875'
                            },
                            {
                                label: 'working on it',
                                bgColor: '#fdab3d'
                            },
                            {
                                label: 'stuck',
                                bgColor: '#e2445c'
                            },
                            {
                                label: '',
                                bgColor: '#c4c4c4'
                            },
                        ]
                    }
                })
            case 'member-picker':
                return
            case 'date-picker':
                return

        }
    }

    if (!board) return <div className="loader"><Loader size={Loader.sizes.LARGE} /></div>
    return (
        <Fragment>
            <section className="board-details">

                <NavBar />

                <SideGroupBar />

                {board && <div className="board-container">
                    <BoardHeader
                        board={board}
                    />
                    <section className="groups-container">
                        {board.groups.map(group => <GroupList key={group.id} board={board} group={group} openModal={openModal} />)}
                    </section>
                    {isModalOpen && <DynamicModal cmp={cmp} setIsModalOpen={setIsModalOpen} />}
                </div>}
            </section>
        </Fragment>
    )
}