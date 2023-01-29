import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux';

import { userService } from '../services/user.service.js'

import { FacebookProvider, LoginButton } from 'react-facebook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF } from '@fortawesome/free-brands-svg-icons'
const axios = require('axios')

// export function LoginFaceBook() {
//     const axios = require('axios')
//     const navigate = useNavigate()
//     const boards = useSelector((storeState) => storeState.boardModule.boards)
//     const [DBusers, setUsers] = useState([])

//     useEffect(() => {
//         loadUsers()
//     }, [])

//     async function loadUsers() {
//         try {
//             const users = await userService.getUsers()
//             setUsers(users)
//             console.log('users', users)
//         }
//         catch (err) {
//             console.error('Error:', err)
//         }
//     }

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
            const FBuser = { isSocialMediaLogin: true, email: userData.data.email, username: '', password: 'social-media-pw', fullname: userData.data.name, imgUrl: userData.data.picture.data.url ? userData.data.picture.data.url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqOplc5fcAaHwZ-1SD2Az_1Fp9-x1QDCt6-w&usqp=CAU' }
            if (DBusers.find(user => user.fullname === FBuser.fullname)) {
                // console.log('fb user login:', FBuser)
                userService.login(FBuser)
            } else {
                // console.log('fb user signup:', FBuser)
                userService.signup(FBuser)
            }
            navigate(`/board/${boards[0]._id}`)
        }
        catch (err) {
            console.log(err)
        }
    }

    function handleError(error) {
        console.log(error);
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
// }







// className='btn login-fb'
//<FontAwesomeIcon icon={faFacebookF}/> <span>Login via Facebook</span>
//-----key: 731484244948295
//test key : 674289491133356



// export function LoginFaceBook() {
//     const axios = require('axios')
//     const navigate = useNavigate()
//     const boards = useSelector((storeState) => storeState.boardModule.boards)
//     const [DBusers, setUsers] = useState([])

//     useEffect(() => {
//         loadUsers()
//     }, [])

//     async function loadUsers() {
//         try {
//             const users = await userService.getUsers()
//             setUsers(users)
//             console.log('users', users)
//         }
//         catch (err) {
//             console.error('Error:', err)
//         }
//     }


//     //todo - on move to server have to make it with try & chatch
//     function handleSuccess(response) {
//         console.log('success response', response)
//         const ACCESS_TOKEN = response.authResponse.accessToken
//         let credentials
//         axios.get(`https://graph.facebook.com/me?fields=name,email,picture&access_token=${ACCESS_TOKEN}`).then((userData) => {
//             return { isSocialMediaLogin: true, email: userData.data.email, username: '', password: 'social-media-pw', fullname: userData.data.name, imgUrl: userData.data.picture.data.url ? userData.data.picture.data.url : '' }
//         })
//             .then((credentials) => {
//                 if (DBusers?.some((DBuser) => DBuser.email === credentials.email)) {
//                     userService.login(credentials)
//                 } else {
//                     userService.signup(credentials)
//                 }
//                 // showSuccessMsg(`Welcome ${user.fullname}`)

//             }).then(navigate(`/board/${boards[0]._id}`))
//     }

//     function handleError(error) {
//         console.log(error);
//     }

//     return (
//         <FacebookProvider
//             appId="731484244948295">
//             <LoginButton
//                 className='btn login-fb'
//                 scope="email"
//                 onError={handleError}
//                 onSuccess={handleSuccess}
//             >
//                <FontAwesomeIcon icon={faFacebookF}/> <span>Login via Facebook</span>
//             </LoginButton>
//         </FacebookProvider>)
// }