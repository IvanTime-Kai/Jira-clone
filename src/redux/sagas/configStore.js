import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import CommentReducer from "redux/reducers/CommentReducer";
import DrawerReducer from "redux/reducers/DrawerReducer";
import LoadingReducer from "redux/reducers/LoadingReducer";
import PriorityReducer from "redux/reducers/PriorityReducer";
import ProjectReducer from "redux/reducers/ProjectReducer";
import StatusReducer from "redux/reducers/StatusReducer";
import TaskReducer from "redux/reducers/TaskReducer";
import UserReducer from "../reducers/UserReducer";
import rootSaga from "./rootSaga";



const rootReducer = combineReducers({
    UserReducer,
    ProjectReducer,
    DrawerReducer,
    StatusReducer,
    TaskReducer,
    PriorityReducer, 
    CommentReducer,
    LoadingReducer
})

const middlewaresaga = createSagaMiddleware()

const store = createStore(rootReducer, applyMiddleware(middlewaresaga))

middlewaresaga.run(rootSaga)

export default store