import * as React from 'react'
import { useState } from "react"

// import FormControl, { useFormControl } from '@mui/material/FormControl';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import Box from '@mui/material/Box';

import { TabList, Tab, EditableHeading, Icon } from 'monday-ui-react-core'
import { Home } from 'monday-ui-react-core/icons'

import { boardService } from '../services/board.service.js';
import { CHANGE_TASK_TITLE, ADD_TASK_COMMENT, DELETE_TASK_COMMENT } from '../services/board.service.local.js';
import { updateTask } from '../store/board.actions';




export function TaskDetails({ task, isOpenDetails, setIsOpenDetails, board, group }) {
    const [isAddComment, setAddComment] = useState(false)
    const [newTitle, setNewTitle] = useState(task.title)
    const [newCommentTxt, setComment] = useState('')

    function onSubmitNewComment(ev) {
        ev.preventDefault()
        let data = boardService.getEmptyTaskComment(newCommentTxt)
        let taskChanges = { comment: data, id: task.id, groupId: group.id }
        updateTask(board, taskChanges, ADD_TASK_COMMENT)
    }

    function onDeleteComment(comment) {
        let taskChanges = { commentIdx: comment.id, id: task.id, groupId: group.id }
        updateTask(board, taskChanges, DELETE_TASK_COMMENT)
    }

    function handleInputChange(ev) {
        ev.preventDefault()
        setComment(ev.target.value)
    }

    function onFinishEditing() {
        let taskChanges = { title: newTitle, id: task.id, groupId: group.id }
        updateTask(board, taskChanges, CHANGE_TASK_TITLE)
    }

    function handleChange(value) {
        if (!value) return setNewTitle(task.title)
        setNewTitle(value)
    }

    return <section className='task-details' style={{ width: `${isOpenDetails ? 100 : 1}vw` }}>
        <div className='task-main'>

            <button className='close-task-btn' onClick={() => setIsOpenDetails(!isOpenDetails)}>X</button>

            <EditableHeading
                className='task-details-title'
                onFinishEditing={onFinishEditing}
                onChange={handleChange}
                type={EditableHeading.types.h4}
                value={newTitle} />

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
            {isAddComment &&

                <form onSubmit={onSubmitNewComment}>
                    <input type='text' placeholder='Add a task comment...' onChange={handleInputChange} />
                    <button className='btn'>Submit</button>
                </form>


            }

            {task.comments ? <section>
                {task.comments.map(comment => <div
                    key={comment.id} className='task-details-task-comment'>
                    <button onClick={() => onDeleteComment(comment)}>X</button>{comment.txt}
                </div>)}
            </section > : <section>
                <div className='details-img-container'><img className="details-img" src="https://cdn.monday.com/images/pulse-page-empty-state.svg" alt="" /></div>

                <p className='details-p' ><span className="details-p-header">No updates yet for this item</span>
                    <span className='details-p-txt'>Be the first one to update about progress, mention someone
                        or upload files to share with your team members</span></p>
            </section >}

        </div >
        <div className='close-task' onClick={() => setIsOpenDetails(!isOpenDetails)}>.</div>
    </section>
}

// function NoCommentsYet() {
//     return <section>
//         <div className='details-img-container'><img className="details-img" src="https://cdn.monday.com/images/pulse-page-empty-state.svg" alt="" /></div>

//         <p className='details-p' ><span className="details-p-header">No updates yet for this item</span>
//             <span className='details-p-txt'>Be the first one to update about progress, mention someone
//                 or upload files to share with your team members</span></p>
//     </section >
// }



{/* <Box className='task-details-add-comment' component="form" noValidate autoComplete="off">
                <div className='task-details-add-comment-tools'>tool-bar here</div>
                <FormControl sx={{ width: '25ch' }} onSubmit={(ev) => handleInputSubmit(ev)}>
                    <OutlinedInput className='task-details-input' placeholder="Please enter text" />
                    <button type='submit' className='btn'>Update</button>
                </FormControl>
            </Box> */}