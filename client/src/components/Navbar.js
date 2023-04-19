import React, { useState } from 'react';
import { Link } from "react-router-dom"
import logo from "./doc/Logo.PNG"
import "./navbar.css"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }
  return (
 
    <div className="container">

      <div className='logo'>
        <img src={logo} alt="logo" width="250" height="200"/>
        <button className="explore" onClick={toggleMenu}><a href="/#menu">Explore More</a></button>
      </div>
      
      {isOpen && (
        <div className="popover" id="menu">
          <div className="content">
            <Link to="#menu" className="close" onClick={toggleMenu}></Link>
            <div className="nav">
              <ul className="nav_list">
                <div className="nav_list_item">
                  <li><Link to="/About">About</Link></li>
                </div>
                <div className="nav_list_item">
                  <li><Link to="/contact">contact Us</Link></li>
                </div>
                <div className="nav_list_item">
                  <li><Link to="/login">Login</Link></li>
                </div>
                <div className="nav_list_item">
                  <li><Link to="/register">Register</Link></li>
                </div>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar;