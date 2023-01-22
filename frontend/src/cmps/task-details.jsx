import * as React from 'react'
import { useState, useRef, useEffect } from "react"

// import FormControl, { useFormControl } from '@mui/material/FormControl';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import Box from '@mui/material/Box';

import { TabList, Tab, EditableHeading, Icon, MenuButton, Menu, MenuItem, } from 'monday-ui-react-core'
import { Home, Time, Delete, Gallery, Emoji, Underline, Bullets, Italic, Drag, Close } from 'monday-ui-react-core/icons'

import { utilService } from '../services/util.service.js';
import { boardService } from '../services/board.service.js';
import { CHANGE_TASK_TITLE, ADD_TASK_COMMENT, DELETE_TASK_COMMENT } from '../services/board.service.local.js';
import { updateTask } from '../store/board.actions';




export function TaskDetails({ task, isOpenDetails, setIsOpenDetails, board, group }) {
    const [isAddComment, setAddComment] = useState(false)
    const [newTitle, setNewTitle] = useState(task.title)
    const [newCommentTxt, setComment] = useState('')
    const [imgSrc, setImg] = useState('')
    const emojis = ['😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍', '😘', '🥰', '😗', '😙', '🥲', '🤔', '🤩', '🤗', '🙂', '😚', '🙄', '😶‍🌫️', '😶', '😑', '😐', '🤨', '😯', '🤐', '😮', '😥', '😣', '😏']
    const [isEmojiPicker, SetEmojiPicker] = useState(false)
    const [taskCommentsSize, SetTaskCommentsSize] = useState(44)
    const [initX, setX] = useState('')

    function onSubmitNewComment(ev) {
        ev.preventDefault()
        let data = boardService.getEmptyTaskComment(newCommentTxt, imgSrc)
        let taskChanges = { comment: data, taskId: task.id, groupId: group.id }
        updateTask(board, taskChanges, ADD_TASK_COMMENT)
        setComment('')
        setAddComment(!isAddComment)
    }

    function onDeleteComment(comment) {
        let taskChanges = { commentIdx: comment.id, taskId: task.id, groupId: group.id }
        updateTask(board, taskChanges, DELETE_TASK_COMMENT)
    }

    function handleInputChange(ev) {
        ev.preventDefault()
        setComment(ev.target.value)
    }

    function onFinishEditing() {
        let taskChanges = { title: newTitle, taskId: task.id, groupId: group.id }
        updateTask(board, taskChanges, CHANGE_TASK_TITLE)
    }

    function handleChange(value) {
        if (!value) return setNewTitle(task.title)
        setNewTitle(value)
    }


    //...................imge upload
    const inputRef = useRef(null);

    const handleClick = () => {
        inputRef.current.click();
    }

    const handleFileChange = event => {

        const file = event.target.files[0];
        getBase64(file).then(base64 => {
            setImg(base64)
            console.log(base64)
        })
    }

    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        })
    }
    //.....................................................


    function toggleEmojiPicker() {
        SetEmojiPicker(!isEmojiPicker)
    }

    function getInitX(ev) {
        // console.log('init-drag', ev.clientX)
        setX(ev.clientX)
    }

    function dragstart(ev) {
        if (ev.clientX === 0) {
            return
        }
        let diff = (initX - ev.clientX)/300
        if(ev.clientX-taskCommentsSize + diff > ev.clientX) return
        SetTaskCommentsSize(taskCommentsSize + diff)
    }



    return <section className='task-details' style={{ width: `${isOpenDetails ? 100 : 1}vw` }}>
        <div className='task-main' style={{ width: `${taskCommentsSize}%` }}>

            <button className='close-task-btn' onClick={() => setIsOpenDetails(!isOpenDetails)}>
            <Icon iconType={Icon.type.SVG} icon={Close} iconLabel="my svg icon" iconSize={16} />
            </button>

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

            {!isAddComment && <div className='task-details-open-input-btn-container'><button onClick={() => setAddComment(!isAddComment)} className='task-details-open-input-btn'>Write an update...</button></div>}
            {isAddComment &&

                <form className='task-details-form' onSubmit={onSubmitNewComment}>
                    <div className='task-details-textbox-container'>
                    <div className='task-details-form-tools'>
                        <Icon className='task-details-header-time-icon' iconType={Icon.type.SVG} icon={Underline} iconLabel="my svg icon" iconSize={34} />
                        <Icon className='task-details-header-time-icon' iconType={Icon.type.SVG} icon={Bullets} iconLabel="my svg icon" iconSize={34} />
                        <Icon className='task-details-header-time-icon' iconType={Icon.type.SVG} icon={Italic} iconLabel="my svg icon" iconSize={34} />
                    </div>
                    <textarea className='task-details-input'
                        type='text' name=''
                        placeholder='Add a task comment...'
                        onChange={handleInputChange}
                        value={newCommentTxt} />

                    {isEmojiPicker && <div className="emoji-picker">
                        {emojis.map(emoji => <span key={emoji} className='emoji' onClick={() => setComment(newCommentTxt + emoji)}>{emoji}</span>)}
                    </div>}

                    <div className='task-details-input-footer'>
                        <span onClick={handleClick} className='task-details-input-upload'><Icon className='task-details-header-time-icon' iconType={Icon.type.SVG} icon={Gallery} iconLabel="my svg icon" iconSize={18} />Add image</span>
                        <span onClick={toggleEmojiPicker} className='task-details-input-upload emoji'><Icon className='task-details-header-time-icon' iconType={Icon.type.SVG} icon={Emoji} iconLabel="my svg icon" iconSize={18} />Emoji</span>
                        <button className='btn task-details-input-btn'>Update</button>

                    </div>
                    </div>
                    {imgSrc && <span className="task-details-img-preview-container" ><img className="task-details-img-preview" src={imgSrc} /><span>Uploaded</span></span>}

                    <div>
                        <input
                            style={{ display: 'none' }}
                            ref={inputRef}
                            type="file"
                            onChange={handleFileChange}
                        />
                    </div>
                </form>


            }

            {(Array.isArray(task.comments) && task.comments.length) ? <section>
                {task.comments.map(comment => <div
                    key={comment.id} className='task-details-task-comment'>

                    <div className='task-details-header'>
                        <div className='task-details-by-user'>
                            <img className='task-details-by-user-img' src="https://files.monday.com/use1/photos/37922174/thumb_small/37922174-user_photo_2023_01_08_16_06_35.png?1673193996" alt="" />
                            <h1 className='task-details-by-user-name' >User Name</h1>
                        </div>

                        <div className='task-details-header-tools'>
                            <Icon className='task-details-header-time-icon' iconType={Icon.type.SVG} icon={Time} iconLabel="my svg icon" iconSize={14} />
                            <div className='task-details-created-at'>{utilService.time_ago(comment.createdAt)}</div>
                            <MenuButton className="task-details-menu-btn" >
                                <Menu
                                    id="task-details-menu"
                                    size="medium"
                                >
                                    <MenuItem
                                        onClick={() => onDeleteComment(comment)}
                                        icon={Delete}
                                        title="Delete update for every one"
                                    />

                                </Menu>
                            </MenuButton>
                        </div>
                    </div>

                    <p className='task-details-comment-txt'>{comment.txt}</p>
                    {comment.imgUrl && comment.imgUrl !== '' ? <img src={`${comment.imgUrl}`} alt="" /> : ''}



                </div>)}
            </section > : <section>
                <div className='details-img-container'><img className="details-img" src="https://cdn.monday.com/images/pulse-page-empty-state.svg" alt="" /></div>
                <p className='details-p' ><span className="details-p-header">No updates yet for this item</span>
                    <span className='details-p-txt'>Be the first one to update about progress, mention someone
                        or upload files to share with your team members</span></p>
            </section >}



            <div className="slide-panel-resizer" draggable="true" onDrag={dragstart} onMouseDown={getInitX}
            >
                <Icon className='task-details-header-time-icon' iconType={Icon.type.SVG} icon={Drag} iconLabel="my svg icon" iconSize={14} />
            </div>


        </div >
        <div className='close-task' style={{ width: `${100 - taskCommentsSize}%` }} onClick={() => setIsOpenDetails(!isOpenDetails)}>.</div>
    </section>
}

