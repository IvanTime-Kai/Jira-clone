
import { Route } from "react-router";
import { Layout } from "antd";
import Menu from "components/Menu/Menu.jsx";
import SideBar from "components/SideBar/SideBar";




const HomeTemplate = (props) => {
    let { Component, ...restParams} = props;
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

export default HomeTemplate