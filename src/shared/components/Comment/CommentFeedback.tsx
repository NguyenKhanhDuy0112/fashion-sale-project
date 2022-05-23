import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import FeedbackComment from "../FeedbackComment";
import ModalCustom from "../ModalCustom";
import ReplyInput from "../ReplyInput";

interface Props {
    show: boolean,
    onShow: () => void,
}

function CommentFeedback(props: Props) {
    const { show, onShow } = props
    const [reply, setReply] = useState('')

    return (
        <>
            <article className="d-xl-block d-none">
                <ReplyInput onChangeReply={(value) => setReply(value)} show={show} />
                <FeedbackComment />
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
                        <FeedbackComment />
                    </div>
                    <div className="modalCustom__footer p-2">
                        <ReplyInput onChangeReply={(value) => setReply(value)} show={true} />
                    </div>
                </ModalCustom>
            </div>
        </>
    );
}

export default CommentFeedback;