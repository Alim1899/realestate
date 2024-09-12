import React from 'react'
import classes from './Navbar.module.css'
import logo from '../../../assets/logo.svg'
const Navbar = () => {
  return (
    <div className={classes.main}>
      <img className={classes.logo} src={logo} alt='Logo'></img>
    </div>
  )
}

export default Navbar
