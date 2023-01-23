import { Fragment, useEffect, useState } from "react";

import { BoardFilter } from "./board-filter";
import { BoardView } from "./board-view";

import { MenuButton, Menu, Icon } from 'monday-ui-react-core'
import { MoveArrowLeft, Search, Filter, Home } from 'monday-ui-react-core/icons'

export function BoardHeader({ board }) {
    const [isFilterOn, setIsFilterOn] = useState(false)

    return <Fragment>

        <div className="header-mobile">

            <button className="home-mobile-btn">
                <Icon iconType={Icon.type.SVG} icon={MoveArrowLeft} iconLabel="my bolt svg icon" iconSize={16} />
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
                        style={{
                            backgroundColor: 'red',
                            color: 'red'
                        }}
                    >

                    </Menu>
                </MenuButton>
            </div>

        </div>

        <div className="mobile-header-filter">
            <div className="mobile-view-select">
                <select name="view" id="view">
                    <option value="main">

                        <Icon iconType={Icon.type.SVG} icon={Home} iconSize={12} />
                        Main table
                    </option>
                    <option value="kanban">
                        Kanban
                    </option>

                </select>
            </div>

            <div className="mobile-fitler-container">

                <Icon iconType={Icon.type.SVG} icon={Filter} iconLabel="my bolt svg icon" iconSize={16} />
            </div>
            <div className="search-mobile-container">

                <Icon iconType={Icon.type.SVG} icon={Search} iconLabel="my bolt svg icon" iconSize={16} />
                <div className="input-slider-mobile">
                    <button className="cancel-filter"
                        onClick={() => setIsFilterOn(!isFilterOn)}
                        style={{ display: isFilterOn ? `block` : `none` }}>Cancel</button>

                    <input className="mobile-input-filter" type="text" name="txt" id="txt" />
                </div>

            </div>

        </div>

        <section className="board-header">

            <div className="board-header-main-container">
                <BoardView board={board}
                />
                <div className="spacer-header"></div>
                <BoardFilter board={board}
                />
            </div>
        </section>
    </Fragment>
}