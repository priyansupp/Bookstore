import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/react.svg'

const Header = () => {
  return (
    <header>
        <Link to='/' className='logo'>
            <img src={logo} alt='React_Logo' />
            BookStore Management System
        </Link>
        <nav>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/books'>Books</NavLink>
            <NavLink to='/about'>About</NavLink>
        </nav>
    </header>
  )
}

export default Header