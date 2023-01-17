import { BoardGroup } from "../cmps/board-group";
import { BoardHeader } from "../cmps/board-header";


export function BoardDetails({ board }) {
    return <section className="board-details">
        <h1>Board Details</h1>
        <BoardHeader />
        <section className="board-groups-container">
            <BoardGroup />
        </section>
    </section>
}