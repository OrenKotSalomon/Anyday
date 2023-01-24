import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

import { userService } from '../services/user.service.js'

import { LoginStepTwo } from "../cmps/login-steps/login-step-two";
import { LoginStepOne } from "../cmps/login-steps/login-step-one";

export function Login() {
    const [loginPaging, setLoginPaging] = useState("login-step-1")
    const [credentials, setCredentials] = useState({ email: '', username: '', password: '', fullname: '', imgUrl: '' })
    const [users, setUsers] = useState([])

    useEffect(() => {
        loadUsers()
    }, [])

    async function loadUsers() {
        try {
            const users = await userService.getUsers()
            setUsers(users)
            console.log('users',users)
        }
        catch (err) {
            console.error('Error:', err)
        }
    }




    return (
        <section className='login-page'>
            <Link to='/' className="top-header">
                <img className="login-logo" src="" alt="logo" />
            </Link>

            {/* <LoginStepOne cardentials={cardentials} setCardentials={setCardentials} /> */}

            <LoginDynamicCmp
                users={users}
                credentials={credentials}
                setLoginPaging={setLoginPaging}
                setCredentials={setCredentials}
                loginPaging={loginPaging} />

        </section>
    )
}

export function LoginDynamicCmp(props , users) {
    switch (props.loginPaging) {
        case "login-step-1":
            return <LoginStepOne props={{ ...props }} users={users}/>;
        case "login-step-2":
            return <LoginStepTwo props={{ ...props }} />;

        // default:
        //     return <p>UNKNOWN {cmp}</p>;
    }
}