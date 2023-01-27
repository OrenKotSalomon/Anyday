import { useState, useRef, useEffect } from "react"

import { utilService } from '../services/util.service.js';
import { boardService } from '../services/board.service.js';
import { updateTask } from '../store/board.actions';
import { TextEditor } from './text-editor.jsx';
import { CHANGE_TASK_TITLE, ADD_TASK_COMMENT, DELETE_TASK_COMMENT, PIN_TASK_COMMENT, UNPIN_TASK_COMMENT } from '../services/board.service.local.js';
import { userService } from '../services/user.service.js'

import { TabList, Tab, EditableHeading, Icon, MenuButton, Menu, MenuItem, } from 'monday-ui-react-core'
import { Home, Time, Delete, Gallery, Emoji, Drag, Close, Pin } from 'monday-ui-react-core/icons'

export function TaskDetails({ task, isOpenDetails, setIsOpenDetails, board, group, setIsDndModeDisabled }) {

    const [loggedInUser, setLoggedInUser] = useState(userService.getLoggedinUser())
    const [isAddComment, setAddComment] = useState(false)
    const [newTitle, setNewTitle] = useState(task.title)
    const [newCommentTxt, setComment] = useState('')
    const [imgSrc, setImg] = useState('')
    const emojis = ['😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍', '😘', '🥰', '😗', '😙', '🥲', '🤔', '🤩', '🤗', '🙂', '😚', '🙄', '😶‍🌫️', '😶', '😑', '😐', '🤨', '😯', '🤐', '😮', '😥', '😣', '😏']
    const [isEmojiPicker, SetEmojiPicker] = useState(false)
    const [taskCommentsSize, SetTaskCommentsSize] = useState(44)
    const [initX, setX] = useState('')
    const [tabList, setTabList] = useState(0)

    var mobileLayout = window.matchMedia("(min-width: 320px)")
    var tabletLayout = window.matchMedia("(min-width: 700px)")
    var desktopLayout = window.matchMedia("(min-width: 1200px)")

    useEffect(() => {
        mediaSizeOptimize()
    }, []);

    function mediaSizeOptimize() {
        if (desktopLayout.matches) {
            SetTaskCommentsSize(44)
        }
        else if (tabletLayout.matches) {
            SetTaskCommentsSize(60)
        }
        else if (mobileLayout.matches) {
            SetTaskCommentsSize(100)
        }
    }

    function onSubmitNewComment(ev) {
        ev.preventDefault()
        if (!newCommentTxt) return
        let data = boardService.getEmptyTaskComment(newCommentTxt, imgSrc, loggedInUser)
        let taskChanges = { comment: data, taskId: task.id, groupId: group.id }
        updateTask(board, taskChanges, ADD_TASK_COMMENT)
        //reset data
        setComment('')
        setImg('')
        setAddComment(!isAddComment)
        console.log(data)
    }

    function onDeleteComment(comment, isPinned = false) {
        let taskChanges = { commentIdx: comment.id, taskId: task.id, groupId: group.id, isPinned: isPinned }
        updateTask(board, taskChanges, DELETE_TASK_COMMENT)
    }

    function onPinToTop(comment) {
        let taskChanges = { commentIdx: comment.id, taskId: task.id, groupId: group.id }
        updateTask(board, taskChanges, PIN_TASK_COMMENT)
    }

    function onUnpinFromTop(comment) {
        let taskChanges = { commentIdx: comment.id, taskId: task.id, groupId: group.id }
        updateTask(board, taskChanges, UNPIN_TASK_COMMENT)
    }

    function handleInputChange(txt) {
        setComment(txt)
    }

    function onFinishEditing() {
        let taskChanges = { title: newTitle, taskId: task.id, groupId: group.id }
        updateTask(board, taskChanges, CHANGE_TASK_TITLE)
    }

    function handleChange(value) {
        if (!value) return setNewTitle(task.title)
        setNewTitle(value)
    }

    //.......imge upload
    const inputRef = useRef(null);

    const handleClick = () => {
        inputRef.current.click();
    }

    const handleFileChange = event => {

        const file = event.target.files[0];
        getBase64(file).then(base64 => {
            setImg(base64)
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
        setX(ev.clientX)
    }

    function dragstart(ev) {
        if (ev.clientX === 0) {
            return
        }
        let diff = (initX - ev.clientX) / 300
        if (ev.clientX - taskCommentsSize + diff > ev.clientX) return
        SetTaskCommentsSize(taskCommentsSize + diff)
    }

    function getAvatarImg(comment) {
        if (comment.byMember?.imgUrl) {
            return (<img className='task-details-by-user-img' src={comment.byMember.imgUrl} alt="" />)
        } else if (comment.byMember?.fullname) {
            return <div className='task-details-by-user-img' >{(comment.byMember.fullname).charAt(0).toUpperCase()}</div>
        } else {
            return <div className='task-details-by-user-img' >{'G'}</div>
        }
    }

    function renderComments(taskComments, isPinned = false) {
        if (taskComments && taskComments.length)
            return <section>
                {taskComments.map(comment => <div
                    key={comment.id} className='task-details-task-comment'>
                    {isPinned && <div className='pinnedComment'>
                        <Icon className='task-details-header-time-icon' iconType={Icon.type.SVG}
                            icon={Pin} iconLabel="my svg icon" iconSize={14} />Pinned
                    </div>}

                    <div className='task-details-header'>
                        <div className='task-details-by-user'>
                            {getAvatarImg(comment)}
                            <h1 className='task-details-by-user-name' >
                                {comment.byMember?.fullname || 'Guest User'}</h1>
                        </div>

                        <div className='task-details-header-tools'>
                            <Icon className='task-details-header-time-icon'
                                iconType={Icon.type.SVG} icon={Time} iconLabel="my svg icon" iconSize={14} />
                            <div className='task-details-created-at'>{utilService.time_ago(comment.createdAt)}</div>
                            <MenuButton className="task-details-menu-btn" >
                                <Menu
                                    id="task-details-menu"
                                    size="medium">
                                    <MenuItem
                                        onClick={() => { isPinned ? onUnpinFromTop(comment) : onPinToTop(comment) }}
                                        icon={Pin}
                                        title={isPinned ? "Unpin from top" : "Pin to top"} />
                                    <MenuItem
                                        onClick={() => onDeleteComment(comment, isPinned)}
                                        icon={Delete}
                                        title="Delete update for every one" />
                                </Menu>
                            </MenuButton>
                        </div>
                    </div>

                    <p dangerouslySetInnerHTML={{ __html: comment.txt }}></p>
                    {comment.imgUrl && comment.imgUrl !== '' ? <img src={`${comment.imgUrl}`} alt="" /> : ''}

                </div>)}
            </section >
    }





    return <section
        className='task-details' style={{ width: `${isOpenDetails ? 100 : 1}vw` }}>
        <div className='task-main' style={{ width: `${taskCommentsSize}%` }}>

            <button className='close-task-btn' onClick={() => {
                setIsOpenDetails(!isOpenDetails)
                setIsDndModeDisabled(false)
            }}>
                <Icon iconType={Icon.type.SVG} icon={Close} iconLabel="my svg icon" iconSize={16} />
            </button>

            <EditableHeading
                className='task-details-title'
                onFinishEditing={onFinishEditing}
                onChange={handleChange}
                type={EditableHeading.types.h4}
                value={newTitle} />

            <TabList className='task-main-nav'>
                <Tab onClick={(ev) => setTabList(ev)}>
                    <Icon iconType={Icon.type.SVG} icon={Home} iconLabel="my svg icon" iconSize={16} /> Updates
                </Tab>
                <Tab onClick={(ev) => setTabList(ev)}>
                    Activity Log
                </Tab>
            </TabList>

            <hr className="task-details-hr"></hr>
            {tabList === 0 ? <div>
                {!isAddComment && <div className='task-details-open-input-btn-container'><button onClick={() => setAddComment(!isAddComment)} className='task-details-open-input-btn'>Write an update...</button></div>}
                {isAddComment &&

                    <form className='task-details-form' onSubmit={onSubmitNewComment}>
                        <div className='task-details-textbox-container'>
                            <TextEditor handleInputChange={handleInputChange} />

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
                {/* pinnedComments */}

                {renderComments(task.pinnedComments, true)}
                {renderComments(task.comments)}

                {(task.pinnedComments && task.comments) ? '' : <section>
                    <div className='details-img-container'><img className="details-img" src="https://cdn.monday.com/images/pulse-page-empty-state.svg" alt="" /></div>
                    <p className='details-p' ><span className="details-p-header">No updates yet for this item</span>
                        <span className='details-p-txt'>Be the first one to update about progress, mention someone
                            or upload files to share with your team members</span></p>
                </section >}
            </div> : <div className="task-activity-log">



                <div className="activity-row">

                    <div className="activity-by">
                        <span className="activity-by-time">🕛20m</span>
                        <span className="activity-by-avatar">
                            <div className='task-details-by-user-img-test' >🥸</div>
                        </span>
                        <span className="activity-by-task">Task1</span>
                    </div>

                    <div className="activity-type">
                        ➡️ Moved
                    </div>

                    <div className="activity-data">
                        To group <span className="activity-color">New Group</span>
                    </div>

                </div>


                <div className="activity-row">

                    <div className="activity-by">
                        <span className="activity-by-time">🕛20m</span>
                        <span className="activity-by-avatar">
                            <div className='task-details-by-user-img-test' >🥸</div>
                        </span>
                        <span className="activity-by-task">Task1</span>
                    </div>

                    <div className="activity-type">
                        ➡️ Moved
                    </div>

                    <div className="activity-data">
                        To group <span className="activity-color">New Group</span>
                    </div>

                </div>


                <div className="activity-row">

                    <div className="activity-by">
                        <span className="activity-by-time">🕛20m</span>
                        <span className="activity-by-avatar">
                            <div className='task-details-by-user-img-test' >🥸</div>
                        </span>
                        <span className="activity-by-task">Task1</span>
                    </div>

                    <div className="activity-type">
                        ➡️ Moved
                    </div>

                    <div className="activity-data">
                        To group <span className="activity-color">New Group</span>
                    </div>

                </div>


                <div className="activity-row">

                    <div className="activity-by">
                        <span className="activity-by-time">🕛20m</span>
                        <span className="activity-by-avatar">
                            <div className='task-details-by-user-img-test' >🥸</div>
                        </span>
                        <span className="activity-by-task">Task1</span>
                    </div>

                    <div className="activity-type">
                        ➡️ Moved
                    </div>

                    <div className="activity-data">
                        To group <span className="activity-color">New Group</span>
                    </div>

                </div>

            </div>}

            <div className="slide-panel-resizer" draggable="true" onDrag={dragstart} onMouseDown={getInitX}>
                <Icon className='task-details-header-time-icon' iconType={Icon.type.SVG} icon={Drag} iconLabel="my svg icon" iconSize={14} />
            </div>

        </div >
        <div className='close-task' style={{ width: `${100 - taskCommentsSize}%` }} onClick={() => {
            setIsOpenDetails(!isOpenDetails)
            setIsDndModeDisabled(false)
        }}>.</div>
    </section>
}
