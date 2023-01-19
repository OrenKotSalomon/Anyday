import { useState } from "react";
import { TaskDetails } from "./task-details";

import { MenuButton, Menu, MenuItem, Icon } from 'monday-ui-react-core'
import { Open, Duplicate, Delete } from 'monday-ui-react-core/icons'

export function TaskPreview({ task, board, group }) {
    const [isOpenDetails, setIsOpenDetails] = useState(false)
    return <section className='task-preview flex'>
        <MenuButton className="task-preview-menu-btn" >
                <Menu
                    id="menu"
                    size="medium"
                    style={{
                        backgroundColor: 'red',
                        color: 'red'
                    }}
                >
                    <MenuItem
                        // onClick={() => onAddGroup(group)}
                        icon={Open}
                        title="Open"
                    />
                    <MenuItem
                        // onClick={() => onDuplicateGroup(group)}
                        icon={Duplicate}
                        title="Duplicate Task"
                    />
                    <MenuItem
                        // onClick={() => onDeleteGroup(group)}
                        icon={Delete}
                        title="Delete"
                    />
                </Menu>
            </MenuButton>
        <div className="task-name cell">
            <span className="task-preview-title">{task.title}</span>
            <button onClick={() => setIsOpenDetails(!isOpenDetails)} className="open-item-page-btn">
                <Icon iconType={Icon.type.SVG} icon={Open} iconLabel="Task Details" iconSize={16} /><span>Open</span>
            </button>
            {isOpenDetails && <TaskDetails
                board={board}
                task={task}
                group={group}
                isOpenDetails={isOpenDetails}
                setIsOpenDetails={setIsOpenDetails} />}
        </div>
        <div className="task-person cell">
            <span>Task Members</span>
        </div>
        <div className="task-status cell">
            <span>Task Status</span>
        </div>
        <div className="task-priority cell">
            <span>Task Priority</span>
        </div>
        {/* <TaskDetails /> */}
    </section>

}