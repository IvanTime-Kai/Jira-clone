import { GET_PRIORITY } from "redux/types/PriorityTypes"

const initialState = {
    priority : []
}

const PriorityReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_PRIORITY:
            state.priority = action.data
            return {...state}
        default:
            return state
    }
}

export default PriorityReducer