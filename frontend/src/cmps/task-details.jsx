import { NavLink } from "react-router-dom"
import { useState } from 'react';

import { TabList, Tab, EditableHeading, Icon } from 'monday-ui-react-core'
import { Home, Bullet } from 'monday-ui-react-core/icons'

import { Activity, Favorite, Info } from "monday-ui-react-core/icons";
import { DoubleCheck } from "monday-ui-react-core/icons";


export function TaskDetails({ task, isOpenDetails, setIsOpenDetails }) {
    // const [taskTitle, setTaskTitle] = useState(task.title)

    // function handleChange(ev) {
    //     ev.preventDefault()
    //     setTaskTitle(ev.target.value)

    // }

    return <section className='task-details' style={{ width: `${isOpenDetails ? 100 : 0}vw` }}>
        <div className='task-main'>
            <button className='close-task-btn' onClick={() => setIsOpenDetails(!isOpenDetails)}>X</button>
            <EditableHeading className='task-details-title' type={EditableHeading.types.h4} value={task.title} />

            <TabList className='task-main-nav'>
                <Tab>
                    <Icon iconType={Icon.type.SVG} icon={Home} iconLabel="my svg icon" iconSize={16} /> Updates
                </Tab>
                <Tab>
                    Files
                </Tab>
                <Tab>
                    Activity Log
                </Tab>
            </TabList>

            <hr className="task-details-hr"></hr>

            <button className='task-details-open-input-btn'>Write an update...</button>
            <button onClick={() => console.log(task)}>test</button>
            <div className='details-img-container'><img className="details-img" src="https://cdn.monday.com/images/pulse-page-empty-state.svg" alt="" /></div>

            <p className='details-p' ><span className="details-p-header">No updates yet for this item</span>
                <span className='details-p-txt'>Be the first one to update about progress, mention someone
                    or upload files to share with your team members</span></p>
        </div>
        <div className='close-task' onClick={() => setIsOpenDetails(!isOpenDetails)}>.</div>

    </section>
}