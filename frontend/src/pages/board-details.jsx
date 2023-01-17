import { GroupList } from "../cmps/group-list";
import { BoardHeader } from "../cmps/board-header";
import { NavBar } from "../cmps/nav-bar";

export function BoardDetails({ board, groups }) {
    return <section className="board-details">
        <NavBar />
        <h1>Board Details</h1>
        <BoardHeader />
        <section className="groups-container">
             <GroupList />
        </section>
    </section>
}