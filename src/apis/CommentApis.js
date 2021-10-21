import BaseServices from "../services/baseServices"

class CommentApis extends BaseServices{
    fetchGetAllComment = (taskId) => {
        return this.get(`Comment/getAll?taskId=${taskId}`)
    }
    fetchInsertComment = (comment) => {
        return this.post('Comment/insertComment', comment)
    }
    fetchUpdateComment = (id, content) => {
        return this.put(`Comment/updateComment?id=${id}&contentComment=${content}`)
    }
    fetchDeleteComment = (idComment) => {
        return this.delete(`Comment/deleteComment?idComment=${idComment}`)
    }
}

export const commentApi = new CommentApis()