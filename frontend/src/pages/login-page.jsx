import { useState } from "react";
import { Link } from "react-router-dom";
import { LoginStepTwo } from "../cmps/login-steps/logi-step-two";
import { LoginStepOne } from "../cmps/login-steps/login-step-one";

export function Login() {
    const [loginPaging, setLoginPaging] = useState("login-step-1")
    const [cardentials, setCardentials] = useState({ email: '', password: '' })

    return (
        <section className='login-page'>
            <Link to='/' className="top-header">
                <img className="login-logo" src="" alt="logo" />
            </Link>

            {/* <LoginStepOne cardentials={cardentials} setCardentials={setCardentials} /> */}

            <LoginDynamicCmp

                cardentials={cardentials}
                setLoginPaging={setLoginPaging}
                setCardentials={setCardentials}
                loginPaging={loginPaging} />

        </section>
    )
}

export function LoginDynamicCmp(props) {
    switch (props.loginPaging) {
        case "login-step-1":
            return <LoginStepOne props={{ ...props }} />;
        case "login-step-2":
            return <LoginStepTwo props={{ ...props }} />;

        // default:
        //     return <p>UNKNOWN {cmp}</p>;
    }
}