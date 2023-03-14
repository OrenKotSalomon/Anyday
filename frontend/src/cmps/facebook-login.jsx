import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux';

import { userService } from '../services/user.service.js'

import { FacebookProvider, LoginButton } from 'react-facebook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF } from '@fortawesome/free-brands-svg-icons'
const axios = require('axios')


export function LoginFaceBook() {
    const [DBusers, setUsers] = useState([])
    const navigate = useNavigate()
    const boards = useSelector((storeState) => storeState.boardModule.boards)

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

    async function handleSuccess(response) {
        const ACCESS_TOKEN = response.authResponse.accessToken
        try {
            const userData = await axios.get(`https://graph.facebook.com/me?fields=name,email,picture&access_token=${ACCESS_TOKEN}`)
            const FBuser = { isSocialMediaLogin: true, email: userData.data.email, username: '', password: 'social-media-pw', fullname: userData.data.name, imgUrl: userData.data.picture.data.url ? userData.data.picture.data.url : 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10228639569717408&height=50&width=50&ext=1677684524&hash=AeSzD8dsx8BSqcN34cg' }
            if (DBusers.find(user => user.fullname === FBuser.fullname)) {
                userService.login(FBuser)
            } else {
                userService.signup(FBuser)
            }
            navigate(`/`)
        }
        catch (err) {
            console.log(err)
        }
    }

    function handleError(err) {
        console.log(err);
    }

    return (
        <FacebookProvider appId="731484244948295">
            <LoginButton
                scope="email"
                onError={handleError}
                onSuccess={handleSuccess}
                className='btn login-fb'
            >
                <FontAwesomeIcon icon={faFacebookF} /> <span>Login via Facebook</span>
            </LoginButton>
        </FacebookProvider>
    );
}
