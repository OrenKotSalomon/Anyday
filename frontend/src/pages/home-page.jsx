import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import logo from '../assets/img/logo.png'

export function HomePage() {
    const dispatch = useDispatch()

 

    return (
        <section>
            <img src={logo} alt="Logo" style={{ maxWidth: '300px' }} />
         
        </section >
    )
}