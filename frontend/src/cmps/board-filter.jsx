import { ThemeProvider } from '@emotion/react';
import { Button, Flex, SplitButton, Tooltip, Icon, DialogContentContainer, Menu, MenuItem } from 'monday-ui-react-core'
import { Add, Search, PersonRound, Filter, Sort, Group, Hide } from "monday-ui-react-core/icons";
import { Menu as MenuIcon } from "monday-ui-react-core/icons";
import { useEffect, useMemo, useState } from 'react';
import { ADD_GROUP_FROM_HEADER, ADD_TASK_FROM_HEADER, boardService } from '../services/board.service.local';
import { updateBoard, updateGroup, updateTask } from '../store/board.actions';

export function BoardFilter({ board }) {

    function onAddNewTask() {
        updateTask(board, undefined, ADD_TASK_FROM_HEADER)
    }
    return <section className='board-filter'>
        <Flex gap='27' align='End'

        >

            <SplitButton className="new-task-btn"

                children='New Item' size={Button.sizes.SMALL} onClick={onAddNewTask} secondaryDialogContent={<HeaderMenu board={board} />} >

            </SplitButton>
            <Button kind={Button.kinds.TERTIARY} size={Button.sizes.SMALL} >
                {/* <span style={{ color: '#afafb2', width: '0px' }} >Search</span> */}
                <Icon iconType={Icon.type.SVG} icon={Search} iconSize={19} />

                <div> Search
                </div>
            </Button>
            <div className="monday-storybook-tooltip_bottom">
                <Tooltip
                    content="Filter by person" animationType="expand">
                    <Button kind={Button.kinds.TERTIARY} size={Button.sizes.SMALL} leftIcon={PersonRound}>
                        Person
                    </Button>
                </Tooltip>
            </div>
            <div className="monday-storybook-tooltip_bottom">
                <Tooltip
                    content="Filter by anything" animationType="expand">
                    <Button kind={Button.kinds.TERTIARY} size={Button.sizes.SMALL} leftIcon={Filter}>
                        Filter
                    </Button>
                </Tooltip>
            </div>
            <div className="monday-storybook-tooltip_bottom">
                <Tooltip
                    content="Sort by any column" animationType="expand">
                    <Button kind={Button.kinds.TERTIARY} size={Button.sizes.SMALL} leftIcon={Sort}>
                        Sort
                    </Button>
                </Tooltip>
            </div>
            <div className="monday-storybook-tooltip_bottom" style={{ justifySelf: 'flex-end' }}>
                <Tooltip
                    content="Hidden columns" animationType="expand">
                    <Button kind={Button.kinds.TERTIARY} size={Button.sizes.SMALL} leftIcon={MenuIcon}>

                    </Button>
                </Tooltip>
            </div>

        </Flex>
    </section >

}

export function HeaderMenu({ board }) {
    return (
        <Menu>
            <MenuItem
                icon={Group}
                onClick={() => updateGroup(board, null, ADD_GROUP_FROM_HEADER)}
                title="New group of Tasks"
            />
        </Menu>
    )
}
