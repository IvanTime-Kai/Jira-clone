import { history } from 'App'
import { call, put, takeLatest, select} from 'redux-saga/effects'
import { openNotificationWithIcon } from '../../../utils/Notification/Notification'
import { userApis } from '../../../apis/UserApis'
import { STATUS_CODE, TOKEN, USER_LOGIN } from '../../../utils/SettingSystem/SettingSystem'
import { ADD_USER_IN_PROJECT, ALL_USER, ALL_USER_1, CREATE_USER, DELETE_USER, DELETE_USER_IN_PROJECT, GET_ALL_USER, GET_ALL_USER_1, GET_USER_BY_PROJECT, SIGN_UP_USER, UPDATE_USER, USER_BY_PROJECT, USER_SIGN_IN_API } from '../../types/UserTypes'
import { GET_ALL_PROJECT } from 'redux/types/ProjectTypes'
import { ALL_PROJECT } from 'redux/types/ProjectTypes'
import Swal from "sweetalert2"



function * actSignIn(action){
    const { userLogin } = action
    try{
        let { data, status } = yield call(() => userApis.fetchUserLogin(userLogin))
        if(status === STATUS_CODE.SUCCESS){
            localStorage.setItem(TOKEN, data.content.accessToken)
            localStorage.setItem(USER_LOGIN, JSON.stringify(data.content))

            yield put({
                type : SIGN_UP_USER,
                data : data.content
            })

            yield Swal.fire({
                icon: 'success',
                title: 'Login Sucessful',
                showConfirmButton: false,
                timer: 1500
            })

            history.push('/management')
        }
    }catch(err){
        console.log(err.response.data)
    }
}

function * GetAllUserApi(action){
    try{
        let {data, status} = yield call(() => userApis.fetchGetAllUser(action.data))
        if(status === STATUS_CODE.SUCCESS){
            yield put({
                type : GET_ALL_USER,
                data : data.content
            })
        }
    }catch(err){
        console.log(err.response.data)
    }
}

function * PostUserInProjectApi(action){
    try{
        let { data, status} = yield call(() => userApis.fetchAddUserInProject(action.data))
        if(status === STATUS_CODE.SUCCESS){
            openNotificationWithIcon('success', 'Notification', 'Add user in project successful' )
            yield put({
                type : ALL_PROJECT
            })
        }      
    }catch(err){
        console.log(err.response.data)
        openNotificationWithIcon('error', 'Notification', `${err.response.data.content}`)   
    }   
}

function * PostDeleteUserInProject(action){
    try{
        let {data, status} = yield call(() => userApis.fetchDeleteUserInProject(action.data))
        console.log(data)
        if(status === STATUS_CODE.SUCCESS){
            openNotificationWithIcon('success', 'Notification', 'Add user in project successful' )
            yield put({
                type : ALL_PROJECT
            })
        }
    }catch(err){
        console.log(err.response.data)
        openNotificationWithIcon('error', 'Notification', `${err.response.data.content}`) 
    }
}

function * GetUserByProjectIdApi(action){
    try{
        let { data, status} = yield call(() => userApis.fetchGetUserByProjectId(action.data))
        if(status === STATUS_CODE.SUCCESS){
            yield put({
                type : GET_USER_BY_PROJECT,
                data : data.content
            })
        }
    }catch(err){
        console.log(err.response.data)
        openNotificationWithIcon('error', 'Notification', `${err.response.data.content}`) 
    }
}

function * Get_AllUserApi(){
    try{
        let { data, status} = yield call(() => userApis.fetchGet_AllUser())
        if(status === STATUS_CODE.SUCCESS){
            yield put({
                type : GET_ALL_USER_1,
                data : data.content
            })
        }
    }catch(err){
        console.log(err.response.data)
    }
}

function * CreateUserApi(action){
    try{
        let { data, status } = yield call(() => userApis.fetchCreateUser(action.data))
        if(status === STATUS_CODE.SUCCESS){
            // yield put({
            //     type : ALL_USER_1
            // })
            openNotificationWithIcon('success', 'Notification', `${data.message}` )
        }
    }catch(err){
        console.log(err.response.data)
        openNotificationWithIcon('error', 'Notification', `${err.response.data.content}`)
    }
}
function * UpdateUserApi(action){
    try{
        let { data, status } = yield call(() => userApis.fetchCreateUser(action.data))
        if(status === STATUS_CODE.SUCCESS){
            yield put({
                type : ALL_USER_1
            })
            openNotificationWithIcon('success', 'Notification', `${data.message}` )
        }
    }catch(err){
        console.log(err.response.data)
        openNotificationWithIcon('error', 'Notification', `${err.response.data.content}`)
    }
}
function * DeleteUserApi(action){
    try{
        let { data, status } = yield call(() => userApis.fetchCreateUser(action.data))
        if(status === STATUS_CODE.SUCCESS){
            yield put({
                type : ALL_USER_1
            })
            openNotificationWithIcon('success', 'Notification', `${data.message}` )
        }
    }catch(err){
        console.log(err.response.data)
        openNotificationWithIcon('error', 'Notification', `${err.response.data.content}`)
    }
}

export function * theoDoiSignIn(){
    yield takeLatest(USER_SIGN_IN_API, actSignIn)
}

export function * theoDoiGetAllUserApi(){
    yield takeLatest(ALL_USER, GetAllUserApi)
}

export function * theoDoiPostUserInProject(){
    yield takeLatest(ADD_USER_IN_PROJECT, PostUserInProjectApi)
}

export function * theoDoiPostDeleteUserInProject(){
    yield takeLatest(DELETE_USER_IN_PROJECT, PostDeleteUserInProject)
}

export function * theoDoiGetUserByProjectId(){
    yield takeLatest(USER_BY_PROJECT, GetUserByProjectIdApi)
}

export function * theoDoiGet_AllUserApi(){
    yield takeLatest(ALL_USER_1, Get_AllUserApi)
}

export function * theoDoiCreateUser(){
    yield takeLatest(CREATE_USER, CreateUserApi)
}

export function * theoDoiUpdateUser(){
    yield takeLatest(UPDATE_USER, UpdateUserApi)
}
export function * theoDoiDeleteUser(){
    yield takeLatest(DELETE_USER, DeleteUserApi)
}