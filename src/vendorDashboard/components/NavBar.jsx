import React from 'react'

const NavBar = ({showLoginHandler,showRegisterHandler}) => {
  return (
    <div className="navsection">
        <div className="company">
            Vendor Dashbaord
        </div>
        <div className="useAuth">
            <span onClick={showLoginHandler}>Login</span>/
            <span onClick={showRegisterHandler}>Register</span>
        </div>
    </div>
  )
}

export default NavBar
