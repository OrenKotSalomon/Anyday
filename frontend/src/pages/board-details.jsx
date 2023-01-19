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

export function BoardDetails() {

    const board = useSelector((storeState) => storeState.boardModule.board)
    // const boards = useSelector((storeState) => storeState.boardModule.boards)
    // const [gBoard, setgBoard] = useState(null)
    // const defaultBoard = useSelector((storeState) => storeState.boardModule.boards[0])
    const { boardId } = useParams()

    useEffect(() => {
        loadBoard(boardId)
    }, [])

    // function addNewTask(newTask) {
    //     setgBoard(prevBoard => {
    //         const isFinished = prevBoard.groups[0].tasks.some(task => task.id === newTask.id)
    //         if (isFinished) return { ...prevBoard }
    //         return { ...prevBoard, board: prevBoard.groups[0].tasks.unshift(newTask) }
    //     })
    //     updateBoard(board)
    // }

    function editBoardTitle(boardToUpdate) {
        updateBoard(boardToUpdate)
    }

    if (!board) return <div>Loading...</div>
    return <section className="board-details">
        <NavBar />
        <SideGroupBar />
        {board && <div className="board-container">
            {/* <BoardHeader
                addNewTask={addNewTask} editBoardTitle={editBoardTitle}
                board={board} setBoard={setgBoard}
                 /> */}
            <section className="groups-container">
                {board.groups.map(group => <GroupList key={group.id} board={board} group={group} />)}
            </section>
        </div>}
    </section>
}