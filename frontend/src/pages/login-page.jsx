import { useState } from "react";
import { Link } from "react-router-dom";
import { LoginStepTwo } from "../cmps/login-steps/logi-step-two";
import { LoginStepOne } from "../cmps/login-steps/login-step-one";

export function Login() {
    const [loginPaging, setLoginPaging] = useState("login-step-1")
    const [email, setEmail] = useState('')

    return (
        <section className='login-page'>
            <header className="top-header">
                <img className="login-logo" src="" alt="logo" />
            </header>
            <LoginDynamicCmp setLoginPaging={setLoginPaging}
                setEmail={setEmail}
                loginPaging={loginPaging} />

        </section>
    )
}

export function LoginDynamicCmp(props) {
    switch (props.loginPaging) {
        case "login-step-1":
            return <LoginStepOne props={{ ...props }} />;
        case "login-step-2":
            return <LoginStepTwo />;
        // default:
        //     return <p>UNKNOWN {cmp}</p>;
    }
}