import { GET_ALL_STATUS } from "redux/types/StatusTypes"

const initialState = {
    allStatus : []
}


const StatusReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ALL_STATUS:
            return {...state, allStatus: action.data}
        default:
            return state
    }
}

export default StatusReducer