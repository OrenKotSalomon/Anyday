import { EditableHeading, Tooltip } from 'monday-ui-react-core'
import { useState } from 'react';
import { updateBoard } from '../store/board.actions';
import { TaskPreview } from "./task-preview";
import { MenuButton, Menu, MenuItem } from 'monday-ui-react-core'
import { Delete, Bullet } from 'monday-ui-react-core/icons'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service';
import { boardService } from '../services/board.service.local';

export function GroupList({ board, group }) {

    // const [boardToUpdate, setBoardToUpdate] = useState(board)
    const [groupToUpdate, setGroupToUpdate] = useState(group)
    const groupIdx = board.groups.findIndex(currGroup => currGroup.id === group.id)

    function onFinishEditing() {
        const newBoard = boardService.updateGroupTitle(board, groupToUpdate, groupIdx)
        updateBoard(newBoard)
    }

    function handleChange(value) {
        setGroupToUpdate(prevGroup => ({ ...prevGroup, title: value }))
    }

    function onSetColorGroup(groupId) {
        console.log('groupId:', groupId)
    }

    async function onDeleteGroup(groupId) {
        console.log('groupId:', groupId)
        const newBoard = boardService.deleteGroup(board, groupId, groupIdx)
        updateBoard(newBoard)
    }

    return <section className='group-list'>
        <div className="group-header-container">
            <MenuButton className="group-list-menu-btn" >
                <Menu
                    id="menu"
                    size="medium"
                    style={{
                        backgroundColor: 'red',
                        color: 'red'
                    }}
                >
                    <MenuItem
                        onClick={() => onSetColorGroup(group.id)}
                        icon={Bullet}
                        title="Change Color"
                    />
                    <MenuItem
                        onClick={() => onDeleteGroup(group.id)}
                        icon={Delete}
                        title="Delete"
                    />
                </Menu>
            </MenuButton>
            <div className="group-header-name"
                style={{ color: group.style }}>
                <div className="monday-storybook-tooltip_bottom">
                    <Tooltip
                        content="Click to Edit" animationType="expand">
                        <EditableHeading
                            onFinishEditing={onFinishEditing}
                            onChange={handleChange}
                            brandFont
                            value={group.title}
                        />
                    </Tooltip>
                </div>

            </div>
        </div>
        <div className="main-group-container"
            style={{ backgroundColor: group.style }}>
            <div className="group-labels flex">
                <div className="task-name cell">Task</div>
                <div className="task-person cell">Person</div>
                <div className="task-status cell">Status</div>
                <div className="task-priority cell">Priority</div>
            </div>
            <section className="tasks-container">
                {group.tasks.map(task => <TaskPreview key={task.id} task={task} />)}
            </section>
        </div>
    </section>

}