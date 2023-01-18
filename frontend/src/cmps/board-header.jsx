import { BoardFilter } from "./board-filter";
import { BoardView } from "./board-view";

export function BoardHeader({ title }) {

    return <section className="board-header">

        <BoardView title={title} />
        <BoardFilter />
    </section>
}