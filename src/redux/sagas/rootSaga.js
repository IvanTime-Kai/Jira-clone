import {all} from 'redux-saga/effects'
import * as UserSaga from './Cyberbugs/UserSaga'
import * as ProjectSaga from './Cyberbugs/ProjectSaga'
import * as StatusSaga from './Cyberbugs/StatusSaga'
import * as TaskSaga from './Cyberbugs/TaskSaga'
import * as PrioritySaga from './Cyberbugs/PrioritySaga'
import * as CommentSaga from './Cyberbugs/CommentSaga'

export default function * rootSaga(){
    yield all([

        // Manager User
        UserSaga.theoDoiSignIn(),
        UserSaga.theoDoiGetAllUserApi(),
        UserSaga.theoDoiPostUserInProject(),
        UserSaga.theoDoiPostDeleteUserInProject(),
        UserSaga.theoDoiGetUserByProjectId(),
        UserSaga.theoDoiGet_AllUserApi(),
        UserSaga.theoDoiCreateUser(),
        UserSaga.theoDoiUpdateUser(),
        UserSaga.theoDoiDeleteUser(),

        // Manager Project
        ProjectSaga.theoDoiGetProjectCategoryApi(),
        ProjectSaga.theoDoiCreateProjectApi(),
        ProjectSaga.theoDoiGetAllProjectApi(),
        ProjectSaga.theoDoiDeleteProjectApi(),
        ProjectSaga.theoDoiUpdateProjectApi(),
        ProjectSaga.theoDoiGetProjectDetailApi(),

        // Manager Status
        StatusSaga.theoDoiGetAllStatusApi(),
        // Manager Priority
        PrioritySaga.theoDoiGetPriority(),

        // Manager Task
        TaskSaga.theoDoiGetTaskTypeApi(),
        TaskSaga.theoDoiPostCreateTaskApi(),
        TaskSaga.theoDoiPutUpdateStatusApi(),
        TaskSaga.theoDoiGetTaskDetailApi(),
        TaskSaga.theoDoiPostUpdateTaskApi(),
        TaskSaga.theoDoiDeleteTaskApi(),

        // Manager comment

        CommentSaga.theoDoiGetAllCommentApi(),
        CommentSaga.theoDoiPostInsertCommentApi(),
        CommentSaga.theoDoiPutUPdateCommentApi(),
        CommentSaga.theoDoiDeleteCommentApi()
    ])
}