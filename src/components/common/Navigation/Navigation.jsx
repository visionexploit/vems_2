import React from 'react'
import { NavLink } from 'react-router-dom'
import NavigationItem from './NavigationItem'
import styles from './Navigation.module.css'

const Navigation = () => {
  const menuItems = [
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: 'dashboard'
    },
    {
      title: 'Students',
      path: '/students',
      icon: 'people'
    },
    {
      title: 'Universities',
      path: '/universities',
      icon: 'school'
    },
    {
      title: 'Applications',
      path: '/applications',
      icon: 'description'
    },
    {
      title: 'Payments',
      path: '/payments',
      icon: 'payment'
    },
    {
      title: 'Reports',
      path: '/reports',
      icon: 'assessment'
    },
    {
      title: 'Settings',
      path: '/settings',
      icon: 'settings'
    }
  ]

  return (
    <nav className={styles.navigation}>
      <div className={styles.logo}>
        <img src="/assets/images/logos/visionexploit-icon.png" alt="VEMS" />
        <span>VEMS</span>
      </div>

      <ul className={styles.menu}>
        {menuItems.map((item) => (
          <NavigationItem
            key={item.path}
            title={item.title}
            path={item.path}
            icon={item.icon}
          />
        ))}
      </ul>

      <div className={styles.footer}>
        <p className={styles.version}>Version 1.0.0</p>
      </div>
    </nav>
  )
}

export default Navigation 