import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux';

import { userService } from '../../services/user.service.js'
import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service.js';

import { Icon, Loader } from 'monday-ui-react-core';
import { MoveArrowRight } from 'monday-ui-react-core/icons';

export function LoginStepTwo({ props }) {
    const boards = useSelector((storeState) => storeState.boardModule.boards)
    const [loginCredentials, setLoginCredentials] = useState({ email: props.credentials.email,
           username: '', password: '', fullname: '', imgUrl: '' })
    const navigate = useNavigate()

    function clearState() {
        setLoginCredentials({ email: '', username: '', password: '', fullname: '', imgUrl: '' })
    }

    function handleChange({ target }) {
        let { value, name: field, type } = target
        setLoginCredentials(prevMail => ({ ...prevMail, [field]: value }))
    }

    async function onSubmitLogin(ev) {
        ev.preventDefault()
        console.log('login cred..', loginCredentials)
        const valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (loginCredentials.email.match(valid)) {
            try {
                const user = await userService.login(loginCredentials)
                showSuccessMsg(`Welcome ${user.fullname}`)
                clearState()
                navigate(`/board/${boards[0]._id}`)
            } catch (err) {
                showErrorMsg('OOps try again', err)
            }
        }
    }
        return (
            <section className='login-step-two'>
                <div className="router-wrapper">
                    <div className="email-password-container">
                        <h1 className="login-header">
                            <b>Log</b>
                            {" In"}
                        </h1>

                        <div className="email-page-two">
                            <form className="email-password-input-and-button-container">
                                <div className="form-input-container">
                                    <span className="email-password-label">Email</span>
                                    <div className="email-input-container">
                                        <input onChange={handleChange} id="user_email" value={props.credentials.email} placeholder="Example@company.com" type="email" name="email"
                                            className="email-input" aria-label="Enter your work email address" required />
                                    </div>
                                </div>
                                <div className="form-input-container">
                                    <span className="email-password-label">Password</span>
                                    <div className="password-input-container">
                                        <input onChange={handleChange} className="password-input" id="user_password" type="password" name="password"
                                            placeholder="Password" required />
                                    </div>
                                </div>
                                <div className="next-btn-wrapper">
                                    <div className="next-btn-container">

                                        <button onClick={onSubmitLogin} type="submit" className="next-btn">
                                            <div className="next-wrapper">Log in</div>
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
                                <h2 className="or-sign-in-txt" >Or Sign in with</h2>
                                <span className="seperator-line"></span>
                            </div>
                        </div>

                        <div className="login-to-other-acc">
                            <button onClick={() => props.setLoginPaging('login-step-1')} className="other-acc-btn" >
                                Login to another account</button>
                        </div>
                    </div>
                </div>
            </section>
        )
    }