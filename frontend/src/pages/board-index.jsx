import noBoards from '../assets/img/noBoards.png'
import { NavBar } from '../cmps/nav-bar'
import { SideGroupBar } from '../cmps/side-group-bar'

export function BoardIndex() {

 

    return <section className='board-details'>
        <NavBar />
        <SideGroupBar />
        <div className="select-board">
        <img src={noBoards} />
        <h1>First Create Or Select Board</h1>
        </div>
    </section>

}