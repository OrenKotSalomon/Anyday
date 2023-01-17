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
                <Link className='btn-get-started' to='/board'>Get Started <div className='btn-get-started-arrow-container'><span className='btn-get-started-arrow'>&#8594;</span></div> </Link>
                <div className='home-page-promo'><span className='home-page-promo1'>No credit needed</span>✦<span className='home-page-promo2'>Unlimited time on Free plan</span></div>
            </div>

            <img className='home-page-image' src="https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/Generator_featured%20images/Home%20Page%20-%202022%20Rebrand/first_fold/image.png" alt="" />
            <div className='home-page-bottom-container'>
                <h3>Trusted by 152,000+ customers worldwide</h3>
                <div className='home-page-companies-logo'>
                    <img className='home-page-company-logo' src="https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/img/customers/logos-v2/genpact.png" alt="" />
                    <img className='home-page-company-logo' src="https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/img/customers/logos-v2/HoltCat.png" alt="" />
                    <img className='home-page-company-logo' src="https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/img/customers/logos-v2/canva.png" alt="" />
                    <img className='home-page-company-logo' src="https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/img/customers/logos-v2/coca_cola.png" alt="" />
                    <img className='home-page-company-logo' src="https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/img/customers/logos-v2/lionsgate.png" alt="" /> <br></br>
                    <img className='home-page-company-logo' src="https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/img/customers/logos-v2/hulu.png" alt="" />
                    <img className='home-page-company-logo' src="https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/img/customers/logos-v2/bd.png" alt="" />
                    <img className='home-page-company-logo' src="https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/img/customers/logos-v2/Electronic_Arts.png" alt="" />
                    <img className='home-page-company-logo' src="https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/img/customers/logos-v2/universal.png" alt="" />
                </div>
                <h2>The Work OS that lets you
                    shape workflows, <span className='home-page-span-bold'>your way</span></h2>
                <p>Boost your team’s alignment, efficiency, and productivity by customizing any workflow to fit your needs.
                </p>

            </div>
        </section >
    )
}