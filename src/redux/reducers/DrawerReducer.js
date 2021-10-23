import { CLOSE_DRAWER } from "redux/types/ProjectTypes"
import { ON_SUBMIT_DRAWER } from "redux/types/ProjectTypes"
import { EDIT_PROJECT_DRAWER } from "redux/types/ProjectTypes"
import { SEARCH_TASK_DRAWER } from "redux/types/TaskTypes"

const initialState = {
    title : '',
    visible : false,
    placement : 'right',
    onSubmit : () => {alert('onSubmit')},
    Component : <p>Default</p>
}

const DrawerReducer = (state = initialState, action) => {
    switch(action.type){
        case EDIT_PROJECT_DRAWER:
            return {...state, Component : action.data, visible : action.visible, title : action.title, placement: 'right'}
        case ON_SUBMIT_DRAWER:
            return {...state, onSubmit : action.onSubmit}
        case CLOSE_DRAWER:
            return {...state, visible : false}
        case SEARCH_TASK_DRAWER : 
            return {...state, visible : true, placement : 'left', title : action.data.title, Component : action.data.component}
        default: 
            return state
    }
}

export default DrawerReducer