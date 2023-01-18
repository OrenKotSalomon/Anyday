import { EditableHeading, Flex, AvatarGroup, Avatar, Icon } from 'monday-ui-react-core'
import { Activity, Favorite, Info } from "monday-ui-react-core/icons";
export function BoardView({ board }) {

    function temp(ev) {
        console.log(ev);
    }

    return <section className='board-view'>
        <div className='board-header-main'>
            <div className='board-header-top'>
                <div className='board-header-left'>
                    <div className='board-title'>
                        <EditableHeading
                            type={EditableHeading.types.h1}
                            value={board.title} brandFont={true} />

                    </div>
                    <div className='board-info-toggle'>
                        <button className='info-header'>
                            <Icon iconType={Icon.type.SVG} icon={Info} iconLabel="my bolt svg icon" iconSize={20} />

                        </button>
                    </div>
                    <div className='star-header-container'>
                        <button className='star'>
                            <Icon iconType={Icon.type.SVG} icon={Favorite} iconLabel="my bolt svg icon" iconSize={20} />

                        </button>
                    </div>
                </div>
                <div className='board-header-right'>
                    <div className='board-actions'>
                        <button className='activity-logger'>
                            <Icon iconType={Icon.type.SVG} icon={Activity} iconLabel="my bolt svg icon" iconSize={20} />
                        </button>
                        <button className='last-seen-action'>
                            <Flex direction={Flex.directions.ROW} >
                                <div>Last seen</div>
                                <AvatarGroup size={Avatar.sizes.SMALL} max={3} className='avatar-imgs'>
                                    <Avatar type={Avatar.types.IMG} src={'https://robohash.org/8I.png?set=set1'} ariaLabel="Hadas Fahri" />
                                    <Avatar type={Avatar.types.IMG} src={'https://robohash.org/8I2.png?set=set1'} ariaLabel="Sergey Roytman" />
                                    <Avatar type={Avatar.types.IMG} src={'https://robohash.org/8I3.png?set=set1'} ariaLabel="Yonatan Lev Ari" />
                                    <Avatar type={Avatar.types.IMG} src={'https://robohash.org/84I.png?set=set1'} ariaLabel="Hadas Fahri" />
                                    <Avatar type={Avatar.types.IMG} src={'https://robohash.org/85I.png?set=set1'} ariaLabel="Sergey Roytman" />
                                    <Avatar type={Avatar.types.IMG} src={'https://robohash.org/86I.png?set=set1'} ariaLabel="Yonatan Lev Ari" />
                                </AvatarGroup>
                            </Flex>
                        </button>
                    </div>
                </div>
            </div>
            <div className='board-header-description'><div className='board-header-txt'>Here goes description</div> <div className='description-modal'>See More</div> </div>
        </div>
    </section>

}