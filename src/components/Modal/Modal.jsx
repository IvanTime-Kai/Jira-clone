import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { PRIORITY } from 'redux/types/PriorityTypes'
import { ALL_STATUS } from 'redux/types/StatusTypes'
import { Editor } from '@tinymce/tinymce-react'
import HtmlParser from 'react-html-parser'
import './Modal.scss'
import { EDIT_TASK } from 'redux/types/TaskTypes'
import { UPDATE_TASK } from 'redux/types/TaskTypes'
import { Menu, Dropdown } from 'antd';
import { DELETE_ASIGNESS } from 'redux/types/TaskTypes'
import { ADD_ASIGNESS } from 'redux/types/TaskTypes'
import { TASK_TYPE } from 'redux/types/TaskTypes'
import { UPDATE_COMMENT } from 'redux/types/CommentTypes'
import { DELETE_COMMENT } from 'redux/types/CommentTypes'
import { INSERT_COMMENT } from 'redux/types/CommentTypes'
import { DELETE_TASK } from 'redux/types/TaskTypes'

export default function Modal(props) {


    const { taskDetail, taskType } = useSelector(state => state.TaskReducer)
    const { allStatus } = useSelector(state => state.StatusReducer)
    const { priority } = useSelector(state => state.PriorityReducer)
    const { allComment } = useSelector(state => state.CommentReducer)
    const { userLogin } = useSelector(state => state.UserReducer)





    const { modalProjectDetail } = props




    const [visible, setVisible] = useState(false)
    const [hide, setHide] = useState(false)
    const [idComment, setIdComment] = useState('')
    const [contentComment, setContentComment] = useState({
        comment : '',
        newComment : ''
    })
    const [content, setContent] = useState('')
    const [history, setHistory] = useState('')



    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({
            type: ALL_STATUS
        })
        dispatch({
            type: PRIORITY
        })
        dispatch({
            type: TASK_TYPE
        })
    }, [])

    


    const renderDescription = () => {
        return <div>
            {visible ?
                <div>
                    <Editor
                        name='description'
                        initialValue={taskDetail.description}
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar: 'undo redo | formatselect | ' +
                                'bold italic backcolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }
                        }
                        onEditorChange={(content, editor) => {
                            setContent(content)
                        }
                        } />
                    <button className="btn btn-primary m-2" onClick={() => {
                        setVisible(false)
                        dispatch({
                            type: UPDATE_TASK,
                            actionType: EDIT_TASK,
                            name: 'description',
                            value: content
                        })
                    }}>Save</button>
                    <button className="btn btn-dark m-2" onClick={() => {
                        dispatch({
                            type: UPDATE_TASK,
                            actionType: EDIT_TASK,
                            name: 'description',
                            value: history
                        })
                        setVisible(false)
                    }}>Close</button>
                </div>
                : <span style={{ cursor: 'pointer' }} onClick={(e) => {
                    setVisible(true)
                    setHistory(taskDetail.description)
                }}
                >{HtmlParser(taskDetail.description)}</span>}
        </div>
    }

    const renderMenu = () => {
        return (
            <Menu onClick={(item) => {
                let user = modalProjectDetail.members.find(user => user.userId === parseInt(item.key))
                dispatch({
                    type: UPDATE_TASK,
                    actionType: ADD_ASIGNESS,
                    user
                })
            }}>
                {modalProjectDetail.members?.filter(mem => {
                    let index = taskDetail.assigness?.findIndex(user => user.id === mem.userId)
                    if (index !== -1) {
                        return false
                    }
                    return true
                })?.map((user, index) => {
                    return (
                        <Menu.Item key={user.userId}>{user.name}</Menu.Item>
                    )
                })}
            </Menu>
        )
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch({
            type: UPDATE_TASK,
            actionType: EDIT_TASK,
            name,
            value
        })
    }

    // console.log('render');

    const handleChangeContent = (e) => {
        const {name, value} = e.target
        setContentComment({
            ...contentComment,
            [name] : value
        })
        console.log(contentComment.comment);
    }

    return (
        <div className="modal fade" id="infoModal" tabIndex={-1} role="dialog" aria-labelledby="infoModal" aria-hidden="true">
            <div className="modal-dialog modal-info">
                <div className="modal-content">
                    <div className="modal-header row">
                        <div className="col-md-6">
                        <div className="task-title d-flex items-center">
                            { taskDetail.taskTypeDetail?.taskType === 'bug ' ? <i className="fa fa-bookmark" /> : <i className="fa fa-exclamation-circle"></i>}
                            <select name="typeId" className=" mx-3" value={taskDetail.typeId} onChange={handleChange}>
                                {taskType.map((item) => {
                                    return <option key={item.id} value={item.id}>{item.taskType}</option>
                                })}
                            </select>
                            <span>{taskDetail?.taskName}</span>
                        </div>
                        </div>
                        <div className="col-md-6">
                        <div style={{ display: 'flex' }} className="task-click">
                            <div>
                                <i className="fab fa-telegram-plane" />
                                <span>Give feedback</span>
                            </div>
                            <div>
                                <i className="fa fa-link" />
                                <span>Copy link</span>
                            </div>
                            <i className="fa fa-trash-alt" style={{ cursor: 'pointer' }} onClick={() => {
                                dispatch({
                                    type : DELETE_TASK,
                                    data : {
                                        taskId : taskDetail?.taskId,
                                        projectId : taskDetail?.projectId
                                    }
                                })
                                document.getElementById('btn-close').click();
                            }} />
                            <button id="btn-close" type="button" className="close" data-dismiss="modal" aria-label="Close"  >
                                <span aria-hidden="false">×</span>
                            </button>
                        </div>
                        </div>
                    </div>
                    <div className="modal-body">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-8">
                                    <p className="issue">This is an issue of type: Task.</p>
                                    <div className="description">
                                        <p>Description</p>
                                        {renderDescription()}
                                    </div>
                                    <div className="comment">
                                        <h6>Comment</h6>
                                        <div className="block-comment" style={{ display: 'flex' }}>
                                            <div className="avatar">
                                                <img src={userLogin.avatar} alt="anh" className="rounded-full w-12 h-12" />
                                            </div>
                                            <div className="input-comment">
                                                <input id="newComment" type="text" placeholder="Add a comment ..." name="newComment" onChange={handleChangeContent} />
                                                <div className="btn__comment my-4 ">
                                                    <button className="btn btn-primary mr-2" onClick={() => {
                                                        dispatch({
                                                            type : INSERT_COMMENT,
                                                            data : {
                                                                taskId : taskDetail?.taskId,
                                                                contentComment : contentComment.newComment
                                                            }
                                                        })
                                                        document.getElementById('newComment').value=''
                                                    }}>Save</button>
                                                    <button className="btn btn-light" onClick={() => {
                                                        document.getElementById('newComment').value=''
                                                    }} >Cancel</button>
                                                </div>
                                            </div>
                                        </div>
                                        {allComment?.map((item, index) => {
                                            return (                   
                                                <div className="lastest-comment" key={index}>
                                                    <div className="comment-item">
                                                        <div className="display-comment" style={{ display: 'flex' }}>
                                                            <div className="avatar">
                                                                <img src={item.user.avatar} className="rounded-full w-12 h-12" alt="anh" />
                                                            </div>
                                                            <div className="w-full">
                                                                <p style={{ marginBottom: 5 }}>
                                                                    {item.user.name} <span> - a month ago  </span>
                                                                </p>
                                                                { hide && item.id === idComment  ? 
                                                                <input className="form-control" name="comment" value={contentComment.comment === '' ? item.contentComment : contentComment.comment}  onChange={handleChangeContent} ></input> :
                                                                <p style={{ marginBottom: 5, cursor: 'pointer' }} onClick={() => {
                                                                    setHide(true)
                                                                    setIdComment(item.id)
                                                                }}>
                                                                    {contentComment.comment === '' ? item.contentComment : contentComment.comment}
                                                                </p>     
                                                                }

                                                                { userLogin.id === item.user.userId ? hide && item.id === idComment ? 
                                                                <div className="my-4 ">
                                                                    <button className="btn btn-success mr-2" onClick={() => {
                                                                        dispatch({
                                                                            type : UPDATE_COMMENT,
                                                                            data : {
                                                                                id : item.id,
                                                                                content : contentComment.comment                                                                              
                                                                            },
                                                                            taskId : item.taskId
                                                                        })
                                                                        setHide(false)
                                                                    }}>Edit</button>
                                                                    <button className="btn btn-danger" onClick={() => {
                                                                        dispatch({
                                                                            type : DELETE_COMMENT,
                                                                            data : {
                                                                                id : item.id,
                                                                                taskId : item.taskId
                                                                            }
                                                                        })
                                                                    }}>Delete</button>
                                                                </div> : '' : ''
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="status">
                                        <h6>STATUS</h6>
                                        <select name="statusId" className="custom-select" value={taskDetail?.statusId} onChange={handleChange} >
                                            {allStatus?.map((item) => {
                                                return <option key={item.statusId} value={item.statusId}>{item.statusName}</option>
                                            })}
                                        </select>
                                    </div>
                                    <div className="assignees">
                                        <h6>ASSIGNEES</h6>
                                        <div className="row" style={{ display: 'flex', alignItems: 'center' }}>
                                            {taskDetail.assigness?.map((user) => {
                                                return (
                                                    <div className="item col-4" key={user.id}>
                                                        <div className="avatar">
                                                            <img src={user.avatar} alt="user" />
                                                        </div>
                                                        <p className="name">
                                                            {user.name}

                                                        </p>
                                                        <i className="fa fa-times" style={{ marginLeft: 5, cursor: 'pointer' }} onClick={() => {
                                                            dispatch({
                                                                type: UPDATE_TASK,
                                                                actionType: DELETE_ASIGNESS,
                                                                id: user.id
                                                            })

                                                        }} />
                                                    </div>
                                                )
                                            })}
                                            <div className="col-4" style={{ display: 'flex', alignItems: 'center' }}>
                                                <Dropdown className="d-flex" overlay={renderMenu()} trigger={['click']}>
                                                    {/* <span> <i className="fa fa-plus" style={{ marginRight: 5,  }} /> Add more</span>  */}
                                                    <a className="ant-dropdown-link items-center" onClick={e => e.preventDefault()}>
                                                        <i className="fa fa-plus" style={{ marginRight: 5 }} />Add more
                                                    </a>
                                                </Dropdown>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="reporter">
                                        <h6>REPORTER</h6>
                                        <div className="item">
                                            <div className="avatar">
                                                <img src={`https://ui-avatars.com/api/?name=${modalProjectDetail.creator?.name}`} alt="anh" />
                                            </div>
                                            <p className="name">
                                                {modalProjectDetail.creator?.name}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="priority" style={{ marginBottom: 20 }}>
                                        <h6>PRIORITY</h6>
                                        <select name="priorityId" className="custom-select p-1" value={taskDetail?.priorityId} onChange={handleChange}>
                                            {priority?.map((item) => {
                                                return <option key={item.priorityId} value={item.priorityId}>{item.priority}</option>
                                            })}
                                        </select>
                                    </div>
                                    <div className="estimate">
                                        <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                                        <input name="originalEstimate" type="text" className="estimate-hours" value={taskDetail?.originalEstimate} onChange={handleChange} />
                                    </div>
                                    <div className="time-tracking">
                                        <h6>TIME TRACKING</h6>
                                        <div style={{ display: 'flex' }}>
                                            <i className="fa fa-clock" />
                                            <div style={{ width: '100%', padding: '5px' }}>
                                                <div className="progress">
                                                    <div className="progress-bar" role="progressbar" style={{ width: `${Math.round((parseInt(taskDetail?.timeTrackingSpent) / (parseInt(taskDetail?.timeTrackingSpent) + parseInt(taskDetail?.timeTrackingRemaining))) * 100)}%` }} aria-valuenow={taskDetail?.timeTrackingSpent} aria-valuemin={0} aria-valuemax={(parseInt(taskDetail?.timeTrackingSpent) + parseInt(taskDetail?.timeTrackingRemaining))} />
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <p className="logged">{taskDetail?.timeTrackingSpent}h logged</p>
                                                    <p className="estimate-time">{taskDetail?.timeTrackingRemaining}h estimated</p>
                                                </div>
                                                <div className="row">
                                                    <div className="col-6">
                                                        <p>Time spent </p>
                                                        <input name="timeTrackingSpent" value={taskDetail?.timeTrackingSpent} min={0} type="number" className="form-control" onChange={handleChange} />
                                                    </div>
                                                    <div className="col-6">
                                                        <p>Time remaining </p>
                                                        <input name="timeTrackingRemaining" value={taskDetail?.timeTrackingRemaining} min={0} type="number" className="form-control" onChange={handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ color: '#929398' }}>Create at a month ago</div>
                                    <div style={{ color: '#929398' }}>Update at a few seconds ago</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
