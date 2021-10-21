import React from 'react'
import './HeaderTask.scss'

export default function HeaderTask() {
    return (
        <div className="header__task">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">Ivantime</li>
                    <li className="breadcrumb-item">Project</li>
                    <li className="breadcrumb-item">JiraClone</li>
                </ol>
            </nav>
        </div>
    )
}
