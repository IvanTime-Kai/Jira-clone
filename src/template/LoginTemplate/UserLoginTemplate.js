import React, { useState, useEffect} from 'react'
import { Route } from 'react-router'
import { Layout } from 'antd'
import './UserLoginTemplate.scss'

const { Sider, Content} = Layout

const UserLoginTemplate = (props) => {

    let [state, setState] = useState({width : window.innerWidth, height : window.innerHeight})

    useEffect( () => {
        window.onresize = () => {
            setState({
                width : window.innerWidth,
                height : window.innerHeight
            })
        }
    },[])


    let {Component, ...restRoute } = props;
    return <Route {...restRoute} render= {(propsRouter) => {
        return (
            <Layout className="d-flex">
                <Sider width={state.width/2} style={{height: state.height, backgroundImage : 'url(https://picsum.photos/0508)', backgroundRepeat: 'no-repeat', backgroundSize : 'cover'}}></Sider>
                <Content className="d-flex " style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Component {...propsRouter}/> 
                </Content>             
            </Layout>           
        )
    }} >
    </Route>
}

export default UserLoginTemplate