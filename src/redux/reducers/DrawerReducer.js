import { CLOSE_DRAWER } from "redux/types/ProjectTypes"
import { ON_SUBMIT_DRAWER } from "redux/types/ProjectTypes"
import { EDIT_PROJECT_DRAWER } from "redux/types/ProjectTypes"

const initialState = {
    title : '',
    visible : false,
    onSubmit : () => {alert('onSubmit')},
    Component : <p>Default</p>
}

const DrawerReducer = (state = initialState, action) => {
    switch(action.type){
        case EDIT_PROJECT_DRAWER:
            return {...state, Component : action.data, visible : action.visible, title : action.title}
        case ON_SUBMIT_DRAWER:
            return {...state, onSubmit : action.onSubmit}
        case CLOSE_DRAWER:
            return {...state, visible : false}
        default: 
            return state
    }
}

export default DrawerReducer