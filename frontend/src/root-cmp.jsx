import React from 'react'
import { Routes, Route } from 'react-router'

import routes from './routes'

import { NavBar } from './cmps/nav-bar'
import { UserDetails } from './pages/user-details'
import { HomePage } from './pages/home-page'
import { BoardDetails } from './pages/board-details'
import { BoardIndex } from './pages/board-index'

export function RootCmp() {

    return (
        <div>
            <NavBar />
            <main>
                <Routes>
                    <Route element={<HomePage />} path="/" />
                    {/* <Route element={<AboutUs />} path="/about" /> */}
                    <Route element={<BoardIndex />} path="/board" />
                    <Route element={<BoardDetails />} path="/board/:boardId" />
                    <Route element={<UserDetails />} path="/user-details/:userId" />
                </Routes>
            </main>
            {/* <AppFooter /> */}
        </div>
    )
}


