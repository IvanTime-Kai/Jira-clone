import { commentApi } from '../../../apis/CommentApis'
import { call, put, takeLatest } from 'redux-saga/effects'
import { ALL_COMMENT } from 'redux/types/CommentTypes'
import { STATUS_CODE } from '../../../utils/SettingSystem/SettingSystem'
import { GET_ALL_COMMENT } from 'redux/types/CommentTypes'
import { INSERT_COMMENT } from 'redux/types/CommentTypes'
import { UPDATE_COMMENT } from 'redux/types/CommentTypes'
import { DELETE_COMMENT } from 'redux/types/CommentTypes'
import { openNotificationWithIcon } from 'utils/Notification/Notification'
import { GET_TASK_DETAIL } from 'redux/types/TaskTypes'
import { TASK_DETAIL } from 'redux/types/TaskTypes'


function * GetAllCommentApi(action){
    try{
        let { data, status } = yield call(() => commentApi.fetchGetAllComment(action.data))
        if(status === STATUS_CODE.SUCCESS){
            yield put({
                type : GET_ALL_COMMENT,
                data : data.content
            })
        }
    }catch(err){
        console.log(err.response?.data)
    }
}

function * PostInsertCommentApi(action){
    try{
        let { data , status } = yield call(() => commentApi.fetchInsertComment(action.data))
        if(status ===STATUS_CODE.SUCCESS){
            yield put({
                type : ALL_COMMENT,
                data : action.data.taskId
            })
            yield put({
                type : TASK_DETAIL,
                data : action.data.taskId
            })
            openNotificationWithIcon('success', 'Notification', `${data.message}` )
        }
    }catch(err){
        console.log(err.response.data)
    }
}

function * PutUpdateCommentApi(action){
    try{
        let { data, status } = yield call(() => commentApi.fetchUpdateComment(action.data.id, action.data.content))
        console.log(data)
        if(status ===STATUS_CODE.SUCCESS){
            yield put({
                type : GET_TASK_DETAIL,
                data : action.taskId
            })
            openNotificationWithIcon('success', 'Notification', `${data.message}` )
        }
    }catch(err){
        console.log(err.response?.data)
        // openNotificationWithIcon('error', 'Notification', `${err.response.data.content}`) 
    }
}

function * DeleteCommentApi(action){
    try{
        let {data, status} = yield call(() => commentApi.fetchDeleteComment(action.data.id))
        if(status ===STATUS_CODE.SUCCESS){
            yield put({
                type : ALL_COMMENT,
                data : action.data.taskId
            })
            yield put({
                type : TASK_DETAIL,
                data : action.data.taskId
            })
            openNotificationWithIcon('success', 'Notification', `${data.message}` )
        }
    }catch(err){
        console.log(err.response.data)
    }
}

export function * theoDoiGetAllCommentApi(){
    yield takeLatest(ALL_COMMENT, GetAllCommentApi)
}

export function * theoDoiPostInsertCommentApi(){
    yield takeLatest(INSERT_COMMENT, PostInsertCommentApi)
}

export function * theoDoiPutUPdateCommentApi(){
    yield takeLatest(UPDATE_COMMENT, PutUpdateCommentApi)
}

export function * theoDoiDeleteCommentApi(){
    yield takeLatest(DELETE_COMMENT, DeleteCommentApi)
}