import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Header.css'

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const closeMenu = () => {
        setIsMenuOpen(false)
    }

    return (
        <header className="header glass">
            <div className="header-container">
                {/* Logo */}
                <Link to="/" className="logo" onClick={closeMenu}>
                    <div className="logo-icon">
                        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="20" cy="20" r="18" fill="url(#logoGradient)" />
                            <path
                                d="M20 30s-7.5-5.625-7.5-11.25c0-3.125 2.5-5.625 5-5.625 1.563 0 2.5.938 2.5.938s.937-.938 2.5-.938c2.5 0 5 2.5 5 5.625C27.5 24.375 20 30 20 30z"
                                fill="white"
                            />
                            <defs>
                                <linearGradient id="logoGradient" x1="0" y1="0" x2="40" y2="40">
                                    <stop stopColor="#10B981" />
                                    <stop offset="1" stopColor="#059669" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <div className="logo-text">
                        <span className="logo-name">Al-Khair</span>
                        <span className="logo-tagline">Charity</span>
                    </div>
                </Link>

                {/* Navigation */}
                <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
                    <NavLink to="/" className="nav-link" onClick={closeMenu}>
                        Home
                    </NavLink>
                    <NavLink to="/about" className="nav-link" onClick={closeMenu}>
                        About
                    </NavLink>
                    <NavLink to="/donate" className="nav-link" onClick={closeMenu}>
                        Donate
                    </NavLink>
                    <NavLink to="/contact" className="nav-link" onClick={closeMenu}>
                        Contact
                    </NavLink>
                </nav>

                {/* CTA Button */}
                <Link to="/donate" className="header-cta btn btn-primary btn-sm" onClick={closeMenu}>
                    Donate Now
                </Link>

                {/* Mobile Menu Toggle */}
                <button
                    className={`menu-toggle ${isMenuOpen ? 'menu-open' : ''}`}
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <span className="menu-bar"></span>
                    <span className="menu-bar"></span>
                    <span className="menu-bar"></span>
                </button>
            </div>
        </header>
    )
}

export default Header
