import { EditableHeading, Tooltip } from 'monday-ui-react-core'
import { useState } from 'react';
import { updateBoard, updateGroup } from '../store/board.actions';
import { TaskPreview } from "./task-preview";
import { MenuButton, Menu, MenuItem, ColorPicker } from 'monday-ui-react-core'
import { Delete, Bullet } from 'monday-ui-react-core/icons'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service';
import { boardService, CHANGE_GROUP_TITLE, DELETE_GROUP } from '../services/board.service.local';
import { utilService } from '../services/util.service';

export function GroupList({ board, group }) {

    const [isPickColor, setIsPickColor] = useState(false)
    const [groupToUpdate, setGroupToUpdate] = useState(group)

    function onFinishEditing() {
        updateGroup(board, groupToUpdate, CHANGE_GROUP_TITLE)
    }

    function handleChange(value) {
        setGroupToUpdate(prevGroup => ({ ...prevGroup, title: value }))
    }

    function onDeleteGroup(group) {
        updateGroup(board, group, DELETE_GROUP)
    }

    function onSetColorGroup(groupId) {
        console.log('groupId:', groupId)
        setIsPickColor(!isPickColor)
    }
    
    function onColorPick([color]) {
        color = utilService.getColorHex(color)
        setIsPickColor(!isPickColor)
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
                        onClick={() => onDeleteGroup(group)}
                        icon={Delete}
                        title="Delete"
                    />
                </Menu>
            </MenuButton>
            {isPickColor && <ColorPicker className="group-color-picker"
                colorsList={['red', 'blue']}
                colorSize={ColorPicker.sizes.SMALL}
                onSave={(value) => onColorPick(value)} />}
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