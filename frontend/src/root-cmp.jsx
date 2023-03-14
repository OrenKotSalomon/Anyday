import React from 'react'
import { Routes, Route } from 'react-router'

import { UserDetails } from './pages/user-details'
import { HomePage } from './pages/home-page'
import { BoardDetails } from './pages/board-details'
import { Login } from './pages/login-page'
import { SignUp } from './pages/sign-up'
import { UserMsg } from './cmps/user-msg'
import { Kanban } from './pages/kanban'
import { Dashboard } from './pages/dashboard'

export function RootCmp() {

    return <div>
        <main>
            <Routes>
                <Route element={<HomePage />} path="/" />
                <Route element={<BoardDetails />} path="/board/:boardId" />
                <Route element={<Kanban />} path="/:boardId/views/kanban" />
                <Route element={<Dashboard />} path="/:boardId/views/dashboard" />
                <Route element={<UserDetails />} path="/user-details/:userId" />
                <Route element={<Login />} path="/login" />
                <Route element={<SignUp />} path="/signup" />
            </Routes>
        </main>
        <UserMsg />
    </div>
}
