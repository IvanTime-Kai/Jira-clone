import React, { useState } from 'react'
import { Layout, Menu, Dropdown } from 'antd';
import {
    BarsOutlined,
    PlusOutlined,
    SearchOutlined,
    UserOutlined
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { EDIT_PROJECT_DRAWER } from 'redux/types/ProjectTypes';
import CreateTask from 'components/CreateTask/CreateTask';
import { LOG_OUT } from 'redux/types/UserTypes';
import { history } from 'App';
import { USER_LOGIN } from 'utils/SettingSystem/SettingSystem';
import { SEARCH_TASK_DRAWER } from 'redux/types/TaskTypes';
import SearchTask from 'components/SearchTask/SearchTask';

// import { EDIT_DRAWER } from '../../redux/constants/CyberbugsContants/Cyberbugs';
// import FormCreateTask from '../Forms/FormEdit/FormCreateTask';


const { Sider } = Layout;



export default function SideBar(props) {

    const [state, setState] = useState({
        collapsed: false,
    })


    const {userLogin} = useSelector(state => state.UserReducer)

    const dispatch = useDispatch()

    const toggle = () => {
        setState({
            collapsed: !state.collapsed,
        });
    };

    const menu = (
        <Menu>
            <Menu.Item key="1">
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    Profile
                </a>
            </Menu.Item>
            <Menu.Item key="2">
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com" onClick={() => {
                    dispatch({
                        type : LOG_OUT
                    })
                    history.push('/userlogin')
                }} >
                    Log Out
                </a>
            </Menu.Item>
        </Menu>
    );

    return (
        <Sider trigger={null} collapsible collapsed={state.collapsed} style={{ height: '100vh', position: 'relative' }}>
            <div className="text-white text-center" style={{ cursor: 'pointer', fontSize: '30px' }} onClick={toggle}>
                <BarsOutlined />
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" icon={<PlusOutlined style={{ fontSize: '25px' }} />} onClick={() => {
                    dispatch({
                        type: EDIT_PROJECT_DRAWER,
                        title: 'Create Task',
                        visible: true,
                        data: <CreateTask />
                    })
                }}>
                    Create issue
                </Menu.Item>
                <Menu.Item key="2" icon={<SearchOutlined style={{ fontSize: '25px' }} />} onClick={() => {
                    dispatch({
                        type : SEARCH_TASK_DRAWER,
                        data : {
                            component : <SearchTask/>,
                            title : 'Search Task'
                        }
                    })
                }}>
                    Search
                </Menu.Item>
                { localStorage.getItem(USER_LOGIN) ?
                <Menu.Item  style={{ position: 'absolute', bottom: '3rem' }} key="3" icon={<img className="rounded-full" style={{height : '30px'}} src={userLogin.avatar} alt="avatar"/>} onClick={() => {
                    // dispatch({
                    //     type : EDIT_PROJECT_DRAWER,
                    //     title : 'Create Task',
                    //     visible : true,
                    //     data : <CreateTask/>
                    // })
                }}>
                    <Dropdown overlay={menu} placement="topCenter" arrow>
                        <span>{userLogin.name}</span>
                    </Dropdown>
                </Menu.Item> : 
                <Menu.Item  style={{ position: 'absolute', bottom: '3rem' }} key="3" icon={<UserOutlined style={{fontSize: '25px'}} />}>
                    Login
                </Menu.Item>
                }
            </Menu>
        </Sider>
    )
}