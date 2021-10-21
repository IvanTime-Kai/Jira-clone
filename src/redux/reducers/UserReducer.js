import { USER_LOGIN } from "utils/SettingSystem/SettingSystem"
import { GET_ALL_USER, GET_ALL_USER_1, GET_USER_BY_PROJECT, SIGN_UP_USER } from "../types/UserTypes"



let user = {}
if(localStorage.getItem(USER_LOGIN)){
    user = JSON.parse(localStorage.getItem(USER_LOGIN))
}

const intialState = {
    userLogin : user,
    getUser : [],
    getUserByProject : [],
    allUser : []
} 

const UserReducer = (state = intialState, action) => {
    switch (action.type) {

        case SIGN_UP_USER:
            return { ...state, userLogin : action.data}
        case GET_ALL_USER:
            return { ...state, getUser: action.data}
        case GET_USER_BY_PROJECT:
            return {...state, getUserByProject : action.data}
        case GET_ALL_USER_1 : 
            return {...state, allUser : action.data}
        default:
            return state
        }
}

export default UserReducer

