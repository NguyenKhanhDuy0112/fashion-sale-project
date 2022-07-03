import { Comment, Reply } from "../shared/interfaces"
import api from "./api"

const addReply = (data: Reply) => {
    return api.post(api.url.comments, data).then(res => res.data)
}

const getCommentsByProductId = (productId: string, userId: string) => {
    return api.get(`${api.url.products}/${productId}/${userId}/comments`).then(res => res.data)
}

const like = (data: {user: string, comment: string}) => {
    return api.post(`${api.url.actions}`, data).then(res => res.data)
}

const addComment = (data: Comment) => {
    return api.post(`${api.url.comments}`, data).then(res => res.data)
}

const deleteComment = (commentId: string, userId: string) => {
    return api.delete(`${api.url.comments}/${commentId}/${userId}`).then(res => res.data)
}


const commentsService = {
    addReply,
    addComment,
    deleteComment,
    getCommentsByProductId,
    like
    
}

export default commentsService;