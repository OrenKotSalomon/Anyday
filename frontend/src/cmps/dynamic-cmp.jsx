import { MenuButton, Menu, MenuItem, Icon, EditableHeading, Counter, DialogContentContainer, DatePicker } from 'monday-ui-react-core'
import Oren from '../assets/img/Oren.jpg'
import { Avatar, AvatarGroup } from 'monday-ui-react-core';
import { useState } from 'react';

export function DynamicCmp({ temp, cmp, info }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    function getStatusColor(status) {

        switch (status) {
            case 'done':
                return '#00c875'
            case 'working on it':
                return '#fdab3d'
            case 'stuck':
                return '#e2445c'
            case '':
                return '#c4c4c4'

        }
    }

    switch (cmp) {
        case 'status-picker':
            return <div onClick={temp} className="status-label" style={{ backgroundColor: getStatusColor(info.status) }} >{info.status}
                <div className="add-note"></div>
            </div>
        case 'member-picker':
            return <div onClick={temp} className="people-label">{<AvatarGroup size={Avatar.sizes.SMALL} max={2}>
                <Avatar type={Avatar.types.IMG} src={Oren} ariaLabel="Oren Kot" />
            </AvatarGroup>}</div>
        case 'date-picker':
            return <div onClick={temp} className="date-label"><EditableHeading
                type={EditableHeading.types.h6}
                value={info.dueDate}
                displayPlaceholderInTextMode={true}
            />
            </div>
        // return <div className="date-label"><DialogContentContainer >
        //     <DatePicker data-testid="date-picker" onPickDate={temp} />
        // </DialogContentContainer></div>
    }
}