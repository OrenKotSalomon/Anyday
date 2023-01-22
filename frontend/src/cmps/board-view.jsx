import { EditableHeading, Flex, AvatarGroup,
     Avatar, Icon, Tooltip, TabList, Tab } from 'monday-ui-react-core'
import { Activity, Favorite, Info, Home } from "monday-ui-react-core/icons";
import { useEffect, useRef, useState } from 'react';
import { boardService, CHANGE_TITLE } from '../services/board.service.local';
import { updateBoard } from '../store/board.actions';
import Harel from '../assets/img/Harel.jpg'
import Oren from '../assets/img/Oren.jpg'
import Yossi from '../assets/img/Yossi.jpg'
import { NavLink } from 'react-router-dom';

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

                                    onFinishEditing={onFinishEditing}
                                    onChange={handleChange}
                                    type={EditableHeading.types.h2}
                                    autoSize={true}
                                    value={board.title} brandFont={true} />
                            </Tooltip>
                        </div>

                    </div>
                    <div className='board-info-toggle'>
                        <div className="monday-storybook-tooltip_bottom">
                            <Tooltip
                                content="Show board description" animationType="expand">
                                <button className='info-header'>
                                    <Icon iconType={Icon.type.SVG} icon={Info} iconLabel="my bolt svg icon" iconSize={20} />

                                </button>
                            </Tooltip>
                        </div>

                    </div>
                    <div className='star-header-container'>
                        <div className="monday-storybook-tooltip_bottom">
                            <Tooltip
                                content="Add to favorites" animationType="expand">
                                <button className='star'>
                                    <Icon iconType={Icon.type.SVG} icon={Favorite} iconLabel="my bolt svg icon" iconSize={20} />

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
                <div className='board-header-txt'>Final Project For Coding Academy</div>
                <div className='description-modal'>See More</div>
            </div>
            <div className="header-tablist">
                {/* <TabList>
                    <Tab>
                    <Icon iconType={Icon.type.SVG} icon={Home} iconSize={20} style={{marginRight: '5px'}} /> Main Table
                    </Tab>
                    <Tab>
                        Kanban
                    </Tab>
                </TabList> */}
                <NavLink className='main-table-a' ><Icon iconType={Icon.type.SVG} icon={Home} iconSize={20} style={{marginRight: '5px'}} /> Main Table</NavLink>
                <span> | </span>
                <NavLink>Kanban</NavLink>
            </div>
        </div>
    </section>

}