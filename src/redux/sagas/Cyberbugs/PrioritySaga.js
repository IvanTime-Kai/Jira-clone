import { priorityApis } from '../../../apis/PriorityApis'
import {call, put, takeLatest} from 'redux-saga/effects'
import { STATUS_CODE } from '../../../utils/SettingSystem/SettingSystem'
import { GET_PRIORITY } from 'redux/types/PriorityTypes'
import { PRIORITY } from 'redux/types/PriorityTypes'


function * GetPriority(){
    try{
        let {data, status} = yield call(() => priorityApis.fetchPriority())
        if(status === STATUS_CODE.SUCCESS){
            yield put({
                type : GET_PRIORITY,
                data : data.content
            })
        }
    }catch(err){
        console.log(err.response?.data)
    }
}

export function * theoDoiGetPriority(){
    yield takeLatest(PRIORITY, GetPriority)
}