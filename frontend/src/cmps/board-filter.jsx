import { ThemeProvider } from '@emotion/react';
import { Button, Flex, SplitButton, AvatarGroup, Avatar, Icon } from 'monday-ui-react-core'
import { Add, Search, Person, Filter, Sort } from "monday-ui-react-core/icons";
import { useEffect, useState } from 'react';
import { boardService } from '../services/board.service.local';
import { updateBoard } from '../store/board.actions';

export function BoardFilter({ boardToUpdate, addNewTask, setBoardToUpdate }) {

    const [newTask, setNewTask] = useState({})

    useEffect(() => {
        loadDefaultTask()
    }, [boardToUpdate]);

    async function loadDefaultTask() {
        try {
            const defaultNewTask = await boardService.getNewTask(boardToUpdate._id)
            setNewTask(defaultNewTask)
        } catch (err) {

        }
    }

    async function onAddNewTask() {
        setBoardToUpdate(prevBoard => {
            const isFinished = prevBoard.groups[0].tasks.some(task => task.id === newTask.id)
            if (isFinished) return { ...prevBoard }
            return { ...prevBoard, board: prevBoard.groups[0].tasks.unshift(newTask) }
        })
        updateBoard(boardToUpdate)
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