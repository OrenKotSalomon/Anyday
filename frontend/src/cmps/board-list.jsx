import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

export function BoardList() {
    const boards = useSelector((storeState) => storeState.boardModule.boards)
return <section className='board-list'>
{boards && boards.map(board => <Link to={`/board/${board._id}`}>{board.title}</Link> )}

</section>

}