import { BoardFilter } from "./board-filter";
import { BoardView } from "./board-view";

export function BoardHeader({ board }) {

    return <section className="board-header">

        <BoardView board={board} />
        <BoardFilter />
    </section>
}