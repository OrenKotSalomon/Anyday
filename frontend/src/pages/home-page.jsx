import React from 'react'
import { Link } from 'react-router-dom'

import logo from '../assets/img/logo.png'



export function HomePage() {
    const baseImgUrl = `https://dapulse-res.cloudinary.com/image/upload/f_auto,q_auto/remote_mondaycom_static/img/customers/logos-v2/`
    const logoImgUrls = ['genpact', 'HoltCat', 'canva', 'coca_cola', 'lionsgate', 'hulu', 'bd', 'Electronic_Arts', 'universal']

    return (
        <section className='home-page'>

            <header className="home-page-top-header">
                <img className="header-logo" src={logo} alt="logo" />monday<span>.com</span>
            </header>
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
                    <div className='logo-box'><img className='home-page-company-logo' src="https://i.pinimg.com/236x/a5/57/4a/a5574a2d7a158993b62d844a7500e8a9.jpg" alt="" /></div>
                    <div className='logo-box'><img className='home-page-company-logo' src="https://i.pinimg.com/236x/c7/6b/fc/c76bfc66677d34cb2c0cca5644372b86.jpg" alt="" /></div>
                    <div className='logo-box'><img className='home-page-company-logo' src="https://i.pinimg.com/236x/fe/f7/d8/fef7d8df084688bde2142679847f955c.jpg" alt="" /></div>
                    <div className='logo-box'><img className='home-page-company-logo' src="https://i.pinimg.com/236x/11/ed/46/11ed4612dfffa5e87dd5159bb0c58cf1.jpg" alt="" /></div>
                    <div className='logo-box'><img className='home-page-company-logo' src="https://i.pinimg.com/236x/9e/6d/78/9e6d78530e910d5eaeaa1a90e71ced48.jpg" alt="" /></div>
                    <div className='logo-box'><img className='home-page-company-logo' src="https://i.pinimg.com/236x/ee/e1/0f/eee10f79d31d14797555188723dae124.jpg" alt="" /></div>
                    <div className='logo-box'><img className='home-page-company-logo' src="https://i.pinimg.com/236x/44/fa/33/44fa335b8d59303e196d06dde6434ef0.jpg" alt="" /></div>
                    <div className='logo-box'><img className='home-page-company-logo' src="https://i.pinimg.com/236x/63/d2/9e/63d29ead9c56d2a6bb0e3eff5bb7e3eb.jpg" alt="" /></div>
                    <div className='logo-box'><img className='home-page-company-logo' src="https://i.pinimg.com/236x/f2/91/49/f29149ddb0616e30aa2f704fb27379ab.jpg" alt="" /></div>

                    {/* {logoImgUrls.map(url => <div className='logo-box'><img className='home-page-company-logo' key={url} src={`${baseImgUrl + url}.png`} alt="" /></div>)} */}
                </div>
                <h2>The Work OS that lets you
                    shape workflows, <span className='home-page-span-bold'>your way</span></h2>
                <p className='home-page-p'>Boost your team’s alignment, efficiency, and productivity by customizing any workflow to fit your needs.
                </p>

            </div>
        </section >
    )
}