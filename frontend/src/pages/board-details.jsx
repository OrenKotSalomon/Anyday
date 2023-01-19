import { GroupList } from "../cmps/group-list";
import { BoardHeader } from "../cmps/board-header";
import { NavBar } from "../cmps/nav-bar";
import { useEffect, useState } from "react";
import { boardService } from "../services/board.service.local";
import { SideGroupBar } from "../cmps/side-group-bar";
import { loadBoard, loadBoards, updateBoard } from "../store/board.actions";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SelectBoard } from "../cmps/select-board";
import { Loader } from 'monday-ui-react-core'


export function BoardDetails() {

    const board = useSelector((storeState) => storeState.boardModule.board)
    const boards = useSelector((storeState) => storeState.boardModule.boards)
    // const boards = useSelector((storeState) => storeState.boardModule.boards)
    // const [gBoard, setgBoard] = useState(null)
    // const defaultBoard = useSelector((storeState) => storeState.boardModule.boards[0])
    const { boardId } = useParams()

    useEffect(() => {
        loadBoard(boardId)
    }, [boardId, boards])

    // function addNewTask(newTask) {
    //     setgBoard(prevBoard => {
    //         const isFinished = prevBoard.groups[0].tasks.some(task => task.id === newTask.id)
    //         if (isFinished) return { ...prevBoard }
    //         return { ...prevBoard, board: prevBoard.groups[0].tasks.unshift(newTask) }
    //     })
    //     updateBoard(board)
    // }

    // async function editBoardTitle(boardToUpdate) {
    //     try {
    //         const savedBoard = await updateBoard(boardToUpdate)
    //         console.log('savedBoard', savedBoard);
    //         console.log('mainboard', board);
    //     } catch (error) {

    //     }
    // }

    if (!board) return <div className="loader"><Loader size={Loader.sizes.LARGE}/></div>
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