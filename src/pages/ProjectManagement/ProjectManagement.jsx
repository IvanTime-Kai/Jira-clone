import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, Tag, Popover, Button, Avatar, Divider,AutoComplete, Popconfirm } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { ALL_PROJECT } from 'redux/types/ProjectTypes';
import './ProjectManagement.scss'
import { ALL_USER } from 'redux/types/UserTypes';
import { ADD_USER_IN_PROJECT } from 'redux/types/UserTypes';
import { DELETE_USER_IN_PROJECT } from 'redux/types/UserTypes';
import { DELETE_PROJECT } from 'redux/types/ProjectTypes';
import { EDIT_PROJECT } from 'redux/types/ProjectTypes';
import EditProject from 'components/EditProject/EditProject';
import { EDIT_PROJECT_DRAWER } from 'redux/types/ProjectTypes';
import { NavLink } from 'react-router-dom';


export default function ProjectManagement() {

    const { allProject } = useSelector(state => state.ProjectReducer)
    const { getUser } = useSelector(state => state.UserReducer)
    


    const dispatch = useDispatch()

    const [value, setValue] = useState('')

    let searchValue = useRef(null)

    useEffect(() => {
        dispatch({
            type: ALL_PROJECT
        })

    }, [])

    const [state, setState] = useState({
        filteredInfo: null,
        sortedInfo: null,
    })

    const handleChange = (pagination, filters, sorter) => {
        setState({
            filteredInfo: filters,
            sortedInfo: sorter,
        });
    };
    // const showDrawer = () => {
    //     setState({
    //         visible: true,
    //     });
    // };

    let { sortedInfo, filteredInfo } = state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
            sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
            ellipsis: true,
        },
        {
            title: 'ProjectName',
            dataIndex: 'projectName',
            key: 'projectName',
            sorter: (item1, item2) => {
                let projectName2 = item2.projectName.trim().toLowerCase();
                let projectName1 = item1.projectName.trim().toLowerCase();
                if (projectName2 > projectName1) {
                    return -1;
                }
                return 1;
            },
            render : (text, record, index) => {
                return <NavLink key={record.id} to={`/projectDetail/${record.id}`}>{record.projectName}</NavLink>
            },
            sortOrder: sortedInfo.columnKey === 'projectName' && sortedInfo.order,
            ellipsis: true,
        },
        {
            title: 'Category',
            dataIndex: 'categoryId',
            key: 'categoryId',
            render: (text, record, index) => {
                return <span key={index}>{record.categoryName}</span>
            },
            ellipsis: true,
        },
        {
            title: 'Creator',
            dataIndex: 'creator',
            key: 'creator',
            render: (text, record, index) => {
                return <Tag color='cyan' className="text-2xl " key={index}>{record.creator.name}</Tag>
            },
            sorter: (item1, item2) => {
                let projectName2 = item2.creator.name?.trim().toLowerCase();
                let projectName1 = item1.creator.name?.trim().toLowerCase();
                if (projectName2 > projectName1) {
                    return -1;
                }
                return 1;
            },
            sortOrder: sortedInfo.columnKey === 'creator' && sortedInfo.order,
            ellipsis: true,
        },
        {
            title: 'Member',
            dataIndex: 'members',
            key: 'members',
            render: (text, record, index) => {
                return (
                    <div key={index} className="d-flex">
                        <Divider className="m-0">
                            <Avatar.Group
                                maxCount={3} size="large"
                                maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
                            >
                                {record.members.map((item, index) => {
                                    return <Popover key={item.userId} title={<span className="text-lg">Delete User</span>} trigger='hover' content={
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th className="pr-4">UserId</th>
                                                    <th className="pr-4">Avatar</th>
                                                    <th className="pr-4">Name</th>
                                                    <th className="pr-4">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{item.userId}</td>
                                                    <td>
                                                        <img src={item.avatar} alt="avatar" width={40} className="rounded-full" />
                                                    </td>
                                                    <td>{item.name}</td>
                                                    <td>
                                                        <button className="btn btn-danger" onClick={() => {
                                                            dispatch({
                                                                type : DELETE_USER_IN_PROJECT,
                                                                data : {
                                                                    projectId : record.id,
                                                                    userId : item.userId
                                                                }
                                                            })
                                                        }}><i className="fa fa-trash"></i></button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    }>
                                        <Avatar src={item.avatar} />
                                    </Popover>
                                })}
                            </Avatar.Group>
                            <Popover title={<span>Add User</span>} trigger="click" content={
                                <div >
                                    <p>User Name :</p>
                                    <AutoComplete className="w-full"
                                    value={value}
                                    ref={searchValue}
                                    placeholder="Input User Name"
                                    options = { getUser?.map((user, index) => {
                                        return {label : user.name, value : user.userId.toString()}
                                    })}
                                    onSearch = {(value) => {
                                        if(searchValue.current ){
                                            clearTimeout(searchValue.current)
                                        }
                                        searchValue.current = setTimeout(() => {
                                            dispatch({
                                                type : ALL_USER,
                                                data : value
                                            })
                                        }, 300)
                                    }}
                                    onChange = {(value) => {
                                        setValue(value)
                                    }}
                                    onSelect = {(value, option) => {
                                        setValue(option.label)
                                        dispatch({
                                            type : ADD_USER_IN_PROJECT,
                                            data : {
                                                projectId : record.id,
                                                userId : value
                                            }
                                        }, 
                                            setValue('')
                                        )
                                    }}
                                    />
                                </div>
                            }>
                                <Button shape="circle" size="large">
                                    <i className="fa fa-user-plus"></i>
                                </Button>
                            </Popover>
                        </Divider>
                    </div>
                )
            }
        },
        {
            title: 'Action',
            key : 'action',
            render: (text, record, index) => {
                return (
                    <div key={index} className="action">
                        <button className="btn btn-primary mr-2" onClick={() => {
                            dispatch({
                                type : EDIT_PROJECT_DRAWER,
                                data : <EditProject/>,
                                visible : true,
                                title : 'Edit project'
                            })
                            dispatch({
                                type : EDIT_PROJECT,
                                data : record
                            })
                        }}><i className="fa fa-edit"></i></button>
                        <Popconfirm title="Are you sure?" icon={<QuestionCircleOutlined style={{ color: 'red' }}/>} onConfirm={(e) => {
                            e.preventDefault();
                            dispatch({
                                type : DELETE_PROJECT,
                                data :record.id
                            })
                        }}>
                            <button className="btn btn-danger ml-2"><i className="fa fa-trash"></i></button>
                        </Popconfirm>
                    </div>
                )
            }
        }
    ];
    return (
        <div className="project__management">
            <h3 className="text-5xl text-center text-blue-600">Project Management</h3>
            <Table columns={columns} rowKey={'id'} dataSource={allProject} onChange={handleChange}></Table>
        </div>
    )
}
