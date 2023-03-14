import { useState, useEffect } from 'react'

import { DATE_PICKER, LABEL_STATUS_PICKER, MEMEBER_PICKER, PRIORITY_PICKER, STATUS_PICKER, UPDATE_TASK_DATE, UPDATE_TASK_LABEL_STATUS, UPDATE_TASK_PRIORITY, UPDATE_TASK_STATUS, UPDATE_TASK_MEMBERS } from "../../services/board.service.local"

import { DialogContentContainer, DatePicker, Avatar, Search, Icon } from 'monday-ui-react-core'
import { CloseSmall } from 'monday-ui-react-core/icons';

import Harel from '../../assets/img/Harel.jpg'
import Yossi from '../../assets/img/Yossi.jpg'
import Oren from '../../assets/img/Oren.jpg'

import { userService } from '../../services/user.service.js'

import dayjs from "dayjs"
import { TaskDetails } from '../task-details'

export function DynamicModal({ cmp, setIsModalOpen, onUpdateTaskLabel }) {
    const [users, setUsers] = useState([])
    useEffect(() => {
        loadUsers()
    }, [])

    async function loadUsers() {
        const users = await userService.getUsers()
        setUsers(users)
    }

    const optionsAvatar = [{
        value: "Harel",
        label: "Harel Natan",
        leftAvatar: Harel
    }, {
        value: "Yossi",
        label: "Yossi Karasik",
        leftAvatar: Yossi
    }, {
        value: "Oren",
        label: "Oren Kot",
        leftAvatar: Oren
    }]
    function getDate(date) {
        setIsModalOpen(false)
        onUpdateTaskLabel(UPDATE_TASK_DATE, cmp.data, dayjs(date).unix())
    }
    function handleChange(ev) {
        setIsModalOpen(false)
    }

    function onStatusPick(status) {

        onUpdateTaskLabel(UPDATE_TASK_STATUS, cmp.data, status)
    }

    function onPriorityPick(priority) {
        onUpdateTaskLabel(UPDATE_TASK_PRIORITY, cmp.data, priority)
    }
    function onLabelStatusPick(labelStatus) {
        onUpdateTaskLabel(UPDATE_TASK_LABEL_STATUS, cmp.data, labelStatus)
    }

    function onMemberPick(user, isDelete = false) {
        cmp.data.isDelete = isDelete
        onUpdateTaskLabel(UPDATE_TASK_MEMBERS, cmp.data, user)
        setIsModalOpen(false)
    }

    switch (cmp.type) {

        case STATUS_PICKER:
            return <div onClick={() => setIsModalOpen(false)} className="status-picker-container" style={{ left: cmp.pos.left, top: cmp.pos.top, position: 'absolute', }}>

                <div className="arrow-up arrow-up-modal"></div>
                <div className="status-picker-view">
                    {cmp.info.map((status, idx) => {
                        return <button onClick={() => onStatusPick(status.label)} key={idx}
                            style={{ background: status.bgColor }}
                            className="status-picker">
                            {status.label}
                        </button>
                    }
                    )}
                </div>
            </div>
        case LABEL_STATUS_PICKER:
            return <div onClick={() => setIsModalOpen(false)} className="status-picker-container" style={{ left: cmp.pos.left, top: cmp.pos.top, position: 'absolute', }}>

                <div className="arrow-up arrow-up-modal"></div>
                <div className="status-picker-view">
                    {cmp.info.map((labelStatus, idx) => {

                        return <button onClick={() => onLabelStatusPick(labelStatus.label)} key={idx}
                            style={{ background: labelStatus.bgColor }}
                            className="status-picker">
                            {labelStatus.label}
                        </button>
                    }
                    )}
                </div>
            </div>
        case MEMEBER_PICKER:
            return <div className="member-picker-view" style={{ left: cmp.pos.left, top: cmp.pos.top, position: 'absolute', }}>
                <div className="members-dropdown">
                    {/* read more on dropdown with avatar */}
                    {/* defaultValue={[optionsAvatar[0]]} */}
                    {/* here goes amount of users connected to board  */}
                    <DialogContentContainer className="monday-style-story-chips_search-bar">
                        <div className='member-picker-user-container'>
                            <Icon onClick={() => setIsModalOpen(false)} className='member-picker-close-modal' iconType={Icon.type.SVG} icon={CloseSmall} iconLabel="my bolt svg icon" iconSize={18} />
                            <div className='member-picker-user-delete-container'>
                                {cmp.info?.members.map(member =>
                                    <div className='member-picker-user-delete' key={member._id + '' + Math.random(9)}>
                                        <Avatar size={Avatar.sizes.SMALL} src={member.imgUrl} type={Avatar.types.IMG} ariaLabel={member.fullname} />
                                        <span className='member-picker-user-delete-fullname' >{member.fullname}</span>
                                        <Icon onClick={() => onMemberPick(member, true)} className='member-picker-user-delete-btn' iconType={Icon.type.SVG} icon={CloseSmall} iconLabel="my bolt svg icon" iconSize={12} />
                                    </div>)}
                            </div>
                            <Search placeholder="Search names, positions, or a team" />
                            <div className='member-picker-suggested'>Suggested people</div>
                            {users && users.map(user => <div key={user._id + '' + Math.random(9)} className="member-picker-user"
                                onClick={() => onMemberPick(user)}>
                                <div className='member-picker-fullname'>{user.fullname}</div>
                                <img className="member-picker-img" src={user.imgUrl ? user.imgUrl : 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10228639569717408&height=50&width=50&ext=1677684524&hash=AeSzD8dsx8BSqcN34cg'} alt="" />
                            </div>)}
                        </div>
                    </DialogContentContainer>
                </div>
            </div>

            {/* <div className="monday-style-story-chips_lable">Suggested people</div>
<div className="monday-style-story-chips_search">
    <div className="monday-style-story-chips_inline-container" key="cont-1">
        <Avatar size={Avatar.sizes.MEDIUM} src={Oren} type={Avatar.types.IMG} />
        <span className="monday-style-story-chips_name">
            Oren
        </span>
    </div>
    <div className="monday-style-story-chips_inline-container" key="cont-2">
        <Avatar size={Avatar.sizes.MEDIUM} backgroundColor={Avatar.colors.DARK_PURPLE} text="LC" type={Avatar.types.TEXT} />

    </div>

</div> */}

        case DATE_PICKER:

            return <div className="date-picker-view" style={{ left: cmp.pos.left, top: cmp.pos.top, position: 'absolute', }}>
                <div className="arrow-up arrow-up-modal"></div>
                <DialogContentContainer className={'styles.datepickerDialogContentContainer'}>

                    <DatePicker data-testid="date-picker" onPickDate={getDate} />
                </DialogContentContainer>

            </div>
        case PRIORITY_PICKER:
            return <div onClick={() => setIsModalOpen(false)} className="status-picker-container" style={{ left: cmp.pos.left, top: cmp.pos.top, position: 'absolute', }}>
                <div className="arrow-up arrow-up-modal"></div>
                <div className="status-picker-view">
                    {cmp.info.map((priority, idx) => {
                        return <button onClick={() => onPriorityPick(priority.label)} key={idx}
                            style={{ background: priority.bgColor }}
                            className="status-picker">
                            {priority.label}
                        </button>
                    }
                    )}
                </div>
            </div>
    }
}