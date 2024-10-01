import React from "react"
import './Header.css'
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png"
import { RiAdminFill } from "react-icons/ri";
import { FaUserLarge } from "react-icons/fa6";




const Header = () => {

  return (
    <> 
    
    <main>
    
    <section className="card">
    <RiAdminFill  className="icon"/>
    <h2>ADMIN</h2>
    <div className="btn">
    <Link to="adminsignup" className="Link">Sign Up</Link>
    <br />
    <Link to="adminlogin" className="Link">Log In</Link>
    </div>
    </section>
    {/* User Card */}
    <section className="card">
    <FaUserLarge   className="icon"/>
    <h2>USER</h2>
    <div className="btn">
    <Link to="usersignup" className="Link">Sign Up</Link> <br />
    <Link to="userlogin" className="Link">Log In</Link>
    </div>
    </section>
    </main>
    </>
  )
}
export default Header