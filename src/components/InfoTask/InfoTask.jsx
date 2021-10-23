import React, {useState} from 'react'
import './InfoTask.scss'
import { Input } from 'antd'
import './InfoTask.scss'
import { useSelector, useDispatch } from 'react-redux'
import { SEARCH_TASK_DRAWER } from 'redux/types/TaskTypes'
// import HtmlParser from 'react-html-parser'


const { Search } = Input

export default function InfoTask(props) {

    const { InfoProjectDetail } = props

    const dispatch = useDispatch()

    const renderAvatar = () => {
        return InfoProjectDetail.members?.map((item, index) => {
            return (
                <div className="avatar" key={index}>
                    <img src={item.avatar} alt="anh" />
                </div>
            )
        })
    }
    
    return (
        <div className="info__task">
            <h3>{InfoProjectDetail.projectName}</h3>
            <div className="info__task-content">
                <div className="task__input">
                    <Search placeholder="input search text" enterButton onSearch={(value, event) => {

                        console.log(event)
                        let array = InfoProjectDetail.lstTask?.map((item) => {
                            return ({...item, lstTaskDeTail : item.lstTaskDeTail?.filter((p) => {
                                return p.taskName.toLowerCase().indexOf(value.toLowerCase()) !== -1
                                })})
                        })
                        let searchArray = {...InfoProjectDetail, lstTask : array}
                        dispatch({
                            type : SEARCH_TASK_DRAWER,
                            data : searchArray
                        })
                    }} />
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
