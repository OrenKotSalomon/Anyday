import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

import { loadBoards } from '../store/board.actions'

import { Icon, Loader } from 'monday-ui-react-core';
import { MoveArrowRight } from 'monday-ui-react-core/icons';

import logo from '../assets/img/logo.png'
import hero from '../assets/img/home-page-hero.jpg'

export function HomePage() {
    const boards = useSelector((storeState) => storeState.boardModule.boards)

    useEffect(() => {
        loadBoards()
    }, [])

    function scrollTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    if (!boards.length) return <div className="loader"><Loader size={Loader.sizes.LARGE} /></div>
    return (
        <section className='home-page'>

            <header className="home-page-top-header"
                onClick={scrollTop}>
                <img className="header-logo" src={logo} alt="logo" />Anyday<span>.com</span>
            </header>

            <div className='home-page-hero'>
                <h1 className='home-page-hero-header'><span className='header-top-txt'>A platform built for a</span><span className='header-lower-txt'>new way of working</span></h1>
                <h3 className='home-page-hero-sub-header' >What would you like <span className='home-page-sub-header-span'>to manage</span> with sprint4.com Work OS?</h3>
            </div>

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

            <div className='home-page-bottom-container'>
                <img className='home-page-image' src={hero} alt="" />
                <h3>Trusted by 152,000+ customers worldwide</h3>
                <h2>The Work OS that lets you
                    shape workflows, <span className='home-page-span-bold'>your way</span></h2>
                <p className='home-page-p'>Boost your team’s alignment, efficiency, and productivity by customizing any workflow to fit your needs.
                </p>

            </div>
        </section >
    )
}