import { useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'

import { userService } from '../services/user.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js';

import { useSelector } from 'react-redux';
import { FacebookProvider, LoginButton } from 'react-facebook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF } from '@fortawesome/free-brands-svg-icons'

export function LoginFaceBook() {
    const axios = require('axios')
    const navigate = useNavigate()
    const boards = useSelector((storeState) => storeState.boardModule.boards)
    const [DBusers, setUsers] = useState([])

    useEffect(() => {
        loadUsers()
    }, [])

    async function loadUsers() {
        try {
            const users = await userService.getUsers()
            setUsers(users)
            console.log('users', users)
        }
        catch (err) {
            console.error('Error:', err)
        }
    }

    // todo- for server
    // function initFB() {
    //     window.fbAsyncInit = function () {
    //         FB.init({
    //             appId: "key",
    //             version: 'v2.1' // use version 2.1
    //         });
    //     }}


    //todo - on move to server have to make it with try & chatch
    function handleSuccess(response) {
        const ACCESS_TOKEN = response.authResponse.accessToken
        let credentials
        axios.get(`https://graph.facebook.com/me?fields=name,email,picture&access_token=${ACCESS_TOKEN}`).then((userData) => {
            return { isSocialMediaLogin: true, email: userData.data.email, username: '', password: 'social-media-pw', fullname: userData.data.name, imgUrl: userData.data.picture.data.url ? userData.data.picture.data.url : '' }
        })
            .then((credentials) => {
                if (DBusers?.some((DBuser) => DBuser.email === credentials.email)) {
                    userService.login(credentials)
                } else {
                    userService.signup(credentials)
                }
                // showSuccessMsg(`Welcome ${user.fullname}`)

            }).then(navigate(`/board/${boards[0]._id}`))
    }

    function handleError(error) {
        console.log(error);
    }

    return (
        <FacebookProvider
            appId="731484244948295">
            <LoginButton
                className='btn login-fb'
                scope="email"
                onError={handleError}
                onSuccess={handleSuccess}
            >
               <FontAwesomeIcon icon={faFacebookF}/> <span>Login via Facebook</span> 
            </LoginButton>
        </FacebookProvider>)


}

