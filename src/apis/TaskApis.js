import BaseServices from "../services/baseServices"



class TaskType extends BaseServices{
    fetchTaskType = () => {
        return this.get('TaskType/getAll')
    }
    fetchAssignUserTask = (taskuser) => {
        return this.post('Project/assignUserTask', taskuser)
    }
    fetchCreateTask = (newTask) => {
        return this.post('Project/createTask', newTask)
    }
    fetchUpdateStatus = (status) => {
        return this.put('Project/updateStatus', status)
    }
    fetchGetTaskDetail= (taskId) => {
        return this.get(`Project/getTaskDetail?taskId=${taskId}`)
    }
    fetchUpdateTask = (taskUpdate) => {
        return this.post('Project/updateTask', taskUpdate)
    }
    fetchDeleteTask =(taskId) => {
        return this.delete(`Project/removeTask?taskId=${taskId}`)
    }
}

export const taskType = new TaskType()