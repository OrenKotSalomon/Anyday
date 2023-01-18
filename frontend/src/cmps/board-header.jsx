import { useState } from "react";
import { updateBoard } from "../store/board.actions";
import { BoardFilter } from "./board-filter";
import { BoardView } from "./board-view";

export function BoardHeader({ addNewTask, editBoardTitle, board }) {
    const [boardToUpdate, setBoardToUpdate] = useState(board)

    return <section className="board-header">

        <BoardView boardToUpdate={boardToUpdate} editBoardTitle={editBoardTitle} setBoardToUpdate={setBoardToUpdate} />
        <BoardFilter boardToUpdate={boardToUpdate} addNewTask={addNewTask} setBoardToUpdate={setBoardToUpdate} />
    </section>
}