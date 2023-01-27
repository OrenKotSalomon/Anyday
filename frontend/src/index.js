import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { store } from './store/store'
import { RootCmp } from './root-cmp'
import "monday-ui-react-core/dist/main.css"
import './assets/styles/main.scss'

// const FB = window.FB;
// window.fbAsyncInit = function() {
//   FB.init({
//     appId      : '731484244948295',
//     xfbml      : true,
//     version    : 'v15.0'
//   });
//   FB.AppEvents.logPageView();
// };

// (function(d, s, id){
//    var js, fjs = d.getElementsByTagName(s)[0];
//    if (d.getElementById(id)) {return;}
//    js = d.createElement(s); js.id = id;
//    js.src = "https://connect.facebook.net/en_US/sdk.js";
//    fjs.parentNode.insertBefore(js, fjs);
//  }(document, 'script', 'facebook-jssdk'));


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router>
      <RootCmp />
    </Router>
  </Provider>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
