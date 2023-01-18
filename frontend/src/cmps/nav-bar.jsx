import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import routes from '../routes'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, logout, signup } from '../store/user.actions.js'
import { LoginSignup } from './login-signupReference.jsx'
import logo from '../assets/img/logo.png'
import wm_icon from '../assets/img/wm_icon.avif'

export function NavBar() {
    const user = useSelector(storeState => storeState.userModule.user)

    async function onLogin(credentials) {
        try {
            const user = await login(credentials)
            showSuccessMsg(`Welcome: ${user.fullname}`)
        } catch (err) {
            showErrorMsg('Cannot login')
        }
    }
    async function onSignup(credentials) {
        try {
            const user = await signup(credentials)
            showSuccessMsg(`Welcome new user: ${user.fullname}`)
        } catch (err) {
            showErrorMsg('Cannot signup')
        }
    }
    async function onLogout() {
        try {
            await logout()
            showSuccessMsg(`Bye now`)
        } catch (err) {
            showErrorMsg('Cannot logout')
        }
    }

    return <header className="nav-bar">

        <nav>
            <NavLink to='/'><img src={logo} alt="Logo" style={{ maxWidth: '100px' }} /></NavLink>
            <NavLink to='/board/:boardId'><img src={wm_icon} alt="Logo" style={{ maxWidth: '50px' }} /></NavLink>
            {/* <button>Notifications</button> */}
            {/* <NavLink to='/inbox'>Inbox</NavLink> */}
            {/* <NavLink to='/my_work'>My Work</NavLink> */}
            {/* <button>Favorites</button> */}

            {/* <button>Search</button> */}
            <Link to='/login'>Login/Icon soon</Link>
        </nav>

        {/* <nav>
                {routes.map(route => <NavLink key={route.path} to={route.path}>{route.label}</NavLink>)}

                {user &&
                    <span className="user-info">
                        <Link to={`user/${user._id}`}>
                            {user.imgUrl && <img src={user.imgUrl} />}
                            {user.fullname}
                        </Link>
                        <span className="score">{user.score?.toLocaleString()}</span>
                        <button onClick={onLogout}>Logout</button>
                    </span>
                }
                {!user &&
                    <section className="user-info">
                        <LoginSignup onLogin={onLogin} onSignup={onSignup} />
                    </section>
                }
            </nav> */}
    </header>
}