import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

import { userService } from '../services/user.service.js'

import { LoginStepTwo } from "../cmps/login-steps/login-step-two";
import { LoginStepOne } from "../cmps/login-steps/login-step-one";

import logo from '../assets/img/logo.png'

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
        }
        catch (err) {
            console.error('Error:', err)
        }
    }

    return (
        <section className='login-page'>
            <Link to='/' className="top-header">
                <div className='login-signup-logo'>  <img className="login-logo" src={logo} alt="logo" /> Anyday<span>.com</span> </div>
            </Link>
            <LoginDynamicCmp
                users={users}
                credentials={credentials}
                setLoginPaging={setLoginPaging}
                setCredentials={setCredentials}
                loginPaging={loginPaging} />
        </section>
    )
}

export function LoginDynamicCmp(props, users) {
    switch (props.loginPaging) {
        case "login-step-1":
            return <LoginStepOne props={{ ...props }} users={users} />;
        case "login-step-2":
            return <LoginStepTwo props={{ ...props }} />;
    }
}