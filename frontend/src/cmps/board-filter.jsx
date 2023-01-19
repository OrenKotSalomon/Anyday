import { ThemeProvider } from '@emotion/react';
import { Button, Flex, SplitButton, AvatarGroup, Avatar, Icon } from 'monday-ui-react-core'
import { Add, Search, Person, Filter, Sort } from "monday-ui-react-core/icons";
import { useEffect, useState } from 'react';
import { boardService } from '../services/board.service.local';
import { updateBoard } from '../store/board.actions';

export function BoardFilter({ board }) {

    // fix the way of crudl can do it way more efficiently
    // check the way of crudl, a little bit confused

    function onAddNewTask() {
        const boardToUPpdate = boardService.addTaskFromHeader(board)

        updateBoard(boardToUPpdate)
    }
    return <section className='board-filter'>
        <Flex >

            <SplitButton onClick={onAddNewTask} leftIcon={Add} size={Button.sizes.SMALL}  >
                New Task
            </SplitButton>
            <Button kind={Button.kinds.TERTIARY} size={Button.sizes.SMALL} leftIcon={Search}>
                Search
            </Button>
            <Button kind={Button.kinds.TERTIARY} size={Button.sizes.SMALL} leftIcon={Person}>
                Person
            </Button>
            <Button kind={Button.kinds.TERTIARY} size={Button.sizes.SMALL} leftIcon={Filter}>
                Filter
            </Button>
            <Button kind={Button.kinds.TERTIARY} size={Button.sizes.SMALL} leftIcon={Sort}>
                Sort
            </Button>
        </Flex>
    </section>

}