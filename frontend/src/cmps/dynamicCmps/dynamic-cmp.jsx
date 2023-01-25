import { DATE_PICKER, MEMEBER_PICKER, STATUS_PICKER, PRIORITY_PICKER, TEXT_LABEL, LABEL_STATUS_PICKER, NUMBER_PICKER } from '../../services/board.service.local';

import { Avatar, AvatarGroup, Icon } from 'monday-ui-react-core';
import { TextCopy, PersonRound } from 'monday-ui-react-core/icons';
import dayjs from 'dayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-regular-svg-icons'
import { utilService } from '../../services/util.service';

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
                {Array.isArray(cmp.task.members) ?
                    (<div className='member-avatar-container'>
                        {cmp.task.members.map((member, idx) => <div key={member._id+''+Math.random()}><span className='member-hover-info'>{member.fullname}</span>
                            {member.imgUrl !== '' ? <img className="member-avatar-img" style={{ right: `${(idx * 24)}%`,position: `${cmp.task.members.length===1?'unset':'absolute'}` }} src={`${member.imgUrl}`} alt="" />
                                : <div className='member-avatar-img' style={{ right: `${(idx * 24)}%` ,position: `${cmp.task.members.length===1?'relative':'absolute'}` }}><span className='member-avatar-name-char'> {member.fullname.charAt(0).toUpperCase()}</span></div>}
                        </div>)}</div>) :<div className='member-empty-avatar'>
                        <FontAwesomeIcon icon={faCircleUser}/>
                            {/* <Icon iconType={Icon.type.SVG} icon={PersonRound} iconSize={36} /> */}
                            </div>}
            </div>
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
                </section>}
            </div>
        case NUMBER_PICKER:
            return <div className="input-number-label-container" >
                <div className='number-label-container'>

                    <input onChange={utilService.debounce(handleChange)}
                        onFocus={(e) => e.target.placeholder = ""}
                        onBlur={(e) => e.target.placeholder = info.number === 0 ? '' : info.number}
                        type="number" name="number" id="number" placeholder={info.number} />
                </div>
            </div>
    }
}