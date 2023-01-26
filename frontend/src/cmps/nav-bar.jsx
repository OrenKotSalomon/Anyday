import { useState, useRef } from 'react'
import { useNavigate } from 'react-router'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { userService } from '../services/user.service.js'
import { login, logout, signup } from '../store/user.actions.js'

import logo from '../assets/img/logo.png'
import wm_icon from '../assets/img/wm_icon.avif'
import { UserMsg } from './user-msg'

import {  Icon } from 'monday-ui-react-core'
import {  Gallery} from 'monday-ui-react-core/icons'

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

    async function setUserImg(img){
        try{
            userService.changeImage(img)
            showSuccessMsg(`New image updated successfully!`)
        }
        catch(err){
            console.error(err)
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

  //.......imge upload
  const inputRef = useRef(null);

  const handleClick = () => {
      inputRef.current.click();
  }

  const handleFileChange = event => {

      const file = event.target.files[0];
      getBase64(file).then(base64 => {
          setUserImg(base64)
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
            {getAvatarImg(loggedInUser)}
            {loggedInUser && <div className='miniUserPanel' style={{ display: `${toggleUserModal}` }}>
                wellcome {loggedInUser.fullname}
                <div>{getAvatarImg()}</div>
                <span onClick={handleClick} className='task-details-input-upload'><Icon className='task-details-header-time-icon' iconType={Icon.type.SVG} icon={Gallery} iconLabel="my svg icon" iconSize={18} />Upload profile image</span>
                <div>
                        <input
                            style={{ display: 'none' }}
                            ref={inputRef}
                            type="file"
                            onChange={handleFileChange}
                        />
                    </div>
                <button className='btn nav-bar-logout-btn' onClick={onLogout}>Log Out</button>
            </div>}
            <UserMsg />
        </nav>
    </header>
    </div >
}