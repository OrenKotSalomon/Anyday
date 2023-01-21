import { GroupList } from "../cmps/group-list";
import { BoardHeader } from "../cmps/board-header";
import { NavBar } from "../cmps/nav-bar";
import { Fragment, useEffect, useRef, useState } from "react";
import { ADD_GROUP_FROM_BUTTOM, boardService } from "../services/board.service.local";
import { SideGroupBar } from "../cmps/side-group-bar";
import { loadBoard, loadBoards, updateBoard, updateGroup } from "../store/board.actions";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Loader, Icon } from 'monday-ui-react-core';
import { Add } from 'monday-ui-react-core/icons';
import { DynamicModal } from "../cmps/dynamic-modal";

export function BoardDetails() {
    const board = useSelector((storeState) => storeState.boardModule.board)
    const { boardId } = useParams()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [cmp, setCmp] = useState({})

    const boardContainer = useRef()

    useEffect(() => {
        loadBoard(boardId)
    }, [boardId])

    function openModal(ev, task, info) {
        let labelPos = ev.target.getBoundingClientRect()
        let bbb = boardContainer.current.getBoundingClientRect()
        console.log(labelPos);
        console.log(bbb.top);
        console.log(document.body.scrollLeft);

        setIsModalOpen(true)

        // statuses memebers should go on board obj ?
        switch (info) {
            case 'status-picker':
                return setCmp(prev => {
                    return {
                        ...prev,
                        pos: { top: labelPos.top, left: labelPos.left },
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
                return setCmp(prev => {
                    return {
                        ...prev,
                        type: 'member-picker',
                        pos: { top: labelPos.top, left: labelPos.left },
                        info: {
                            selectedMembers: ['m1', 'm2'],
                            members: task.members
                        }
                    }
                })
            case 'date-picker':
                return

        }
    }

    if (!board) return <div className="loader"><Loader size={Loader.sizes.LARGE} /></div>
    return <section className="board-details">
        <NavBar />
        <SideGroupBar />
        {board && <div className="board-container">
            <BoardHeader
                board={board}
            />
            <section ref={boardContainer} className="groups-container">
                {board.groups.map(group => <GroupList key={group.id} board={board} group={group} openModal={openModal} />)}
            </section>
            {isModalOpen && <DynamicModal cmp={cmp} setIsModalOpen={setIsModalOpen} />}
            <button className="btn clean buttom-add-group-btn"
            onClick={() => updateGroup(board, null, ADD_GROUP_FROM_BUTTOM)}>
                <Icon iconType={Icon.type.SVG} icon={Add} iconSize={19} /> Add  new group</button>
        </div>}
    </section>
}