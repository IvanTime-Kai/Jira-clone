import { taskType } from '../../../apis/TaskApis'
import { call, put, takeLatest, select} from 'redux-saga/effects'
import { TASK_TYPE } from 'redux/types/TaskTypes'
import { STATUS_CODE } from 'utils/SettingSystem/SettingSystem'
import { GET_TASK_TYPE } from 'redux/types/TaskTypes'
import { openNotificationWithIcon } from 'utils/Notification/Notification'
import { CREATE_TASK } from 'redux/types/TaskTypes'
import { UPDATE_STATUS } from 'redux/types/TaskTypes'
import { PROJECT_DETAIL } from 'redux/types/ProjectTypes'
import { TASK_DETAIL } from 'redux/types/TaskTypes'
import { GET_TASK_DETAIL } from 'redux/types/TaskTypes'
import { UPDATE_TASK } from 'redux/types/TaskTypes'
import { EDIT_TASK } from 'redux/types/TaskTypes'
import { ADD_ASIGNESS } from 'redux/types/TaskTypes'
import { DELETE_ASIGNESS } from 'redux/types/TaskTypes'
import { DELETE_TASK } from 'redux/types/TaskTypes'
import { CLOSE_MODAL } from 'redux/types/TaskTypes'
import { CLOSE_DRAWER } from 'redux/types/ProjectTypes'



function * GetTaskTypeApi(){
    try{
        let { data, status } = yield call(() => taskType.fetchTaskType())
        if(status === STATUS_CODE.SUCCESS){
            yield put({
                type : GET_TASK_TYPE,
                data : data.content
            })
        }
    }catch(err){
        console.log(err.response.data)
    }
}

function * PostAssignUserTaskApi(action){
    try{
        let {data, status} = yield call(() => taskType.fetchAssignUserTask())
    }catch(err){
        console.log(err.response.data)
    }
}

function * PostCreateTaskApi(action){
    try{
        let {data, status} = yield call(() => taskType.fetchCreateTask(action.data))
        console.log(data)
        if(status === STATUS_CODE.SUCCESS){
            yield put({
                type : CLOSE_DRAWER
            })
            yield put({
                type : PROJECT_DETAIL,
                data :  action.data.projectId
            })
            openNotificationWithIcon('success', 'Notification', `${data.message}` )
        }
    }catch(err){
        console.log(err.response.data)
        openNotificationWithIcon('error', 'Notification', `${err.response.data.content}`) 
    }
}

function * PutUpdateStatusApi(action){
    try{
        let {data, status} = yield call(() => taskType.fetchUpdateStatus(action.data))
        if(status === STATUS_CODE.SUCCESS){
            yield put({
                type : PROJECT_DETAIL,
                data : action.data.projectId
            })
        }
    }catch(err){
        console.log(err.response.data)
        openNotificationWithIcon('error', 'Notification', `${err.response.data.content}`) 
    }
}

function * GetTaskDetailApi(action){
    try{
        let { data, status } = yield call(() => taskType.fetchGetTaskDetail(action.data))
        if(status === STATUS_CODE.SUCCESS){
            yield put({
                type : GET_TASK_DETAIL,
                data : data.content
            })
        }
    }catch(err){
        console.log(err.response.data)
    }
}

function * PostUpdateTaskApi(action){
    try{
        switch(action.actionType){
            case EDIT_TASK : {
                const { name , value } = action
                console.log('name', name)
                console.log('value', value)
                yield put({
                    type : EDIT_TASK,
                    name, 
                    value
                })
            }break;
            case ADD_ASIGNESS : {
                yield put({
                    type : ADD_ASIGNESS,
                    user : action.user
                })
            }break;
            case DELETE_ASIGNESS : {
                console.log(action.id)
                yield put({
                    type : DELETE_ASIGNESS,
                    id : action.id
                })
            }break;
        }

        let { taskDetail } = yield select(state => state.TaskReducer)

        let listUserAsign = taskDetail.assigness.map((item) => {
            return item.id
        })

        let taskUpdate = {...taskDetail, listUserAsign}
        try{
            let {data, status} = yield call(() => taskType.fetchUpdateTask(taskUpdate))
            console.log(data)
            if(status === STATUS_CODE.SUCCESS){
                yield put({
                    type : PROJECT_DETAIL,
                    data : taskUpdate.projectId
                })
                yield put({
                    type : TASK_DETAIL,
                    data : taskDetail.taskId
                })              
                openNotificationWithIcon('success', 'Notification', `${data.message}` )
            }
        }catch(err){
            console.log(err.response.data)
            openNotificationWithIcon('error', 'Notification', `${err.response.data.content}`) 
        }
    }catch(err){
        console.log(err.response.data)
        openNotificationWithIcon('error', 'Notification', `${err.response.data.content}`) 
    }
}

function * DeleteTaskApi(action){
    try{
        let {data, status} = yield call(() => taskType.fetchDeleteTask(action.data.taskId))
        if(status === STATUS_CODE.SUCCESS){
            yield put({
                type : PROJECT_DETAIL,
                data : action.data.projectId
            })
            yield put({
                type : CLOSE_MODAL
            })
            openNotificationWithIcon('success', 'Notification', `${data.message}` )
        }
    }catch(err){
        console.log(err.response.data)
        openNotificationWithIcon('error', 'Notification', `${err.response.data.content}`) 
    }
}


export function * theoDoiGetTaskTypeApi(){
    yield takeLatest(TASK_TYPE, GetTaskTypeApi)
}

// export function * theoDoiPostAssignUserTaskApi(){
//     yield takeLatest()
// }

export function * theoDoiPostCreateTaskApi(){
    yield takeLatest(CREATE_TASK, PostCreateTaskApi)
}

export function * theoDoiPutUpdateStatusApi(){
    yield takeLatest(UPDATE_STATUS, PutUpdateStatusApi)
}

export function * theoDoiGetTaskDetailApi(){
    yield takeLatest(TASK_DETAIL, GetTaskDetailApi)
}

export function * theoDoiPostUpdateTaskApi(){
    yield takeLatest(UPDATE_TASK, PostUpdateTaskApi)
}

export function * theoDoiDeleteTaskApi(){
    yield takeLatest(DELETE_TASK, DeleteTaskApi)
}