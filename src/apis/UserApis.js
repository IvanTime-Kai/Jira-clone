import BaseServices from "../services/baseServices"



class UserApis extends BaseServices{
    fetchUserLogin = (userLogin) => {
        return this.post('Users/signin', userLogin)
    }
    fetchGetAllUser = (key) => {
        return this.get(`Users/getUser?keyword=${key}`)
    }
    fetchAddUserInProject = (user) => {
        return this.post('Project/assignUserProject', user)
    }
    fetchDeleteUserInProject = (user) =>{
        return this.post('Project/removeUserFromProject', user)
    }
    fetchGetUserByProjectId = (projectId) =>{
        return this.get(`Users/getUserByProjectId?idProject=${projectId}`)
    }
    fetchGet_AllUser = () =>{
        return this.get('Users/getUser')
    }
    fetchCreateUser = (newUser) => {
        return this.post('Users/signup', newUser)
    }
    fetchUpdateUser = (updateUser) => {
        return this.put('Users/editUser', updateUser)
    }
    fetchDeleteUser = (userId) => {
        return this.delete(`Users/deleteUser?id=${userId}`)
    }
}

export const userApis = new UserApis()
