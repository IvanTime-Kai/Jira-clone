import React, { useEffect, useState} from 'react'
import MaterialTable from 'material-table';
import tableIcons from 'utils/Material_Icon/Material_Icon';
import { alpha } from '@material-ui/core/styles'
import { useSelector, useDispatch } from 'react-redux';
import { ALL_USER_1 } from 'redux/types/UserTypes';
import { userApis } from '../../apis/UserApis';
import './UserManagement.scss'



const columns = [
    { 
        title : 'UserId', field : 'userId', 
        reder : (rowData) => <span style={{backgroundColor: 'red'}}>{rowData.userId}</span>,
        editComponent : (rowData) => {
            return <span>{rowData.value}</span>
        }
    },
    {   title : 'Name', field : 'name',
        validate : rowData => !rowData.name ? { isValid : false, helperText : 'Name is required'} : true,},
    { 
        title : 'Email', field : 'email', sorting: false,
        validate : rowData => {
            if(!rowData.email){
                return {isValid : false, helperText : 'Email is required'}
            }         
            const regex = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;
            if(rowData.email.match(regex)){
                return {isValid : false, helperText : 'Email is valid'}
            }
            return true
        }
    },
    { 
        title : 'Phone', field : 'phoneNumber', sorting : false,
        validate : rowData => {
            const vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;

            if (!rowData.phoneNumber)
                return { isValid: false, helperText: 'PhoneNumber is required' };

            if (!vnf_regex.test(String(rowData.phoneNumber)))
                return { isValid: false, helperText: 'PhoneNumber is valid' };

            return true;
        }
    }
]

export default function UserManagement() {


    const { allUser } = useSelector(state => state.UserReducer)

    const dispatch = useDispatch()

    let [ data, setData ] = useState([{
        id: 1
    }])

    useEffect(() => {
        // dispatch({
        //     type: ALL_USER_1
        // })
        userApis.fetchGet_AllUser().then(res => setData(res.data.content))
    }, [])
    return (
        <MaterialTable
            style={{with: '100%', fontSize : '16px',  marginBottom: '10%',position: 'relative'}}
            className='user__management'
            icons={tableIcons}
            title = {<h3 className="text-5xl text-blue-600 pb-3">User Management</h3>}
            data = {data}
            columns={columns}
            options={{sorting : true, addRowPosition: 'last', actionsColumnIndex: -1, pageSize: 15, showFirstLastPageButtons : false, headerStyle : {fontSize: '22px', color: 'red'} }}
            editable = {{
                onRowUpdate : (newRow, oldRow) => new Promise((resolve, reject) => {
                    const dataUpdate = [...data];
                    dataUpdate[oldRow.tableData.id] = newRow;

                    userApis.fetchUpdateUser({...newRow, id : newRow.userId})
                        .then((res) => {
                            console.log(res.data);
                            setData(dataUpdate)
                            resolve();
                        })
                        .catch((err) => {
                            console.log(err.response.data);
                            reject();
                        })
                }),
                onRowDelete : (selectedRow) => new Promise((resolve, reject) => {
                    const dataUpdate = [...data];
                    dataUpdate.splice(selectedRow.tableData.id, 1);
                    userApis.fetchDeleteUser(selectedRow.userId)
                        .then((res) => {
                            console.log(res.data);
                            setData(dataUpdate)
                            resolve();
                        })
                        .catch((err) => {
                            console.log(err.response.data);
                            reject();
                        })
                })
            }}
        />
    )
}
