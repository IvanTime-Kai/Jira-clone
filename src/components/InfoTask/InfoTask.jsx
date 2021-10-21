import React from 'react'
import './InfoTask.scss'
import { Input } from 'antd'
import './InfoTask.scss'
import HtmlParser from 'react-html-parser'


const { Search } = Input

export default function InfoTask(props) {

    const { projectDetail } = props

    const renderAvatar = () => {
        return projectDetail.members?.map((item, index) => {
            return (
                <div className="avatar" key={index}>
                    <img src={item.avatar} alt="anh" />
                </div>
            )
        })
    }

    return (
        <div className="info__task">
            <h3>{projectDetail.projectName}</h3>
            <div className="info__task-content">
                <div className="task__input">
                    <Search placeholder="input search text" enterButton />
                </div>
                <div className="task__avatar ">
                    {renderAvatar()}
                </div>
                <div className="task-item">
                    <span> Only Issues </span>
                    <span> Recently Updated </span>
                </div>
            </div>
        </div>
    )
}
