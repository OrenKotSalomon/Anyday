import { NavLink } from "react-router-dom"


export function TaskDetails({ task, isOpenDetails, setIsOpenDetails }) {
    return <section className='task-details' style={{ width: `${isOpenDetails ? 100 : 0}vw` }}>
        <div className='task-main'>
            <button className='close-task-btn' onClick={() => setIsOpenDetails(!isOpenDetails)}>X</button>
            <h1 className='task-details-title'>{task.title}</h1>
            <nav className='task-main-nav'>
                <NavLink className={'task-main-nav-li'} to='#'> Updates </NavLink> |
                <NavLink className={'task-main-nav-li'} to='#'> Files </NavLink> |
                <NavLink className={'task-main-nav-li'} to='#'> Activity Log </NavLink>
            </nav>
            <hr className="task-details-hr"></hr>

            <button className='task-details-open-input-btn'>Write an update...</button>

            <div className='details-img-container'><img className="details-img" src="https://cdn.monday.com/images/pulse-page-empty-state.svg" alt="" /></div>

            <p className='details-p' ><span className="details-p-header">No updates yet for this item</span>
                <span className='details-p-txt'>Be the first one to update about progress, mention someone
                    or upload files to share with your team members</span></p>
        </div>
        <div className='close-task' onClick={() => setIsOpenDetails(!isOpenDetails)}>.</div>

    </section>
}