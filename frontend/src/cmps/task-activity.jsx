
import { utilService } from '../services/util.service.js';

import { Icon } from 'monday-ui-react-core'
import { Time, Team, Status, DropdownChevronRight } from 'monday-ui-react-core/icons'



export function TaskActivity({ task }) {

    function taskActivityTypePicker(type, activ) {
        switch (type) {
            case 'update_member':
                return <section className='activity-picker-container'>< div className="activity-type">
                    <Icon className='activity-person-icon' iconType={Icon.type.SVG}
                        icon={Team} iconLabel="my svg icon" iconSize={14} />
                    Person
                </div>
                    <div className="activity-action">
                        {activ.action}
                    </div>
                    <div className="activity-data">
                        {activ.toUserImg ? <img className='activity-by-avatar' src={activ.toUserImg} alt="" />
                            : <div className='task-details-by-user-img activity-by-avatar' >{(activ.toUserName).charAt(0).toUpperCase()}</div>}
                    </div>
                </section>
            case 'update_status':
                return <section className='activity-picker-container'>< div className="activity-type">
                    <Icon className='activity-person-icon' iconType={Icon.type.SVG}
                        icon={Status} iconLabel="my svg icon" iconSize={14} />
                    Status
                </div>
                    <div className={'activity-status' + ` ${activ.fromStatus}`}>
                        {activ.fromStatus}
                    </div>
                    <span className='activity-status-arrow'><Icon className='activity-person-icon' iconType={Icon.type.SVG}
                        icon={DropdownChevronRight} iconLabel="my svg icon" iconSize={16} /></span>
                    <div className={'activity-status' + ` ${activ.toStatus}`}>
                        {activ.toStatus}
                    </div>
                </section>
            case 'update_priority':
                return <section className='activity-picker-container'>< div className="activity-type">
                    <Icon className='activity-person-icon' iconType={Icon.type.SVG}
                        icon={Status} iconLabel="my svg icon" iconSize={14} />
                    Priority
                </div>
                    <div className={'activity-status' + ` ${activ.fromPriority}`}>
                        {activ.fromPriority !== 'critical'?activ.fromPriority:activ.fromPriority+'⚠️'}
                    </div>
                    <span className='activity-status-arrow'><Icon className='activity-person-icon' iconType={Icon.type.SVG}
                        icon={DropdownChevronRight} iconLabel="my svg icon" iconSize={16} /></span>
                    <div className={'activity-status' + ` ${activ.toPriority}`}>
                        {activ.toPriority!== 'critical'?activ.toPriority:activ.toPriority+'⚠️'}
                    </div>
                </section>
        }
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
                    <img className='activity-by-avatar' src={activ.byUser?.imgUrl} alt="" />
                    <span className="activity-by-task">{task.title}</span>
                </div>

                {taskActivityTypePicker(activ.type, activ)}

            </div>) : 'NO ACTIVITY FOR THIS TASK YET...'
        }

    </section >
}



