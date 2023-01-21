import { MenuButton, Menu, MenuItem, Icon, EditableHeading, Counter, DialogContentContainer, DatePicker } from 'monday-ui-react-core'
import Oren from '../assets/img/Oren.jpg'
import { Avatar, AvatarGroup } from 'monday-ui-react-core';
import { useState } from 'react';

export function DynamicCmp({ cmp, info, openModal }) {

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

    switch (cmp.cmp) {
        case 'status-picker':
            return <div className="status-label"
                onClick={(ev) => openModal(ev, cmp.task, 'status-picker')}
                style={{ backgroundColor: getStatusColor(info.status) }} >
                {info.status}
                <div className="add-note"></div>
            </div>
        case 'member-picker':
            return <div className="people-label"
                onClick={(ev) => openModal(ev, cmp.task, 'member-picker')} >
                {<AvatarGroup size={Avatar.sizes.SMALL} max={2}>
                    <Avatar type={Avatar.types.IMG} src={Oren} ariaLabel="Oren Kot" />
                </AvatarGroup>}</div>
        case 'date-picker':
            return <div className="date-label"
                onClick={(ev) => openModal(ev, cmp.task, ' date-picker')} >
                <EditableHeading
                    type={EditableHeading.types.h6}
                    value={info.dueDate}
                    displayPlaceholderInTextMode={true}
                />
            </div>
    }
}