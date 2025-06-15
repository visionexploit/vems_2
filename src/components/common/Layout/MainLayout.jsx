import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import styles from './MainLayout.module.css'

const MainLayout = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <div className={styles.content}>
          <p>&copy; {new Date().getFullYear()} Vision Exploit. All rights reserved.</p>
          <div className={styles.links}>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/contact">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default MainLayout 