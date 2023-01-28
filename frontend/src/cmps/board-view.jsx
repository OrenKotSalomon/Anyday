import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { CHANGE_TITLE } from '../services/board.service.local';
import { updateBoard } from '../store/board.actions';

import { EditableHeading, Flex, AvatarGroup, Avatar, Icon, Tooltip } from 'monday-ui-react-core'
import { Activity, Favorite, Info, Home } from "monday-ui-react-core/icons";

import Harel from '../assets/img/Harel.jpg'
import Oren from '../assets/img/Oren.jpg'
import Yossi from '../assets/img/Yossi.jpg'

export function BoardView({ board }) {
    const [newTitle, setNewTitle] = useState(board.title)

    function onFinishEditing() {

        updateBoard(board, newTitle, CHANGE_TITLE)
    }

    function handleChange(value) {
        value = !value ? board.title : value
        setNewTitle(value)
    }

    return <section className='board-view'>
        <div className='board-header-main'>
            <div className='board-header-top'>
                <div className='board-header-left'>
                    <div className='board-title'>
                        <div className="monday-storybook-tooltip_bottom">
                            <Tooltip
                                content="Click to Edit" animationType="expand">
                                <EditableHeading
                                    className="board-title-heading"
                                    onFinishEditing={onFinishEditing}
                                    onChange={handleChange}
                                    type={EditableHeading.types.h1}
                                    autoSize={true}
                                    value={board.title} />
                            </Tooltip>
                        </div>

                    </div>
                    <div className='board-info-toggle'>
                        <div className="monday-storybook-tooltip_bottom">
                            <Tooltip
                                content="Show board description" animationType="expand">
                                <button className='info-header'>
                                    <Icon iconType={Icon.type.SVG} ignoreFocusStyle={true} icon={Info} iconLabel="my bolt svg icon" iconSize={20} />

                                </button>
                            </Tooltip>
                        </div>

                    </div>
                    <div className='star-header-container'>
                        <div className="monday-storybook-tooltip_bottom">
                            <Tooltip
                                content="Add to favorites" animationType="expand">
                                <button className='star'>
                                    <Icon iconType={Icon.type.SVG} ignoreFocusStyle={true} icon={Favorite} iconLabel="my bolt svg icon" iconSize={20} />

                                </button>
                            </Tooltip>
                        </div>

                    </div>
                </div>
                <div className='board-header-right'>
                    <div className='board-actions'>
                        <div className="monday-storybook-tooltip_bottom">
                            <Tooltip
                                content="Board activity" animationType="expand">
                                <button className='activity-logger'>
                                    <Icon iconType={Icon.type.SVG} icon={Activity} iconLabel="my bolt svg icon" iconSize={20} />
                                </button>
                            </Tooltip>
                        </div>

                        <button className='last-seen-action'>
                            <Flex direction={Flex.directions.ROW} >
                                <div>Last seen</div>
                                <AvatarGroup size={Avatar.sizes.SMALL} max={2}>
                                    <Avatar type={Avatar.types.IMG} src={Harel} ariaLabel="Harel Natan" />
                                    <Avatar type={Avatar.types.IMG} src={Oren} ariaLabel="Oren Kot" />
                                    <Avatar type={Avatar.types.IMG} src={Yossi} ariaLabel="Yossi Karasik" />
                                    <Avatar type={Avatar.types.IMG} src={Harel} ariaLabel="Another Me" />
                                </AvatarGroup>
                            </Flex>
                        </button>
                    </div>
                </div>
            </div>
            <div className='board-header-description'>
            {/* // Board Dexc */}
                <div className='board-header-txt'>Final Project For Coding Academy</div> 
                <div className='description-modal'>See More</div>
            </div>
            <div className="header-tablist">

                <div className='tablist-container'>

                    <div className='main-table-txt'>
                    <NavLink className='main-table-a' to={`/board/${board._id}`} ><Icon iconType={Icon.type.SVG} icon={Home} iconSize={16} style={{ marginRight: '5px' }} />
                        Main Table

                    {/* <div className='blue-line'></div> */}
                    </NavLink>
                    </div>  
                    <span>|</span>
                    <div className='kanban-a'>
                        <NavLink to={`/${board._id}/views/kanban`} >Kanban</NavLink>
                    </div>
                    <span>|</span>
                    <div className='kanban-a'>
                        <NavLink to={`/${board._id}/views/dashboard`} >Dashboard</NavLink>
                    </div>
                    <span>|</span>
                </div>
            </div>
        </div>
    </section>

}