import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import routes from '../routes'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { login, logout, signup } from '../store/user.actions.js'
import { LoginSignup } from './login-signupReference.jsx'
import logo from '../assets/img/logo.png'
import Harel from '../assets/img/Harel.jpg'
import wm_icon from '../assets/img/wm_icon.avif'
import { Avatar } from 'monday-ui-react-core'

export function NavBar() {

    const user = useSelector(storeState => storeState.userModule.user)

    async function onLogin(credentials) {
        console.log('hi:')
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

    return <div className='side-bar-container'><header className="nav-bar">

        <nav>
            <div>
                <div className="nav-a-container">
                    <NavLink to='/'><img className='nav-bar-logo' src={logo} style={{ minWidth: '55px' }} /></NavLink>
                </div>
                <hr style={{ width: '75%' }} />
                <div className="nav-a-container">
                    <NavLink to='/board/'>< img className='nav-bar-board-logo' src={wm_icon} style={{ maxWidth: '30px' }} /></NavLink>
                </div>
            </div>
            {/* <button>Notifications</button> */}
            {/* <NavLink to='/inbox'>Inbox</NavLink> */}
            {/* <NavLink to='/my_work'>My Work</NavLink> */}
            {/* <button>Favorites</button> */}

            {/* <button>Search</button> */}

            <Link to='/login'><Avatar
                className='nav-bar-avatar'
                ariaLabel="Harel Natan"
                size="large"
                src={Harel}
                type="img"
            /></Link>

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
    </div>
}