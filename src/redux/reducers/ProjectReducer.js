import { EDIT_PROJECT } from "redux/types/ProjectTypes"
import { GET_PROJECT_DETAIL } from "redux/types/ProjectTypes"
import { GET_ALL_PROJECT } from "redux/types/ProjectTypes"
import { GET_PROJECT_CATEGORY } from "redux/types/ProjectTypes"

const initialState = {
    projectCategory : [],
    allProject : [],
    projectDetail : {
        id : 0,
        projectName: "string",
        creator: 0,
        description: "string",
        categoryId: "string"
    },
    projectEdit : []
}


const ProjectReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_PROJECT_CATEGORY:{
            return { ...state, projectCategory : action.data}
        }
        case GET_ALL_PROJECT : {
            return {...state, allProject : action.data}
        }
        case EDIT_PROJECT : {
            return {...state, projectDetail : action.data}
        }
        case GET_PROJECT_DETAIL: {
            return {...state, projectEdit : action.data}
        }
        default :
            return state
    }
}
export default ProjectReducer