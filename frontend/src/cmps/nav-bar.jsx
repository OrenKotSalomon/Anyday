import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, logout, signup } from '../store/user.actions.js'

import logo from '../assets/img/logo.png'
// import wm_icon from '../assets/img/wm_icon.avif'
import wm_icon from '../assets/img/sub-icon.png'

import { UserMsg } from './user-msg'
import { ImgUploader } from '../cmps/img-uploader'
import { userService } from '../services/user.service'

import { Icon } from 'monday-ui-react-core'
import { Gallery } from 'monday-ui-react-core/icons'

export function NavBar() {
    const [toggleUserModal, setToggleUserModal] = useState('none')
    const board = useSelector(storeState => storeState.boardModule.board)
    const loggedInUser = userService.getLoggedinUser()
    const navigate = useNavigate()
    const [imgSrc, setImgSrc] = useState(loggedInUser?.imgUrl)
    // const user = useSelector(storeState => storeState.userModule.user)
    useEffect(() => {
        setImgSrc(loggedInUser?.imgUrl)
    }, [loggedInUser])


    async function onLogin(credentials) {
        try {
            const user = await login(credentials)
            showSuccessMsg(`Welcome: ${user.fullname}`)
        } catch (err) {
            showErrorMsg('Cannot login')
        }
    }
    async function onSignup(credentials) {
        try {
            const user = await signup(credentials)
            showSuccessMsg(`Welcome new user: ${user.fullname}`)
        } catch (err) {
            showErrorMsg('Cannot signup')
        }
    }
    async function onLogout() {
        try {
            await logout()
            // showSuccessMsg(`Good bye`)
            setToggleUserModal('none')
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }

    function onClickUserAvatar() {
        if (loggedInUser) {
            setToggleUserModal(((toggleUserModal === 'none') ? 'flex' : 'none'))
        } else {
            navigate(`/login`)
        }
    }

    function getAvatarImg() {
        return (<img className='nav-bar-avatar-img' onClick={onClickUserAvatar}
            src={imgSrc === undefined ? 'https://static-00.iconduck.com/assets.00/profile-user-icon-256x256-zhsk04ey.png' : imgSrc} alt="" />)
    }

    return <div className='side-bar-container'><header className="nav-bar">
        <nav>
            <div>
                <div className="nav-a-container">
                    <NavLink to='/'><img className='nav-bar-logo' src={logo} style={{ minWidth: '55px' }} /></NavLink>
                </div>
                <hr className='nav-logo-hr' />
                <div className="nav-a-container">
                    {/* <NavLink to='/board/'><span className='nav-bar-board-logo-container'>< img className='nav-bar-board-logo' src={wm_icon} style={{ maxWidth: '30px' }} /></span></NavLink> */}
                    <NavLink to='/board/'>< img className='nav-bar-board-logo' src={wm_icon} style={{ maxWidth: '30px' }} /></NavLink>
                    <div className='nav-bar-triangle'></div>
                </div>
            </div>
            {getAvatarImg()}
            <hr className='nav-user-hr' />
            {loggedInUser && <div className='miniUserPanel' style={{ display: `${toggleUserModal}` }}>
                Welcome {loggedInUser.fullname}
                <div>{getAvatarImg()}</div>
                {imgSrc && <img className='uploaded-img' src={`${imgSrc}`} alt="" />}
                <span className='task-details-input-upload'><Icon className='task-details-header-time-icon' iconType={Icon.type.SVG} icon={Gallery} iconLabel="my svg icon" iconSize={18} />Upload profile image</span>

                <ImgUploader setImgSrc={setImgSrc} />

                <button className='btn nav-bar-logout-btn' onClick={onLogout}>Log Out</button>
            </div>}
            <UserMsg />
        </nav>
    </header>
    </div >
}