import { useState } from "react";
import { Link } from "react-router-dom";

export function LoginStepOne({ }) {

    return (
        <section className='login-step-one'>
            <div className="router-wrapper">
                <div className="email-first-component">
                    <h1 className="login-title">Log in to your account</h1>
                    <div className="email-page">
                        <div className="email-input-and-button-container">
                            <div className="input-container">
                                <label className="user-email-label" htmlFor="user_email">
                                    Enter your work email address</label>
                                <input id="user_email" placeholder="Example@company.com" type="email"
                                    className="email-input" aria-label="Enter your work email address" required />
                            </div>
                            <div className="next-btn-container">
                                <button className="next-btn">
                                    <div className="next-wrapper">Next</div>
                                    <div className="right-arrow-icon">{'->'}</div>
                                </button>
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
                </div>
                <div className="suggest-signup-container">
                    <span className="signup-quest">Don't you have an account yet?</span> <div ><Link className="sign-up" to="/signup">Sign up</Link></div>
                </div>

            </div>
        </section>
    )
}