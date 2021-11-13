import React from 'react'
import { NavLink } from 'react-router-dom'
import './Menu.scss'


export default function Menu() {
    return (
        <div className="menu">
            {/* <div className="menu__logo">
                <i className="fab fa-jira"></i>
            </div> */}
            <div className="menu__content">
                <NavLink className="menu__content-item text-black" to="/cyberbugs">
                    <i className="fa fa-credit-card" />
                    <p>Cyber board</p>
                </NavLink>
                <NavLink className="menu__content-item text-black" to="/management">
                    <i className="fa fa-credit-card" />
                    <p>Cyber Manager</p>
                </NavLink>
                <NavLink className="menu__content-item text-black" to="/createproject">
                    <i className="fa fa-cog" />
                    <p>Create project</p>
                </NavLink>
                <NavLink className="menu__content-item text-black" to="/usermanagement">
                    <i className="fa fa-credit-card" />
                    <p>User management</p>
                </NavLink>
                <hr />
                <div className="feature">
                    <div className="feature__item">
                        <i className="fa fa-truck" />
                        <span>Releases</span>
                    </div>
                    <div className="feature__item">
                        <i className="fa fa-equals" />
                        <span>Issues and filters</span>
                    </div>
                    <div className="feature__item">
                        <i className="fa fa-paste" />
                        <span>Pages</span>
                    </div>
                    <div className="feature__item">
                        <i className="fa fa-location-arrow" />
                        <span>Reports</span>
                    </div>
                    <div className="feature__item">
                        <i className="fa fa-box" />
                        <span>Components</span>
                    </div>
                </div>
            </div>
            <hr />
        </div>
    )
}
