import { statusApis } from '../../../apis/StatusApis'
import { call, takeLatest, put } from 'redux-saga/effects'
import { STATUS_CODE } from 'utils/SettingSystem/SettingSystem'
import { GET_ALL_STATUS } from 'redux/types/StatusTypes'
import { ALL_STATUS } from 'redux/types/StatusTypes'


function * GetAllStatusApi(){
    try{
        let {data, status} = yield call(() => statusApis.fetchGetAllStatus())
        if(status === STATUS_CODE.SUCCESS){
            yield put({
                type : GET_ALL_STATUS,
                data : data.content
            })
        }
    }catch(err){
        console.log(err.response.data)
    }
}

export function * theoDoiGetAllStatusApi(){
    yield takeLatest(ALL_STATUS, GetAllStatusApi)
}