import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { showToast } from "../../../modules/toast/toastSlice";
import commentsService from "../../../services/commentsService";
import useCurrentUser from "../../hooks/useCurrentUser";
import { Comment, Reply } from "../../interfaces";
import FeedbackComment from "../FeedbackComment";
import ModalCustom from "../ModalCustom";
import ReplyInput from "../ReplyInput";

interface Props {
    show: boolean,
    onShow: () => void,
    replies?: Comment[],
    product: any,
    parentId?: string,
    onLoadComment: () => void
}

function CommentFeedback(props: Props) {
    const { show, onShow, replies, product, parentId, onLoadComment } = props
    const dispatch = useDispatch()
    const currentUser = useCurrentUser()

    const handleReply = async (value: string) => {
        try{
            const reply:Reply = {
                content: value,
                parent: parentId ? parentId : "",
                product: product._id,
                user: currentUser._id ? currentUser._id :"",
            }
            console.log("Reply: ",reply)
            await commentsService.addReply(reply)
            await dispatch(showToast({show: true, text: "Gửi trả lời thành công", delay: 3000,type :"success"}));
            await onLoadComment()
        }catch(err){
            await dispatch(showToast({show: true, text: "Gửi trả lời thất bại", delay: 3000,type :"error"}));
        }
    }

    return (
        <>
            <article className="d-xl-block d-none">
                <ReplyInput onChangeReply={(value) => handleReply(value)} show={show} />
                {replies?.map((reply, index: number) => (
                    <FeedbackComment
                        key={index}
                        avatar={reply.user.avatar}
                        content={reply.content}
                        name={reply.user.name}
                        createdAt={reply.createdAt}
                    />
                ))}
            </article>
            <div className="d-xl-none d-block">
                <ModalCustom position="bottom" zIndexOverlay={50} className="comment__feedback-modal" show={show} onHandleShow={onShow}>
                    <div className="comment__feedback-modal-header px-2 py-3 border-b-f7">
                        <div className="position-relative h-100 d-flex align-items-center justify-content-center">
                            <span onClick={onShow} className="navCategoryModal__header-icon"><IoCloseSharp size={25} /></span>
                            <p className="mb-0 navCategoryModal__header-text text-center">Bình luận</p>
                        </div>
                    </div>
                    <div className="comment__feedback-modal-body px-3">
                        {replies?.map((reply, index: number) => (
                            <FeedbackComment
                                key={index}
                                avatar={reply.user.avatar}
                                content={reply.content}
                                name={reply.user.name}
                                createdAt={reply.createdAt}
                            />
                        ))}
                    </div>
                    <div className="modalCustom__footer p-2">
                        <ReplyInput 
                            onChangeReply={(value) => handleReply(value)} 
                            show={true} 
                        />
                    </div>
                </ModalCustom>
            </div>
        </>
    );
}

export default CommentFeedback;