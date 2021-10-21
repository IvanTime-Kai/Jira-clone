import BaseServices from "../services/baseServices"



class PriorityApis extends BaseServices{
    fetchPriority = () => {
        return this.get('Priority/getAll')
    }
}

export const priorityApis = new PriorityApis()

