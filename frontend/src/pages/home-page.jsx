import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import logo from '../assets/img/logo.png'
import { Link } from 'react-router-dom'

export function HomePage() {
    // const dispatch = useDispatch()



    return (
        <section className='home-page'>
            {/* <img src={logo} alt="Logo" style={{ maxWidth: '300px' }} /> */}
         
         //TODO app header cmp..

            <div className='home-page-hero'>
                <h1>A platform built for a new way of working</h1>
                <h3>What would you like to manage with sprint4.com Work OS?</h3>
            </div>

            <div>
                <Link className='btn-get-started' to='/board'>Get Started &#8594; </Link>
                <span>No credit needed</span><span>Unlimited time on Free plan</span>
            </div>
        </section >
    )
}