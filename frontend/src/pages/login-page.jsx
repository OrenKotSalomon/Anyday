import { Link } from "react-router-dom";

export function Login() {
    return (
        <section className='login-page'>
            <header className="top-header">
                <img src="" alt="logo" />
            </header>

            <div className="router-wrapper">
                <div className="email-first-component">
                    <h1>Log in to your account</h1>
                    <div className="email-page">
                        <div className="email-input-and-button-container">
                            <div className="input-container">
                                <label className="user-email-label" htmlFor="user_email">
                                    Enter your work email address</label>
                                <input id="user_email" placeholder="Example@company.com" type="email"
                                    className="email-input" aria-label="Enter your work email address" />
                            </div>
                            <div className="btn-container">
                                <button className="next-btn">
                                    next {'->'}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="login-seperator-container">
                        <div className="login-seperator">
                            <span className="seperator-line"></span>
                            <h2 >Or Sign in with</h2>
                            <span className="seperator-line"></span>
                        </div>
                    </div>
                </div>
                <div className="suggest-signup-container">
                    <span>Don't you have an account yet? <Link to="/signup"></Link></span>
                </div>

            </div>

        </section>
    )
}