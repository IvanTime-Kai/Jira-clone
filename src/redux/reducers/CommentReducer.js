import { GET_ALL_COMMENT } from "redux/types/CommentTypes"

const initialState = {
    allComment : []
}


const CommentReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ALL_COMMENT:
            return {...state, allComment : action.data}
        default : 
            return {...state}
    }
}

export default CommentReducer