import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { userService } from '../services/user.service.js'
import { login, logout, signup } from '../store/user.actions.js'

import { useSelector } from 'react-redux'

// import routes from '../routes'
// import { LoginSignup } from './login-signupReference.jsx'
import logo from '../assets/img/logo.png'
// import Harel from '../assets/img/Harel.jpg'
import wm_icon from '../assets/img/wm_icon.avif'
import { UserMsg } from './user-msg'
import { useNavigate } from 'react-router'
// import { Avatar } from 'monday-ui-react-core'

export function NavBar() {
    const [toggleUserModal, setToggleUserModal] = useState('none')
    const board = useSelector(storeState => storeState.boardModule.board)
    const loggedInUser = userService.getLoggedinUser()
    const navigate = useNavigate()

    // const user = useSelector(storeState => storeState.userModule.user)

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
            showSuccessMsg(`Good bye`)
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


    function getAvatarImg(loggedInUser) {
        {
            if (loggedInUser?.imgUrl) {
                return (<img className='nav-bar-avatar-img' onClick={onClickUserAvatar} src={loggedInUser.imgUrl} alt="" />)
            } else if (loggedInUser?.fullname) {
                return <div className='nav-bar-avatar-img' onClick={onClickUserAvatar}>{(loggedInUser.fullname).charAt(0).toUpperCase()}</div>
            } else {
                return <div className='nav-bar-avatar-img' onClick={onClickUserAvatar}>{'G'}</div>
            }
        }
    }

    return <div className='side-bar-container'><header className="nav-bar">

        <nav>
            <div>
                <div className="nav-a-container">
                    <NavLink to='/'><img className='nav-bar-logo' src={logo} style={{ minWidth: '55px' }} /></NavLink>
                </div>
                <hr style={{ width: '75%' }} />
                <div className="nav-a-container">
                    <NavLink to='/board/'>< img className='nav-bar-board-logo' src={wm_icon} style={{ maxWidth: '30px' }} /></NavLink>
                </div>
            </div>
            {/* <button>Notifications</button> */}
            {/* <NavLink to='/inbox'>Inbox</NavLink> */}
            {/* <NavLink to='/my_work'>My Work</NavLink> */}
            {/* <button>Favorites</button> */}

            {/* <button>Search</button> */}

            {/* <Link to='/login'><Avatar
                className='nav-bar-avatar'
                ariaLabel="Harel Natan"
                size="large"
                src={Harel}
                type="img"
            /></Link> */}

            {getAvatarImg(loggedInUser)}

            {loggedInUser && <div className='miniUserPanel' style={{ display: `${toggleUserModal}` }}>
                wellcome {loggedInUser.fullname}

                <button className='btn nav-bar-logout-btn' onClick={onLogout}>Log Out</button>
            </div>}
            <UserMsg />

        </nav>

        {/* <nav>
                {routes.map(route => <NavLink key={route.path} to={route.path}>{route.label}</NavLink>)}

                {user &&
                    <span className="user-info">
                        <Link to={`user/${user._id}`}>
                            {user.imgUrl && <img src={user.imgUrl} />}
                            {user.fullname}
                        </Link>
                        <span className="score">{user.score?.toLocaleString()}</span>
                        <button onClick={onLogout}>Logout</button>
                    </span>
                }
                {!user &&
                    <section className="user-info">
                        <LoginSignup onLogin={onLogin} onSignup={onSignup} />
                    </section>
                }
            </nav> */}
    </header>
    </div >
}