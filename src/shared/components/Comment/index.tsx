import { useState } from "react";
import { BiCheck, BiLike } from "react-icons/bi";
import Moment from "react-moment";
import { Comment as CommentI } from "../../interfaces";
import Rating from "../Rating";
import CommentFeedback from "./CommentFeedback";
import 'moment/locale/vi';
import { FaRegTrashAlt } from "react-icons/fa";
import ModalCustomDelete from "../ModalCustomDelete";
import useCurrentUser from "../../hooks/useCurrentUser";
import commentsService from "../../../services/commentsService";
import { useDispatch } from "react-redux";
import { showToast } from "../../../modules/toast/toastSlice";

interface CommentProps {
    comment?: CommentI,
    loading: boolean,
    onLoadComment: () => void
}

function Comment(props: CommentProps) {
    const { comment, loading, onLoadComment } = props
    const currentUser = useCurrentUser()
    const [showReply, setShowReply] = useState(false)
    const [showModalDelete, setShowModalDelete] = useState(false)
    const dispatch = useDispatch()

    const handleDeleteComment = async () => {
        try {
            await commentsService.deleteComment((comment && comment._id) ? comment._id : "", currentUser._id ? currentUser._id : "")
            dispatch(showToast({ show: true, text: "Xóa bình luận thành công", type: "success", delay: 1500 }))
            onLoadComment()
        } catch (err) {
            dispatch(showToast({ show: true, text: "Xóa bình luận thất bại", type: "error", delay: 1500 }))
        }

    }

    const handleLike = async () => {
        console.log("Like....")
        try{
            await commentsService.like({user: currentUser._id ? currentUser._id : "", comment: (comment && comment._id) ? comment._id: ""})
            onLoadComment()
        }catch(err){

        }
    }

    return (
        <>
            <article className="comment py-4 mt-4">
                <div className="row">
                    <div className="col-xl-3 col-12">
                        <div className="comment__user">
                            <div className="comment__user-info d-flex align-items-center">
                                <img
                                    className="comment__user-info-img"
                                    src={comment?.user.avatar ? comment?.user.avatar : 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg'}
                                    alt=""
                                />
                                <div className="ms-2">
                                    <div className="d-flex align-items-center">
                                        <p className="comment__user-info-name mb-0">
                                            {comment?.user.name}
                                        </p>
                                        <div className="d-xl-none d-flex comment__content-status ms-2">
                                            <span className="comment__content-status-icon me-1">
                                                <BiCheck />
                                            </span>
                                            <span className="comment__content-status-text">Đã mua hàng</span>
                                        </div>
                                    </div>
                                    <span className="comment__user-info-joined">
                                        Đã tham gia <Moment fromNow ago>{comment?.user.createdAt}</Moment>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl">
                        <div className="comment__content">
                            <div className="comment__content-rating mb-1">
                                <Rating
                                    color="#FFD52E"
                                    distance={1}
                                    size={13}
                                    stars={comment ? comment.star : 0}
                                    colorSub="#DDDDE3"
                                />
                                <p className="comment__content-rating-status mb-0 ms-3">
                                    {comment?.star === 5 ? 'Cực kỳ hài lòng' : ''}
                                    {comment?.star === 4 ? 'Hài lòng' : ''}
                                    {comment?.star === 3 ? 'Bình thường' : ''}
                                    {comment?.star === 2 ? 'Không hài lòng' : ''}
                                    {comment?.star === 1 ? 'Rất không hài lòng' : ''}
                                </p>
                            </div>
                            <div className="comment__content-status mb-2 d-xl-flex d-none">
                                <span className="comment__content-status-icon me-1">
                                    <BiCheck />
                                </span>
                                <span className="comment__content-status-text">Đã mua hàng</span>
                            </div>
                            <p className="comment__content-text mb-2">
                                {comment?.content}
                            </p>
                            <div className="row g-3">
                                {comment?.images?.map(img => (
                                    <div key={img} className="col-md-2 col-3">
                                        <div
                                            className="comment__content-img"
                                            style={{ backgroundImage: `url(${img})` }}
                                        >

                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="d-flex align-items-center mt-1">
                                <p className="comment__content-time mb-0">
                                    Màu: <span className="text-uppercase">{comment?.product.color.color}</span>
                                </p>
                                <span className="comment__content-time-icon mx-3"></span>
                                <p className="comment__content-time mb-0">
                                    Kích cỡ: <span className="text-uppercase"> {comment?.product.size.size}</span>
                                </p>
                            </div>
                            <p className="comment__content-time mb-2">
                                Đánh giá vào <Moment fromNow>{comment?.createdAt}</Moment>
                            </p>
                            <div className="d-flex">
                                <button onClick={handleLike} className={`comment__content-btn px-3 py-2 comment__content-btn-like ${comment?.liked ? 'active' : ''}`}>
                                    <BiLike size={17} /> Hữu ích ({comment?.numberOfLikes})
                                </button>
                                <button onClick={() => setShowReply(!showReply)} className="comment__content-btn px-3 py-2 comment__content-btn-cmt ms-2">
                                    Bình luận
                                </button>
                            </div>

                            <CommentFeedback
                                parentId={comment?._id}
                                product={comment?.product}
                                replies={comment?.children}
                                onLoadComment={onLoadComment}
                                onShow={() => setShowReply(!showReply)}
                                show={showReply}
                            />

                        </div>
                    </div>
                    {currentUser.isAdmin === 1 &&
                        <div className="col-auto">
                            <span onClick={() => setShowModalDelete(!showModalDelete)} className="btn-delete cursor-pointer">
                                <FaRegTrashAlt />
                            </span>
                        </div>
                    }
                </div>

            </article>

            <ModalCustomDelete
                text="Bạn có chắc chắn muốn xóa bình luận này?"
                title="Xóa bình luận"
                onDelete={handleDeleteComment}
                onShow={() => setShowModalDelete(!showModalDelete)}
                show={showModalDelete}
            />

        </>
    );
}

export default Comment;