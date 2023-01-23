import { MenuButton, Menu, MenuItem } from 'monday-ui-react-core'
import { Delete, Bullet, Duplicate, Add } from 'monday-ui-react-core/icons'

export function GroupHeaderMenuBtn({ group, onAddGroup, onSetColorGroup, onDuplicateGroup, onDeleteGroup }) {

    return <MenuButton className="group-list-menu-btn" >
        <Menu
            id="menu"
            size="medium"
            style={{
                backgroundColor: 'red',
                color: 'red'
            }}
        >
            <MenuItem
                onClick={() => onAddGroup(group)}
                icon={Add}
                title="Add Group"
            />
            <MenuItem
                onClick={() => onSetColorGroup()}
                icon={Bullet}
                title="Change Color"
            />
            <MenuItem
                onClick={() => onDuplicateGroup(group)}
                icon={Duplicate}
                title="Duplicate Group"
            />
            <MenuItem
                onClick={() => onDeleteGroup(group)}
                icon={Delete}
                title="Delete"
            />
        </Menu>
    </MenuButton>

}