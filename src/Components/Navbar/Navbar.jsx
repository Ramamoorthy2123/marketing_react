import React from "react"
import './Navbar.css'
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png"





const Navbar = () => {

  return (
    <>
    <header id="navbar_header">
        <section id="logo">
            <img src={logo} alt="Logo" id="imgLogo"/>
            
        </section>
        <section>
            {/* <button>Admin</button> */}
            <Link to="adminlogin" id="Link" className="Link ">Admin</Link>
            <Link to="userlogin" id="Link" className="Link ">User</Link>
        </section>
        
    
    </header>
  
    
    
    </>
  )
}
export default Navbar;