import { FacebookProvider, LoginButton } from 'react-facebook';

export function LoginFaceBook() {
    const axios = require('axios')

    function handleSuccess(response) {
        let ACCESS_TOKEN = response
        console.log(ACCESS_TOKEN)
        //  getFBData(ACCESS_TOKEN)

    }

    function handleError(error) {
        console.log(error);
    }


var token = "EAAKZARZCKUNUcBADHwnVHLxUMklpqQSW5edklkEvG3yE3UA8SXLXKvDpZAB6IJmXquDYjiLXEIJtWssykZCvvGIGN4nmEUpdZClf4sxYYg6RIYwz6WurbIEE29uMjrDga6RXKOBvtZCLdrp14TT6gIsnWhpMF7ZA1alnjPmZB3HAk5XlqsBqx0xN8Y62yY5ZAa5XZBZA82v6rE5wk2xZC00OZA94C"
getFBData(token)

    async function getFBData(token) {
        try {
            const res = await axios.get(`https://graph.facebook.com/me?fields="name,gender,location,picture&access_token=${token}`)
            
            // this.http.get(`https://graph.facebook.com/me?fields="name,gender,location,picture&access_token=${token}`, new RequestOptions('Headers':new Headers({'Content-type:application/json'}))).then(result=>{});

            
            console.log(res.data)
        }
        catch (err) {
            console.log('error', err)
        }
    }

    return (
        <FacebookProvider appId="">
            <LoginButton
                scope="email"
                onError={handleError}
                onSuccess={handleSuccess}
            >
                Login via Facebook
            </LoginButton>
        </FacebookProvider>
    );
}