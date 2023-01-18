import { useState } from "react"
import { Link } from "react-router-dom"

export function Signup() {
    const [cardentials, setCardentials] = useState({ email: '', password: '', fullname: '' })

    function handleChange({ target }) {
        let { value, name: field, type } = target
        // props.setCardentials(prevMail => ({ ...prevMail, [field]: value }))
    }

    function submitLogin(ev) {
        ev.prventDefault()
        const valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    }

    return (
        <section className='signup'>
            <Link to='/' className="top-header">
                <img className="login-logo" src="" alt="logo" />
            </Link>

            <div className="router-wrapper">
                <div className="email-password-container">
                    <h1 className="signup-header">
                        <b>Sign</b>
                        {" Up"}
                    </h1>

                    <div className="email-page-two">
                        <form className="email-password-input-and-button-container">

                            <div className="form-input-container">
                                <span className="email-password-label">Email</span>
                                <div className="email-input-container">
                                    <input onChange={handleChange} id="user_email" placeholder="Example@company.com" type="email" name="email"
                                        className="email-input" aria-label="Enter your work email address" required />
                                </div>
                            </div>
                            <div className="form-input-container">
                                <span className="email-password-label">Name</span>
                                <div className="password-input-container">
                                    <input onChange={handleChange} className="name-input" id="user_name" type="text" name="name"
                                        placeholder="Full name" required />
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

                                    <button onClick={submitLogin} type="submit" className="next-btn">
                                        <div className="next-wrapper">Sign up</div>
                                        <div className="right-arrow-icon">{'->'}</div>
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