import React from 'react'
import { Link } from 'react-router-dom'


export function HomePage() {

    return (
        <section className='home-page'>

            {/* //TODO app header cmp.. */}

            <div className='home-page-hero'>
                <h1 className='home-page-hero-header'>A platform built for a <br></br> new way of working</h1>
                <h3 className='home-page-hero-sub-header' >What would you like to manage with sprint4.com Work OS?</h3>
            </div>

            <div className='home-page-link'>
                <Link className='btn-get-started' to='/board/boardId'>Get Started <div className='btn-get-started-arrow-container'><span className='btn-get-started-arrow'>&#8594;</span></div> </Link>
                <div className='home-page-promo'><span className='home-page-promo1'>No credit needed</span>✦<span className='home-page-promo2'>Unlimited time on Free plan</span></div>
            </div>
        </section >
    )
}