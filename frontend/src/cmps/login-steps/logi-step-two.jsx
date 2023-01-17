export function LoginStepTwo({ props }) {

    function handleChange({ target }) {
        let { value, name: field, type } = target
        // props.setEmail(value)
        console.log(field);
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
                        <div className="email-password-input-and-button-container">

                            <div className="form-input-container">
                                <span className="email-password-label">Email</span>
                                <div className="email-input-container">
                                    <input onChange={handleChange} id="user_email" value={props.cardentials.email} placeholder="Example@company.com" type="email"
                                        className="email-input" aria-label="Enter your work email address" required />
                                </div>
                            </div>
                            <div className="form-input-container">
                                <span className="email-password-label">Password</span>
                                <div className="password-input-container">
                                    <input onChange={handleChange} className="password-input" id="user_password" type="password" name="password"
                                        required />
                                </div>
                            </div>
                            <div className="next-btn-wrapper">
                                <div className="next-btn-container">

                                    <button className="next-btn">
                                        <div className="next-wrapper">Log in</div>
                                        <div className="right-arrow-icon">{'->'}</div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="login-seperator-container">
                        <div className="login-seperator">
                            <span className="seperator-line"></span>
                            <h2 className="or-sign-in-txt" >Or Sign in with</h2>
                            <span className="seperator-line"></span>
                        </div>
                    </div>
                    <div className="login-seperator-long">
                        <span className="seperator-long-line"></span>
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