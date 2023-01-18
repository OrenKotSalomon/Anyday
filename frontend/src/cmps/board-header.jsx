import { BoardFilter } from "./board-filter";
import { BoardView } from "./board-view";
import { EditableHeading } from 'monday-ui-react-core'

export function BoardHeader({ title }) {

    return <section className="board-header">
        <EditableHeading
            brandFont
            value={title}
        />
        <BoardView />
        <BoardFilter />
    </section>
}