import React from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../../auth/hooks/useAuth'
import './Navbar.scss'

const Navbar = () => {
    const { User, handleLogout } = useAuth()
    const navigate = useNavigate()

    async function onLogout() {
        await handleLogout()
        navigate('/login')
    }

    return (
        <header className="navbar">
            <div className="navbar__brand">
                <svg className="navbar__icon" viewBox="0 0 24 24" width="22" height="22" fill="none">
                    <rect x="3" y="12" width="4" height="9" rx="1" fill="currentColor" />
                    <rect x="10" y="7" width="4" height="14" rx="1" fill="currentColor" />
                    <rect x="17" y="3" width="4" height="18" rx="1" fill="currentColor" />
                </svg>
                <span className="navbar__title">Moodify</span>
            </div>

            <div className="navbar__user">
                <span className="navbar__username">{User?.username}</span>
                <button className="navbar__logout" onClick={onLogout}>Logout</button>
            </div>
        </header>
    )
}

export default Navbar
