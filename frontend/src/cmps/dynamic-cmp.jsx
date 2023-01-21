import { MenuButton, Menu, MenuItem, Icon, EditableHeading, Counter, DialogContentContainer, DatePicker } from 'monday-ui-react-core'
import Oren from '../assets/img/Oren.jpg'
import { Avatar, AvatarGroup } from 'monday-ui-react-core';
import { useState } from 'react';
import dayjs from 'dayjs';
import { DATE_PICKER, MEMEBER_PICKER, STATUS_PICKER } from '../services/board.service.local';

export function DynamicCmp({ cmp, info, openModal }) {

    // console.log();
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
        case STATUS_PICKER:
            return <div className="status-label"
                onClick={(ev) => openModal(ev, { task: cmp.task, groupId: cmp.groupId }, STATUS_PICKER)}
                style={{ backgroundColor: getStatusColor(info.status) }} >
                {info.status}
                <div className="add-note"></div>
            </div>
        case MEMEBER_PICKER:
            return <div className="person-label"
                onClick={(ev) => openModal(ev, { task: cmp.task, groupId: cmp.groupId }, MEMEBER_PICKER)} >
                {<AvatarGroup size={Avatar.sizes.SMALL} max={2}>
                    <Avatar type={Avatar.types.IMG} src={Oren} ariaLabel="Oren Kot" />
                </AvatarGroup>}</div>
        case DATE_PICKER:
            return <div className="date-label"
                onClick={(ev) => openModal(ev, { task: cmp.task, groupId: cmp.groupId }, DATE_PICKER)} >
                <EditableHeading
                    type={EditableHeading.types.h6}
                    value={dayjs(info.dueDate).format('MMM DD')}
                    displayPlaceholderInTextMode={true}
                />
            </div>
    }
}