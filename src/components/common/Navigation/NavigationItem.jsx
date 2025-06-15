import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Navigation.module.css'

const NavigationItem = ({ title, path, icon }) => {
  return (
    <li className={styles.menuItem}>
      <NavLink
        to={path}
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
      >
        <span className={styles.icon}>
          <i className={`material-icons`}>{icon}</i>
        </span>
        <span className={styles.title}>{title}</span>
      </NavLink>
    </li>
  )
}

export default NavigationItem 