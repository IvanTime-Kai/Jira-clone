import { EDIT_TASK } from "redux/types/TaskTypes"
import { DELETE_ASIGNESS } from "redux/types/TaskTypes"
import { CLOSE_MODAL } from "redux/types/TaskTypes"
import { ADD_ASIGNESS } from "redux/types/TaskTypes"
import { GET_TASK_DETAIL } from "redux/types/TaskTypes"
import { GET_TASK_TYPE } from "redux/types/TaskTypes"

const initialState = {
    taskType : [],
    taskDetail : {},
    visibleTask : true
}

const TaskReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_TASK_TYPE:
            return {...state, taskType : action.data}
        case GET_TASK_DETAIL:
            return {...state, taskDetail : action.data}
        case EDIT_TASK:
            return {...state, taskDetail : {...state.taskDetail, [action.name] : action.value}}
        case ADD_ASIGNESS :
            state.taskDetail.assigness = [...state.taskDetail.assigness, {...action.user, id : action.user.userId}]
            return {...state}
        case DELETE_ASIGNESS :
            state.taskDetail.assigness = [...state.taskDetail.assigness.filter( p => p.id !== action.id)]
            return {...state}
        case CLOSE_MODAL :
            return {...state, visibleTask : false }
        default:
            return state
    }
}

export default TaskReducer