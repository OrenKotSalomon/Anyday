import * as React from 'react'
import { useState } from "react"

import FormControl, { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';

import { TabList, Tab, EditableHeading, Icon } from 'monday-ui-react-core'
import { Home, Bullet } from 'monday-ui-react-core/icons'




export function TaskDetails({ task, isOpenDetails, setIsOpenDetails }) {

    const [isAddComment, setAddComment] = useState(false)

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

            {!isAddComment && <button onClick={() => setAddComment(!isAddComment)} className='task-details-open-input-btn'>Write an update...</button>}

            {isAddComment && <Box className='task-details-add-comment' component="form" noValidate autoComplete="off">
                <div className='task-details-add-comment-tools'>tool-bar here</div>
                <FormControl sx={{ width: '25ch' }}>
                    <OutlinedInput className='task-details-input' placeholder="Please enter text" />
                </FormControl>
            </Box>}



            <div className='details-img-container'><img className="details-img" src="https://cdn.monday.com/images/pulse-page-empty-state.svg" alt="" /></div>

            <p className='details-p' ><span className="details-p-header">No updates yet for this item</span>
                <span className='details-p-txt'>Be the first one to update about progress, mention someone
                    or upload files to share with your team members</span></p>
        </div>
        <div className='close-task' onClick={() => setIsOpenDetails(!isOpenDetails)}>.</div>

    </section>
}