import { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

import { BoardFilter } from "./board-filter";
import { BoardView } from "./board-view";

import { MenuButton, Menu, Icon, MenuItem } from 'monday-ui-react-core'
import { MoveArrowLeft, Search, Filter, Board } from 'monday-ui-react-core/icons'
import { useSelector } from "react-redux";
import { loadBoards } from "../store/board.actions";
import { useDispatch } from "react-redux";
import { boardService } from "../services/board.service.local";
import { utilService } from "../services/util.service";

export function BoardHeader({ board, onSetFilterBy }) {
    const [isFilterOn, setIsFilterOn] = useState(false)
    const navigate = useNavigate()
    const boards = useSelector((storeState) => storeState.boardModule.boards)
    const [filterBy, setfilterBy] = useState(boardService.getDefaultFilter())
    // need to clean filter with mobile and desktop app
    onSetFilterBy = useRef(utilService.debounce(onSetFilterBy))

    useEffect(() => {
        loadBoards()
    }, [])

    useEffect(() => {

        onSetFilterBy.current(filterBy)
    }, [filterBy]);

    function handleChange({ target }) {
        let { value, name: field, type } = target

        setfilterBy(prev => ({ ...prev, [field]: value }))
    }

    return <Fragment>

        <div className="header-mobile">

            <button className="home-mobile-btn">
                <Icon iconType={Icon.type.SVG}
                    onClick={() => navigate('/')}
                    icon={MoveArrowLeft} iconLabel="my bolt svg icon" iconSize={16} />
            </button>
            <div className="board-title-mobile">
                <div className="title-mobile-txt">
                    {board.title}
                </div>
            </div>
            <div className="menu-btn-mobile-header">

                <MenuButton className="group-list-menu-btn" >
                    <Menu
                        id="menu"
                        size="medium"
                    >
                        {
                            boards.map((board, idx) => {
                                return <MenuItem
                                    key={idx}
                                    icon={Board}
                                    iconType="SVG"
                                    onClick={() => navigate(`/board/${board._id}`)}
                                    title={board.title}
                                />
                            })
                        }

                    </Menu>
                </MenuButton>
            </div>

        </div>

        <div className="mobile-header-filter">
            <div className="mobile-view-select" style={{ display: isFilterOn ? `none` : `block` }}>
                <select className="mobile-select-header" name="view" id="view">
                    <option value="main">
                        Main table
                    </option>
                    <option value="kanban">
                        Kanban
                    </option>

                </select>
            </div>

            <div className="mobile-fitler-container" style={{ display: isFilterOn ? `none` : `block` }}>

                <Icon iconType={Icon.type.SVG} ignoreFocusStyle={true} icon={Filter} iconLabel="my bolt svg icon" iconSize={16} />
                Filter
            </div>
            <div className="search-mobile-container">
                <div className="icon-container " style={{ display: isFilterOn ? `none` : `block` }}>

                    <Icon onClick={() => setIsFilterOn(!isFilterOn)}

                        iconType={Icon.type.SVG} icon={Search} iconLabel="my bolt svg icon" iconSize={20} />
                </div>
                <div className="input-slider-mobile" style={{ left: isFilterOn ? `0px` : `400px` }}>
                    <button onClick={() => setIsFilterOn(false)} className="cancel-filter"

                        style={{ display: isFilterOn ? `block` : `none` }}>Cancel</button>

                    <input className="mobile-input-filter"
                        onChange={handleChange}
                        placeholder="Search Board"
                        type="text" name="title" id="title" />
                </div>

            </div>

        </div>

        <section className="board-header">

            <div className="board-header-main-container">
                <BoardView board={board}
                />
                <div className="spacer-header"></div>
                <BoardFilter
                    onSetFilterBy={onSetFilterBy.current}
                    board={board}
                />
            </div>
        </section>

    </Fragment>
}
