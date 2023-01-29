import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { logout } from '../store/user.actions.js'
import { userService } from '../services/user.service.js'
import { loadBoards } from '../store/board.actions'

import { Icon, Loader } from 'monday-ui-react-core'
import { MoveArrowRight } from 'monday-ui-react-core/icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

import logo from '../assets/img/logo.png'
import hero from '../assets/img/home-page-hero.jpg'

import Yossi from '../assets/img/Yossi.jpg'
import Oren from '../assets/img/Oren.jpg'
import Harel from '../assets/img/Harel.jpg'
import heroOne from '../assets/img/hero-1.jpg'
import heroTwo from '../assets/img/hero-2.jpg'
import heroThree from '../assets/img/hero-3.jpg'
import { Templates } from '../cmps/templates.jsx'


export function HomePage() {
    const loggedInUser = userService.getLoggedinUser()
    const boards = useSelector((storeState) => storeState.boardModule.boards)
    const filterBy = useSelector((storeState) => storeState.boardModule.filterBy)

    useEffect(() => {
        loadBoards()
    }, [])

    function scrollTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    async function onLogout() {
        try {
            await logout()
        } catch (err) {
            console.error('Have a problem on log-out', err)
        }
    }

    if (!boards.length) return <div className="loader"><Loader size={Loader.sizes.LARGE} /></div>
    return (
        <section className='home-page'>

            <header className="home-page-top-header"
                onClick={scrollTop}>
                <div className='home-page-logo-container'><img className="header-logo" src={logo} alt="logo" />Anyday<span>.com</span></div>
                {/* {loggedInUser ?
                    <div className='home-page-login-signup-container'>
                        Welcome {loggedInUser.fullname}
                        | <a href="#" onClick={onLogout}>LogOut</a>
                    </div>
                    : <div className='home-page-login-signup-container'>
                        Welcome Guest <Link className='home-page-login-signup-link' to={`/login`}> LogIn </Link> |
                        <Link className='home-page-login-signup-link' to={`/signup`}> SignUp </Link> */}


<div className='home-page-login-signup-container'>
<Link className='home-page-login-signup-link' to={`/login`}> LogIn |</Link> 
                        <Link className='home-page-login-signup-link' to={`/signup`}> SignUp </Link>
                        <Link className='home-page-start-nav' to={`/board/${boards[0]._id}`}>
                            Get Started
                            <Icon iconType={Icon.type.SVG} icon={MoveArrowRight} iconSize={14} />
                        </Link>
</div>
                    {/* </div>} */}
            </header>

            <div className='home-page-hero'>
                <h1 className='home-page-hero-header'><span className='header-top-txt'>A platform built for a</span><span className='header-lower-txt'>new way of working</span></h1>
                <h3 className='home-page-hero-sub-header' >What would you like <span className='home-page-sub-header-span'>to manage</span> with sprint4.com Work OS?</h3>
            </div>

            <Templates />

            <span className="elementToFadeInAndOut" style={{ fontSize: '18px', position: 'absolute', top: '4em', right: '11em' }}>✦</span>
            <span className="SecondElementToFadeInAndOut" style={{ fontSize: '12px', position: 'absolute', top: '6em', right: '14em' }}>✦</span>
            <span className="elementToFadeInAndOut" style={{ fontSize: '18px', position: 'absolute', top: '6.5em', right: '4em' }}>✦</span>
            <span className="SecondElementToFadeInAndOut" style={{ fontSize: '12px', position: 'absolute', top: '3.6em', right: '1em' }}>✦</span>
            <span className="elementToFadeInAndOut" style={{ fontSize: '18px', position: 'absolute', top: '4.2em', left: '2.5em' }}>✦</span>
            <span className="SecondElementToFadeInAndOut" style={{ fontSize: '12px', position: 'absolute', top: '6em', left: '1.4em' }}>✦</span>

            <span className="elementToFadeInAndOut" style={{ fontSize: '16px', position: 'absolute', top: '14em', right: '11em' }}>✦</span>
            <span className="SecondElementToFadeInAndOut" style={{ fontSize: '8px', position: 'absolute', top: '16em', right: '14em' }}>✦</span>
            <span className="elementToFadeInAndOut" style={{ fontSize: '16px', position: 'absolute', top: '16.5em', right: '4em' }}>✦</span>
            <span className="SecondElementToFadeInAndOut" style={{ fontSize: '18px', position: 'absolute', top: '13.6em', right: '1em' }}>✦</span>
            <span className="elementToFadeInAndOut" style={{ fontSize: '16px', position: 'absolute', top: '14.2em', left: '3.8' }}>✦</span>
            <span className="SecondElementToFadeInAndOut" style={{ fontSize: '18px', position: 'absolute', top: '16em', left: '4em' }}>✦</span>

            <div className='home-page-link'>
                <Link className='btn-get-started' to={`/board/${boards[0]._id}`}>Get Started <div className='btn-get-started-arrow-container'><span className='btn-get-started-arrow'>
                    <Icon iconType={Icon.type.SVG} icon={MoveArrowRight} iconSize={18} />
                </span></div> </Link>
                <div className='home-page-promo'><span className='home-page-promo1'>No credit needed</span>✦<span className='home-page-promo2'>Unlimited time on Free plan</span></div>
            </div>

            <div className='animation-container'>
                <div className="carousel__container">
                    <div className="carousel__item">
                        <img src={`${heroOne}`} className="carousel__image" />
                    </div>
                    <div className="carousel__item">
                        <img src={`${heroTwo}`} className="carousel__image" />
                    </div>
                    <div className="carousel__item">
                        <img src={`${heroThree}`} className="carousel__image" />
                    </div>
                </div>
            </div>
            <div className='home-page-bottom-container'>
                <div className='home-page-brake'>.</div>
                {/* height: 10vh;
    background-color: #07083c;
    background: linear-gradient(to top, #07083c00 0%, rgb(12 13 74 / 32%)25%, rgb(15 16 72 / 51%)50%, rgb(15 16 72) 100%); */}

                {/* <img className='home-page-image' src={hero} alt="" /> */}
                <h3>Trusted by 152,000+ customers worldwide</h3>
                <h2>The Work OS that lets you
                    shape workflows, <span className='home-page-span-bold'>your way</span></h2>
                <p className='home-page-p'>Boost your team’s alignment, efficiency, and productivity by customizing any workflow to fit your needs.
                </p>

                {/* ******************team******************** */}

                <h2 className='team-header'>Our Team:</h2>

                <div className="team-container">

                    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <div className="our-team">
                            <div className="picture">
                                <img className="img-fluid" src={`${Yossi}`} />
                            </div>
                            <div className="team-content">
                                <h3 className="name">Yossi Karasik</h3>
                                <h4 className="title">FullStuck Developer</h4>
                            </div>
                            <ul className="social">
                                <li><a href="https://www.facebook.com/yossi.karasik/" className="fa fa-facebook" aria-hidden="true"><FontAwesomeIcon icon={faFacebookF} /></a></li>
                                <li><a href="https://github.com/yosikari/" className="fa fa-twitter" aria-hidden="true"><FontAwesomeIcon icon={faGithub} /></a></li>
                                <li><a href="https://www.linkedin.com/in/yossi-karasik-a033561a5/" className="fa fa-google-plus" aria-hidden="true"><FontAwesomeIcon icon={faLinkedin} /></a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <div className="our-team">
                            <div className="picture">
                                <img className="img-fluid" src={`${Oren}`} />
                            </div>
                            <div className="team-content">
                                <h3 className="name">Oren Kot</h3>
                                <h4 className="title">FullStuck Developer</h4>
                            </div>
                            <ul className="social">
                                <li><a href="https://codepen.io/collection/XdWJOQ/" className="fa fa-facebook" aria-hidden="true"><FontAwesomeIcon icon={faFacebookF} /></a></li>
                                <li><a href="https://codepen.io/collection/XdWJOQ/" className="fa fa-twitter" aria-hidden="true"><FontAwesomeIcon icon={faGithub} /></a></li>
                                <li><a href="https://codepen.io/collection/XdWJOQ/" className="fa fa-google-plus" aria-hidden="true"><FontAwesomeIcon icon={faLinkedin} /></a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                        <div className="our-team">
                            <div className="picture">
                                <img className="img-fluid" src={`${Harel}`} />
                            </div>
                            <div className="team-content">
                                <h3 className="name">Harel Natan</h3>
                                <h4 className="title">FullStuck Developer</h4>
                            </div>
                            <ul className="social">
                                <li><a href="https://codepen.io/collection/XdWJOQ/" className="fa fa-facebook" aria-hidden="true"><FontAwesomeIcon icon={faFacebookF} /></a></li>
                                <li><a href="https://codepen.io/collection/XdWJOQ/" className="fa fa-twitter" aria-hidden="true"><FontAwesomeIcon icon={faGithub} /></a></li>
                                <li><a href="https://codepen.io/collection/XdWJOQ/" className="fa fa-google-plus" aria-hidden="true"><FontAwesomeIcon icon={faLinkedin} /></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section >

    )
}