
import { Route, Redirect } from "react-router-dom";
import { Layout } from "antd";
import Menu from "components/Menu/Menu.jsx";
import SideBar from "components/SideBar/SideBar";
import { USER_LOGIN } from "utils/SettingSystem/SettingSystem";
import { Content } from "antd/lib/layout/layout";




const HomeTemplate = (props) => {
    let { Component,isPrivate,...restParams} = props;

    if(isPrivate){
        if(localStorage.getItem(USER_LOGIN)){
            return <Route {...restParams} render={(propsRoute) => {
                return (
                    <Layout>
                        <SideBar/>
                        <Menu/>
                        <Component {...propsRoute} />
                    </Layout>
                )
            }}></Route>
        }
        return <Redirect to="/userlogin"/>
    }

    return <Route {...restParams} render={(propsRoute) => {
        return (
            <Layout className="d-flex" style={{flexDirection: 'row'}}>
                <SideBar/>
                <Menu/>
                <Component {...propsRoute} />
            
            </Layout>
        )
    }}></Route>
}

export default HomeTemplate