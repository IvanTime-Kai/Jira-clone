
import { projectApis } from "../../../apis/ProjectApis";
import { call, put, takeLatest } from "redux-saga/effects";
import { PROJECT_CATEGORY } from "redux/types/ProjectTypes";
import { STATUS_CODE } from "utils/SettingSystem/SettingSystem";
import { GET_PROJECT_CATEGORY } from "redux/types/ProjectTypes";
import { POST_CREATE_PROJECT } from "redux/types/ProjectTypes";
import { CREATE_PROJECT } from "redux/types/ProjectTypes";
import { ALL_PROJECT } from "redux/types/ProjectTypes";
import { GET_ALL_PROJECT } from "redux/types/ProjectTypes";
import { DELETE_PROJECT } from "redux/types/ProjectTypes";
import { openNotificationWithIcon } from "utils/Notification/Notification";
import { UPDATE_PROJECT } from "redux/types/ProjectTypes";
import { CLOSE_DRAWER } from "redux/types/ProjectTypes";
import { PROJECT_DETAIL } from "redux/types/ProjectTypes";
import { GET_PROJECT_DETAIL } from "redux/types/ProjectTypes";
import { history } from "App";
import { DISPLAY_LOADING } from "redux/types/LoadingTypes";
import { HIDDEN_LOADING } from "redux/types/LoadingTypes";


function * GetProjectCategoryApi(){
    try{
        let { data, status} = yield call(() => projectApis.fetchGetProjectCategory())
        if(status === STATUS_CODE.SUCCESS){
            yield put({
                type : DISPLAY_LOADING
            })
            yield put({
                type : GET_PROJECT_CATEGORY,
                data : data.content
            })
            yield put({
                type : HIDDEN_LOADING
            })
        }
    }catch(err){
        console.log(err.response.data)
    }
}

function * CreateProjectApi(action){
    try{
        let { data, status} = yield call(() => projectApis.fetchPostCreateproject(action.data))
        if(status === STATUS_CODE.SUCCESS){
            openNotificationWithIcon('success', 'Notification', `${data.message}` )
            history.push('/management')
        }
    }catch(err){
        console.log(err.response.data)
        openNotificationWithIcon('error', 'Notification', `${err.response.data.content}`) 
    }
}

function * GetAllProjectApi(){
    try{
        let { data, status} = yield call(() => projectApis.fetchAllProject())
        if(status === STATUS_CODE.SUCCESS){
            yield put({
                type : GET_ALL_PROJECT,
                data : data.content
            })
        }
    }catch(err){
        console.log(err.response.data)
    }
}

function * DeleteProjectApi(action){
    try{
        let {data , status} = yield call(() => projectApis.fetchDeleteProject(action.data))
        if(status == STATUS_CODE.SUCCESS){
            openNotificationWithIcon('success', 'Notification', `${data.message}` )
            yield put({
                type : ALL_PROJECT
            })
        }
    }catch(err){
        console.log(err.response.data)
        openNotificationWithIcon('error', 'Notification', `${err.response.data.content}`) 
    }
}

function * PutUpdateProjectApi(action){
    try{
        let{data, status} = yield call(() => projectApis.fetchUpdateProject(action.data.id, action.data))
        if(status === STATUS_CODE.SUCCESS){
            openNotificationWithIcon('success', 'Notification', `${data.message}` )
            yield put({
                type : ALL_PROJECT
            })
            yield put({
                type : CLOSE_DRAWER,
            })
        }
    }catch(err){
        console.log(err.response.data)
        openNotificationWithIcon('error', 'Notification', `${err.response.data.content}`) 
    }
}

function * GetProjectDetailApi(action){
    try{
        let { data, status } = yield call(() => projectApis.fetchGetProjectDetail(action.data))
        if(status === STATUS_CODE.SUCCESS){
            yield put({
                type : GET_PROJECT_DETAIL,
                data : data.content
            })
        }
    }catch(err){
        console.log(err.response.data)
    }
}

export function * theoDoiGetProjectCategoryApi(){
    yield takeLatest(PROJECT_CATEGORY, GetProjectCategoryApi)
}

export function * theoDoiCreateProjectApi(){
    yield takeLatest(CREATE_PROJECT, CreateProjectApi)
}

export function * theoDoiGetAllProjectApi(){
    yield takeLatest(ALL_PROJECT, GetAllProjectApi)
}

export function * theoDoiDeleteProjectApi(){
    yield takeLatest(DELETE_PROJECT, DeleteProjectApi)
}

export function * theoDoiUpdateProjectApi(){
    yield takeLatest(UPDATE_PROJECT, PutUpdateProjectApi)
}

export function * theoDoiGetProjectDetailApi(){
    yield takeLatest(PROJECT_DETAIL, GetProjectDetailApi)
}