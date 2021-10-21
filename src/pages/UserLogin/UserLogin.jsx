import Login from 'components/Login/Login'
import Register from 'components/Register/Register'
import React from 'react'
import './UserLogin.scss'

export default function UserLogin() {
    return (
        <div className="box">
            <input type="checkbox" id="btn-toogle" className="toggle-btn" />
            <Login/>
            <Register/>
        </div>
    )
}
