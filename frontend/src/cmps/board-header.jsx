import { BoardFilter } from "./board-filter";
import { BoardView } from "./board-view";

export function BoardHeader() {

    return <section className="board-header">
        <BoardView />
        <BoardFilter />
    </section>
}