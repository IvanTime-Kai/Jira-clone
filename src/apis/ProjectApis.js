import BaseServices from "../services/baseServices"


class ProjectApis extends BaseServices{
    fetchGetProjectCategory = () => {
        return this.get('ProjectCategory')
    }
    fetchPostCreateproject = (newProject) => {
        return this.post('Project/createProjectAuthorize', newProject)
    }
    fetchAllProject = () => {
        return this.get('Project/getAllProject')
    }
    fetchDeleteProject = (projectId) => {
        return this.delete(`Project/deleteProject?projectId=${projectId}`)
    }
    fetchUpdateProject = (projectId, projectUpdate) => {
        return this.put(`Project/updateProject?projectId=${projectId}`, projectUpdate)
    }
    fetchGetProjectDetail = (projectId) => {
        return this.get(`Project/getProjectDetail?id=${projectId}`)
    }
}

export const projectApis = new ProjectApis()