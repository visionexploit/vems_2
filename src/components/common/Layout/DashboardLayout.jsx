import React from 'react'
import { Outlet } from 'react-router-dom'
import Navigation from '../Navigation/Navigation'
import styles from './DashboardLayout.module.css'

const DashboardLayout = () => {
  return (
    <div className={styles.layout}>
      <Navigation />
      <div className={styles.content}>
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout 