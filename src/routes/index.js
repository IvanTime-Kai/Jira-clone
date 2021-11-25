import CreateProject from "pages/Project/CreateProject";
import ProjectManagement from "pages/ProjectManagement/ProjectManagement";
import Task from "pages/Task/Task";
import UserManagement from "pages/UserManagement/UserManagement";



export const ClientRoutes = [
    // {
    //     path : '/',
    //     Component : ProjectManagement,
    //     exact : true,
    //     isPrivate : true
    // },
    {
        path : '/management',
        Component : ProjectManagement,
        exact : true,
        isPrivate : true
    },
    {
        path : '/createproject',
        Component : CreateProject,
        exact : false,
        isPrivate : true
    },
    {
        path : '/projectdetail/:projectId',
        Component : Task,
        exact : false,
        isPrivate : true
    },
    {
        path : '/usermanagement',
        Component : UserManagement,
        exact : false,
        isPrivate : true
    },
    

]
