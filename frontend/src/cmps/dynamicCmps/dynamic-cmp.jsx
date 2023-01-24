import { DATE_PICKER, MEMEBER_PICKER, STATUS_PICKER, PRIORITY_PICKER, TEXT_LABEL, LABEL_STATUS_PICKER } from '../../services/board.service.local';

import { Avatar, AvatarGroup, Icon } from 'monday-ui-react-core';
import { TextCopy } from 'monday-ui-react-core/icons';
import dayjs from 'dayjs';

import Oren from '../../assets/img/Oren.jpg'
import Harel from '../../assets/img/Harel.jpg'

export function DynamicCmp({ cmp, info, openModal, handleChange }) {

    const inputPlaceholder = <Icon iconType={Icon.type.SVG} ignoreFocusStyle={true} icon={TextCopy} iconSize={19} />

    function getLabelColor(type) {

        switch (type) {
            case 'done':
                return '#00c875'
            case 'working on it':
                return '#fdab3d'
            case 'stuck':
                return '#e2445c'
            case 'critical ⚠️':
                return '#333333'
            case 'high':
                return '#401694'
            case 'medium':
                return '#5559df'
            case 'low':
                return '#579bfc'
            case 'label 1':
                return '#9aadbd'
            case 'label 2':
                return '#0086c0'
            case 'label 3':
                return '#9d99b9'
            case 'default':
                return '#c4c4c4'
        }
    }

    switch (cmp.cmp) {
        case STATUS_PICKER:
            return <div className="status-label"
                onClick={(ev) => openModal(ev, { task: cmp.task, groupId: cmp.groupId }, STATUS_PICKER)}
                style={{ backgroundColor: getLabelColor(info.status) }} >
                {info.status === 'default' ? '' : info.status}
                <div className="add-note"></div>
            </div>
        case LABEL_STATUS_PICKER:
            return <div className="label-status-level"
                onClick={(ev) => openModal(ev, { task: cmp.task, groupId: cmp.groupId }, LABEL_STATUS_PICKER)}
                style={{ backgroundColor: getLabelColor(info.labelStatus) }} >
                {info.labelStatus === 'default' ? '' : info.labelStatus}
                <div className="add-note"></div>
            </div>
        case MEMEBER_PICKER:
            return <div className="person-label"
                onClick={(ev) => openModal(ev, { task: cmp.task, groupId: cmp.groupId }, MEMEBER_PICKER)} >
                {<AvatarGroup size={Avatar.sizes.SMALL} max={2}>
                    <Avatar type={Avatar.types.IMG} src={Oren} ariaLabel="Oren Kot" />
                    <Avatar type={Avatar.types.IMG} src={Harel} ariaLabel="Harel Natan" />
                </AvatarGroup>}</div>
        case DATE_PICKER:
            return <div className="date-label"
                onClick={(ev) => openModal(ev, { task: cmp.task, groupId: cmp.groupId }, DATE_PICKER)} >
                <div className='date-label-text'>
                    <span className='date-txt'> {dayjs(info.dueDate * 1000).format('MMM DD')} </span>

                </div>

            </div>
        case PRIORITY_PICKER:
            return <div className="status-label"
                onClick={(ev) => openModal(ev, { task: cmp.task, groupId: cmp.groupId }, PRIORITY_PICKER)}
                style={{ backgroundColor: getLabelColor(info.priority) }} >
                {info.priority === 'default' ? '' : info.priority}
                <div className="add-note"></div>
            </div>
        case TEXT_LABEL:
            return <div className="txt-label">
                {info.txt && info.txt}
                {!info.txt && <section className="input-txt-label-container">
                    <span className='txt-label-placeholder' ><Icon iconType={Icon.type.SVG} icon={TextCopy} iconSize={19} /></span>
                    <input onChange={handleChange} type="text" />
                    {/* <EditableHeading type={EditableHeading.types.h6} value={info.txt} /> */}
                </section>}
            </div>
    }
}