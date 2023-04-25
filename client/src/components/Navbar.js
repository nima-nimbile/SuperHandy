import React, { useState } from 'react';
import { Link } from "react-router-dom"
import logo from "./doc/Logo.PNG"
import Login from './Login';
import Register from './Register';
import "./navbar.scss"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setShowLogin(false);
    setShowRegister(false)
  }

  const handleLoginClick = () => {
    setShowLogin(true);
  }
  const handleRegisterClick = () => {
    setShowRegister(true);
  }

  return (
    <div className='navbar-page'>
    <div className="mainOne">
      <div className='logo'>
        <img src={logo} alt="logo" width="450" height="350"/>
        <button className="explore" onClick={toggleMenu}><a href="/#menu">Explore More</a></button>
      </div>

      {isOpen && (
        <div className="pop" id="menu">
          <div className="content">
            <Link to="#menu" className="close" onClick={toggleMenu}></Link>
            <div className="navOne">
              <ul className="navOne_list">
                <div className="navOne_list_item">
                  {showLogin || showRegister ? null : <li><Link to="/about">About</Link></li>}
                </div>
                <div className="navOne_list_item">
                  {showLogin || showRegister ? null : <li><Link to="/contact">Contact Us</Link></li>}
                </div>
                <div className="navOne_list_item">
                  {showLogin || showRegister ? null : <li><Link to="/#menu" onClick={handleLoginClick}>Login</Link></li>}
                </div>
                <div className="navOne_list_item">
                  {showLogin || showRegister ? null : <li><Link to="/#menu" onClick={handleRegisterClick}>Register</Link></li>}
                </div>
              </ul>
            </div>
          </div>
        </div>
      )}
      {showLogin && (
        <Login /> 
      )}
      {showRegister && (
        <Register /> 
      )}
    </div>
    </div>
  )
}

export default Navbar;
