import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

import { useSelector } from 'react-redux';

import { userService } from '../services/user.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js';

import logo from '../assets/img/logo.png'

import { Icon } from 'monday-ui-react-core';
import { MoveArrowRight } from 'monday-ui-react-core/icons';

export function SignUp() {
    const boards = useSelector((storeState) => storeState.boardModule.boards)
    const [credentials, setCredentials] = useState({ email: '', username: '', password: '', fullname: '', imgUrl: '' })
    const navigate = useNavigate()

    function clearState() {
        setCredentials({ email: '', username: '', password: '', fullname: '', imgUrl: '' })
    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials({ ...credentials, [field]: value })
    }

    async function onSignup(ev = null) {
        if (ev) ev.preventDefault()
        if (!credentials.email || !credentials.password || !credentials.fullname) return
        // console.log('credentials:', credentials)
        try {
            const user = await userService.signup(credentials)
            showSuccessMsg(`Welcome ${user.fullname}`)
            clearState()
            navigate(`/board/${boards[0]._id}`)
        }
        catch (err) {
            // showErrorMsg('OOps try again', err)
            console.log('error: ',err)
        }
    }

    return (
        <section className='signup'>
            <Link to='/' className="top-header">
            <div className='login-signup-logo'>  <img className="login-logo" src={logo} alt="logo" /> Anyday<span>.com</span> </div>
            </Link>
            <div className="router-wrapper">
                <div className="email-password-container">
                    <h1 className="signup-header">
                        <b>Sign</b>
                        {" Up"}
                    </h1>
                    <div className="email-page-two">
                        <form className="email-password-input-and-button-container"
                            onSubmit={onSignup}>
                            <div className="form-input-container">
                                <span className="email-password-label">Email</span>
                                <div className="email-input-container">
                                    <input
                                        onChange={handleChange}
                                        id="email"
                                        placeholder="Example@company.com"
                                        type="email"
                                        name="email"
                                        className="email-input"
                                        aria-label="Enter your work email address" required />
                                </div>
                            </div>
                            <div className="form-input-container">
                                <span className="email-password-label">Name</span>
                                <div className="password-input-container">
                                    <input
                                        onChange={handleChange}
                                        id="fullname"
                                        type="text"
                                        name="fullname"
                                        className="name-input"
                                        placeholder="Full name" required />
                                </div>
                            </div>
                            <div className="form-input-container">
                                <span className="email-password-label">Password</span>
                                <div className="password-input-container">
                                    <input
                                        onChange={handleChange}
                                        id="password"
                                        type="password"
                                        name="password"
                                        className="password-input"
                                        placeholder="Password" required />
                                </div>
                            </div>
                            <div className="next-btn-wrapper">
                                <div className="next-btn-container">

                                    <button type="submit" className="next-btn">
                                        <div className="next-wrapper">Sign up</div>
                                        <div className="right-arrow-icon">
                                        <Icon iconType={Icon.type.SVG} icon={MoveArrowRight} iconSize={18} />
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="login-seperator-container">
                        <div className="login-seperator">
                            <span className="seperator-line"></span>
                            <h2 className="or-sign-in-txt" >Or</h2>
                            <span className="seperator-line"></span>
                        </div>
                    </div>

                    <Link to='/login' className="login-to-other-acc">
                        <span>Already have an account?   </span>
                        <button className="other-acc-btn" >
                            Log in</button>
                    </Link >
                </div>
            </div>
        </section>
    )
}
