import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { boardService } from "../services/board.service.local"
import { loadBoards } from "../store/board.actions"

export function BoardList() {

    const boards = useSelector((storeState) => storeState.boardModule.boards)

    useEffect(() => {
        loadBoards()
    }, [])

    if (!boards) return <div>Loading...</div>
    return <section className='board-list'>
        {boards && boards.map(board => <Link key={board._id} to={`/board/${board._id}`}>{board.title}</Link>)}

    </section>

}