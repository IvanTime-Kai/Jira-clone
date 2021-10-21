import React, { useState } from 'react'
import { Layout, Menu } from 'antd';
import {
    BarsOutlined,
    PlusOutlined
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { EDIT_PROJECT_DRAWER } from 'redux/types/ProjectTypes';
import CreateTask from 'components/CreateTask/CreateTask';

// import { EDIT_DRAWER } from '../../redux/constants/CyberbugsContants/Cyberbugs';
// import FormCreateTask from '../Forms/FormEdit/FormCreateTask';


const {Sider} = Layout;

export default function SideBar() {

    const [state, setState] = useState({
        collapsed: false,
    })

    const dispatch = useDispatch()

    const toggle = () => {
        setState({
            collapsed: !state.collapsed,
        });
    };

    return (
        <Sider trigger={null} collapsible collapsed={state.collapsed} style={{ height: '100vh' }}>
            <div className="text-white text-center" style={{ cursor: 'pointer', fontSize: '30px' }} onClick={toggle}>
                <BarsOutlined />
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" icon={<PlusOutlined style={{ fontSize: '25px' }} />} onClick={() => {
                    dispatch({
                        type : EDIT_PROJECT_DRAWER,
                        title : 'Create Task',
                        visible : true,
                        data : <CreateTask/>
                    })
                }}>
                    Create issue
                </Menu.Item>
            </Menu>
            <Menu>
                
            </Menu>
        </Sider>
    )
}