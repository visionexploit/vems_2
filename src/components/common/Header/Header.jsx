import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import styles from './Header.module.css'

const Header = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">
          <img src="/assets/images/logos/visionexploit-logo.png" alt="VEMS Logo" />
        </Link>
      </div>

      <nav className={styles.nav}>
        {user ? (
          <>
            <Link to="/dashboard" className={styles.navLink}>Dashboard</Link>
            <Link to="/students" className={styles.navLink}>Students</Link>
            <Link to="/universities" className={styles.navLink}>Universities</Link>
            <Link to="/applications" className={styles.navLink}>Applications</Link>
            <Link to="/payments" className={styles.navLink}>Payments</Link>
            <Link to="/reports" className={styles.navLink}>Reports</Link>
          </>
        ) : (
          <>
            <Link to="/login" className={styles.navLink}>Login</Link>
            <Link to="/register" className={styles.navLink}>Register</Link>
          </>
        )}
      </nav>

      {user && (
        <div className={styles.userMenu}>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{user.name}</span>
            <span className={styles.userRole}>{user.role}</span>
          </div>
          <div className={styles.dropdown}>
            <Link to="/settings" className={styles.dropdownItem}>Settings</Link>
            <button onClick={handleLogout} className={styles.dropdownItem}>Logout</button>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header 