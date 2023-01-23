import { useState } from "react"
import Harel from '../assets/img/Harel.jpg'
import Yossi from '../assets/img/Yossi.jpg'
import Oren from '../assets/img/Oren.jpg'
import { DialogContentContainer, DatePicker, Avatar, Flex, Search, StoryDescription, Dropdown } from 'monday-ui-react-core'
import { } from 'monday-ui-react-core/icons'
import dayjs from "dayjs"
import { DATE_PICKER, MEMEBER_PICKER, PRIORITY_PICKER, STATUS_PICKER, UPDATE_TASK_DATE, UPDATE_TASK_PRIORITY, UPDATE_TASK_STATUS } from "../services/board.service.local"

export function DynamicModal({ cmp, setIsModalOpen, onUpdateTaskLabel }) {
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
        console.log('priority:', priority)
        onUpdateTaskLabel(UPDATE_TASK_PRIORITY, cmp.data, priority)
    }
    // console.log(cmp);
    switch (cmp.type) {

        case STATUS_PICKER:
            return <div onClick={() => setIsModalOpen(false)} className="status-picker-container" style={{ transform: `translate(-63%, 20%)`, left: cmp.pos.left, top: cmp.pos.top, position: 'absolute', }}>

                <div className="arrow-up"></div>
                <div className="status-picker-view">
                    {cmp.statuses.map((status, idx) => {
                        return <button onClick={() => onStatusPick(status.label)} key={idx}
                            style={{ background: status.bgColor }}
                            className="status-picker">
                            {status.label}
                        </button>
                    }
                    )}
                </div>
            </div>
        case MEMEBER_PICKER:
            return <div className="member-picker-view" style={{ transform: `translate(-100%, 80%)`, left: cmp.pos.left, top: cmp.pos.top, position: 'absolute', }}>
                <div className="members-dropdown">
                    {/* read more on dropdown with avatar */}
                    {/* defaultValue={[optionsAvatar[0]]} */}
                    {/* here goes amount of users connected to board  */}
                    <DialogContentContainer className="monday-style-story-chips_search-bar">
                        <Search placeholder="Search names, positions, or a team" />

                        <div className="monday-style-story-chips_lable">Suggested people</div>
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

                        </div>
                    </DialogContentContainer>
                </div>
            </div>

        case DATE_PICKER:

            return <div className="date-picker-view" style={{ transform: `translate(-100%, 15%)`, left: cmp.pos.left, top: cmp.pos.top, position: 'absolute', }}>
                <div className="arrow-up"></div>
                <DialogContentContainer className={'styles.datepickerDialogContentContainer'}>

                    <DatePicker data-testid="date-picker" onPickDate={getDate} />
                </DialogContentContainer>

            </div>
        case PRIORITY_PICKER:
            return <div onClick={() => setIsModalOpen(false)} className="status-picker-container" style={{ transform: `translate(-60%, 20%)`, left: cmp.pos.left, top: cmp.pos.top, position: 'absolute', }}>

                <div className="status-picker-view">
                    {cmp.priorities.map((priority, idx) => {
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