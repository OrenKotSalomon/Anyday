import React from 'react'
import { Routes, Route } from 'react-router'

import { UserDetails } from './pages/user-details'
import { HomePage } from './pages/home-page'
import { BoardDetails } from './pages/board-details'
import { Login } from './pages/login-page'
import { Signup } from './pages/signup'

export function RootCmp() {

    return (
        <div>
            <main>
                <Routes>
                    <Route element={<HomePage />} path="/" />
                    {/* <Route element={<AboutUs />} path="/about" /> */}
                    <Route element={<BoardDetails />} path="/board" />
                    <Route element={<BoardDetails />} path="/board/:boardId" />
                    <Route element={<UserDetails />} path="/user-details/:userId" />
                    <Route element={<Login />} path="/login" />
                    <Route element={<Signup />} path="/signup" />
                </Routes>
            </main>
        </div>
    )
}
