import { ThemeProvider } from '@emotion/react';
import { Button, Flex, SplitButton, Tooltip, Icon, DialogContentContainer, Menu, MenuItem } from 'monday-ui-react-core'
import { Add, Search, Person, Filter, Sort, Group } from "monday-ui-react-core/icons";
import { useEffect, useMemo, useState } from 'react';
import { ADD_TASK_FROM_HEADER, boardService } from '../services/board.service.local';
import { updateBoard, updateTask } from '../store/board.actions';

export function BoardFilter({ board }) {

    const obj = [
        { txt: 'ttt' },
        { txt: 'ttt' },
        { txt: 'ttt' },
    ]

    function onAddNewTask() {
        updateTask(board, undefined, ADD_TASK_FROM_HEADER)
    }
    return <section className='board-filter'>
        <Flex >

            <SplitButton children='New Task' onClick={onAddNewTask} secondaryDialogContent={<HeaderMenu />} leftIcon={Add} size={Button.sizes.SMALL}  >

            </SplitButton>
            <Button kind={Button.kinds.TERTIARY} size={Button.sizes.SMALL} leftIcon={Search}>
                Search
            </Button>
            <div className="monday-storybook-tooltip_bottom">
                <Tooltip
                    content="Filter by person" animationType="expand">
                    <Button kind={Button.kinds.TERTIARY} size={Button.sizes.SMALL} leftIcon={Person}>
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

        </Flex>
    </section >

}

export function HeaderMenu() {
    return (
        <Menu>
            <MenuItem
                icon={Group}
                title="New group of Tasks"
            />
        </Menu>
    )
}
