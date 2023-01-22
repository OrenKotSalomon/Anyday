import { useState } from "react"
import Harel from '../assets/img/Harel.jpg'
import Yossi from '../assets/img/Yossi.jpg'
import Oren from '../assets/img/Oren.jpg'
import { DialogContentContainer, DatePicker, Flex, StoryDescription, Dropdown } from 'monday-ui-react-core'
import dayjs from "dayjs"
import { DATE_PICKER, MEMEBER_PICKER, STATUS_PICKER, UPDATE_TASK_DATE, UPDATE_TASK_STATUS } from "../services/board.service.local"

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
        console.log('dayjs(date).unix()', dayjs(date).unix());
        onUpdateTaskLabel(UPDATE_TASK_DATE, cmp.data, dayjs(date).unix())
    }
    console.log(cmp);
    function handleChange(ev) {
        // console.log(ev);

        setIsModalOpen(false)
    }

    function onStatusPick(status) {
        onUpdateTaskLabel(UPDATE_TASK_STATUS, cmp.data, status)

    }
    // console.log(cmp);
    switch (cmp.type) {

        case STATUS_PICKER:
            return <div onClick={() => setIsModalOpen(false)} className="status-picker-container" style={{ transform: `translate(-60%, 20%)`, left: cmp.pos.left, top: cmp.pos.top, position: 'absolute', }}>

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
            return <div className="member-picker-view" style={{ transform: `translate(-40%, 80%)`, left: cmp.pos.left, top: cmp.pos.top, position: 'absolute', }}>
                <div className="members-dropdown">
                    {/* read more on dropdown with avatar */}
                    {/* defaultValue={[optionsAvatar[0]]} */}
                    {/* here goes amount of users connected to board  */}
                    <Dropdown className="dropdown-stories-styles_with-chips" options={optionsAvatar} onChange={handleChange} />
                </div>
            </div>

        case DATE_PICKER:

            return <div className="date-picker-view" style={{ transform: `translate(-70%, 15%)`, left: cmp.pos.left, top: cmp.pos.top, position: 'absolute', }}>
                <div className="arrow-up"></div>
                <DatePicker data-testid="date-picker" onPickDate={getDate} />

            </div>
    }
}