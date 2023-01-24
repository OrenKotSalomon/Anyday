import { useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux';

import { userService } from '../services/user.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js';

import { FacebookProvider, LoginButton } from 'react-facebook';

export function LoginFaceBook() {
    const axios = require('axios')
    const navigate = useNavigate()
    const boards = useSelector((storeState) => storeState.boardModule.boards)

    //todo - on move to server have to make it with try & chatch
    function handleSuccess(response) {
        const ACCESS_TOKEN = response.authResponse.accessToken
        let credentials, user
        axios.get(`https://graph.facebook.com/me?fields=name,email,picture&access_token=${ACCESS_TOKEN}`).then((userData) => {
            credentials = { isSocialMediaLogin: true, email: userData.data.email, username: '', password: '', fullname: userData.data.name, imgUrl: userData.data.picture.data.url ? userData.data.picture.data.url : 'https://filestore.community.support.microsoft.com/api/images/39da0bc2-ad7d-434d-bc10-fb80d3a85b7c?upload=true' }
        })
            .then(() => {
                user = userService.signup(credentials)
                // showSuccessMsg(`Welcome ${user.fullname}`)
                navigate(`/board/${boards[0]._id}`)
            })
    }

    function handleError(error) {
        console.log(error);
    }

    return <div>
        <FacebookProvider appId="731484244948295">
            <LoginButton
                scope="email"
                onError={handleError}
                onSuccess={handleSuccess}
            >
                Login via Facebook
            </LoginButton>
        </FacebookProvider>


    </div>

}