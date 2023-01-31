
import { utilService } from '../services/util.service.js';

import { Icon } from 'monday-ui-react-core'
import { Time, Team, Status, DropdownChevronRight } from 'monday-ui-react-core/icons'



export function TaskActivity({ task }) {

    function lableStrToUpperCase(str) {
        switch (str) {
            case 'done':
                return 'Done'
            case 'working on it':
                return 'Working on it'
            case 'stuck':
                return 'Stuck'
            case 'default':
                return 'Default'
            case 'label 1':
                return 'Label 1'
            case 'label 2':
                return 'Label 2'
            case 'label 3':
                return 'Label 3'
            case 'low':
                return 'Low'
            case 'medium':
                return 'Medium'
            case 'high':
                return 'High'
            case 'critical ⚠️':
                return 'Critical ⚠️'
        }
    }


    function taskActivityTypePicker(type, activ) {
        switch (type) {
            case 'update_member':
                return <section className='activity-picker-container'>< div className="activity-type">
                    <Icon className='activity-person-icon' iconType={Icon.type.SVG}
                        icon={Team} iconLabel="my svg icon" iconSize={14} />
                    Person
                </div>
                    <div className='activity-member-container'>
                        <div className="activity-action">
                            {activ.action}
                        </div>
                        <div className="activity-data">
                            {activ.toUserImg ? <img style={{right:`${activ.action === 'Removed'? 5:0}px`}} className='activity-by-avatar' src={activ.toUserImg} alt="" />
                                : <div className='task-details-by-user-img activity-by-avatar' >{(activ.toUserName).charAt(0).toUpperCase()}</div>}
                        </div>
                    </div>
                </section>
            case 'update_status':
                return <section className='activity-picker-container'>< div className="activity-type">
                    {/* <Icon className='activity-person-icon' iconType={Icon.type.SVG}
                        icon={Status} iconLabel="my svg icon" iconSize={14} /> */}
                    <div className='activity-type-container'>
                        {statusIcon()}
                        Status
                    </div>
                </div>
                    <div className={'activity-status' + ` ${activ.fromStatus}`}>
                        {lableStrToUpperCase(activ.fromStatus)}
                    </div>
                    <span className='activity-status-arrow'><Icon className='activity-person-icon' iconType={Icon.type.SVG}
                        icon={DropdownChevronRight} iconLabel="my svg icon" iconSize={16} /></span>
                    <div className={'activity-status' + ` ${activ.toStatus}`}>
                        {lableStrToUpperCase(activ.toStatus)}
                    </div>
                </section>
            case 'update_priority':
                return <section className='activity-picker-container'>< div className="activity-type">
                    {/* <Icon className='activity-person-icon' iconType={Icon.type.SVG}
                        icon={Status} iconLabel="my svg icon" iconSize={14} /> */}
                    <div className='activity-type-container'>
                        {statusIcon()}
                        Priority
                    </div>
                </div>
                    <div className={'activity-status' + ` ${activ.fromPriority}`}>
                        {lableStrToUpperCase(activ.fromPriority)}
                    </div>
                    <span className='activity-status-arrow'><Icon className='activity-person-icon' iconType={Icon.type.SVG}
                        icon={DropdownChevronRight} iconLabel="my svg icon" iconSize={16} /></span>
                    <div className={'activity-status' + ` ${activ.toPriority}`}>
                        {lableStrToUpperCase(activ.toPriority)}
                    </div>
                </section>
            case 'update_label':
                return <section className='activity-picker-container'>< div className="activity-type">
                    {/* <Icon className='activity-person-icon' iconType={Icon.type.SVG}
                        icon={Status} iconLabel="my svg icon" iconSize={14} /> */}
                    <div className='activity-type-container'>
                        {statusIcon()}
                        Label
                    </div>
                </div>
                    <div className={'activity-status' + ` ${activ.fromLabel}`}>
                        {lableStrToUpperCase(activ.fromLabel)}
                    </div>
                    <span className='activity-status-arrow'><Icon className='activity-person-icon' iconType={Icon.type.SVG}
                        icon={DropdownChevronRight} iconLabel="my svg icon" iconSize={16} /></span>
                    <div className={'activity-status' + ` ${activ.toLabel}`}>
                        {lableStrToUpperCase(activ.toLabel)}
                    </div>
                </section>
        }
    }

    function statusIcon() {
        return <div className="status-icon" >
            <div className='status-icon-green'></div>
            <div className='status-icon-orange'></div>
            <div className='status-icon-red'></div>
        </div>
    }

    return <section>
        {(task.activity && task.activity.length) ?
            task.activity.map(activ => <div key={activ.id} className="activity-row">

                <div className="activity-by">
                    <span className="activity-by-time">
                        <Icon className='task-details-header-time-icon'
                            iconType={Icon.type.SVG} icon={Time} iconLabel="my svg icon" iconSize={14} />
                        {utilService.time_ago(activ.time)}
                    </span>
                    <img className='activity-by-avatar' src={activ.byUser?.imgUrl ? activ.byUser.imgUrl : 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=5642366172555987&height=50&width=50&ext=1677684563&hash=AeRtHaLPzcN5dY_QQcA'} alt="" />
                    <span className="activity-by-task">{task.title}</span>
                </div>

                {taskActivityTypePicker(activ.type, activ)}

            </div>) : 'NO ACTIVITY FOR THIS TASK YET...'
        }

    </section >
}



