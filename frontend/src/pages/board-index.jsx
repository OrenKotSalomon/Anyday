import { useState } from 'react'
import noBoards from '../assets/img/noBoards.png'
import { NavBar } from '../cmps/nav-bar'
import { SideGroupBar } from '../cmps/side-group-bar'
import { DialogContentContainer, DatePicker } from 'monday-ui-react-core'

export function BoardIndex() {

  const [date, setDate] = useState({})

  return <section className='board-details'>
    <NavBar />
    <SideGroupBar />
    <div className="select-board">
      <img src={noBoards} />
      <h1>First Create Or Select Board</h1>
    </div>

  </section>

}