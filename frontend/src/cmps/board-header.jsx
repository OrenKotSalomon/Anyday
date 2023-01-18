import { useEffect, useState } from "react";
import { updateBoard } from "../store/board.actions";
import { BoardFilter } from "./board-filter";
import { BoardView } from "./board-view";

export function BoardHeader({ addNewTask, editBoardTitle, board, setBoard }) {
    const [boardToUpdate, setBoardToUpdate] = useState(board)

    return <section className="board-header">

        <BoardView board={board} boardToUpdate={boardToUpdate}
            editBoardTitle={editBoardTitle} setBoardToUpdate={setBoardToUpdate} />
        <BoardFilter board={board} boardToUpdate={boardToUpdate}
            addNewTask={addNewTask} setBoard={setBoard} />
    </section>
}