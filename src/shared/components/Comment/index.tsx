import { useState } from "react";
import { BiCheck, BiLike } from "react-icons/bi";
import Rating from "../Rating";
import CommentFeedback from "./CommentFeedback";

function Comment() {
    const [showReply, setShowReply] = useState(false)
    const [reply, setReply] = useState('')

    return (
        <>
            <article className="comment py-4 mt-4">
                <div className="row">
                    <div className="col-xl-3 col-12">
                        <div className="comment__user">
                            <div className="comment__user-info d-flex align-items-center">
                                <img className="comment__user-info-img" src="https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg" alt="" />
                                <div className="ms-2">
                                    <div className="d-flex align-items-center">
                                        <p className="comment__user-info-name mb-0">Khanh Duy</p>
                                        <div className="d-xl-none d-flex comment__content-status ms-2">
                                            <span className="comment__content-status-icon me-1">
                                                <BiCheck />
                                            </span>
                                            <span className="comment__content-status-text">Đã mua hàng</span>
                                        </div>
                                    </div>
                                    <span className="comment__user-info-joined">Đã tham gia 2 năm</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl">
                        <div className="comment__content">
                            <div className="comment__content-rating mb-1">
                                <Rating color="#FFD52E" distance={1} size={13} stars={5} colorSub="#DDDDE3" />
                                <p className="comment__content-rating-status mb-0 ms-3">Cực kỳ hài lòng</p>
                            </div>
                            <div className="comment__content-status mb-2 d-xl-flex d-none">
                                <span className="comment__content-status-icon me-1">
                                    <BiCheck />
                                </span>
                                <span className="comment__content-status-text">Đã mua hàng</span>
                            </div>
                            <p className="comment__content-text mb-2">
                                Chất lượng sản phẩm tốt giao hàng nhanh, gói hàng đảm bảo và chắc chắn, thời gian giao hàng nhanh, đáng đồng tiền, sẽ ủng hộ shop lâu dài
                            </p>
                            <div className="row g-3">
                                <div className="col-md-2 col-3">
                                    <div className="comment__content-img" style={{ backgroundImage: `url(https://salt.tikicdn.com/ts/review/eb/d5/0c/68f9d5f11ac2f2df6856d9dcf5c4d6f0.jpg)` }}></div>
                                </div>
                                <div className="col-md-2 col-3">
                                    <div className="comment__content-img" style={{ backgroundImage: `url(https://salt.tikicdn.com/ts/review/09/18/e6/60cc14c2b6f87b32d4b95b2b5d3df5c9.jpg)` }}></div>
                                </div>
                            </div>
                            <div className="d-flex align-items-center mt-1">
                                <p className="comment__content-time mb-0">Màu: Xanh</p>
                                <span className="comment__content-time-icon mx-3"></span>
                                <p className="comment__content-time mb-0">Kích cỡ: L</p>
                            </div>
                            <p className="comment__content-time mb-2">Đánh giá vào 2 tháng trước</p>
                            <div className="d-flex">
                                <button className="comment__content-btn px-3 py-2 comment__content-btn-like">
                                    <BiLike size={17} /> Hữu ích
                                </button>
                                <button onClick={() => setShowReply(!showReply)} className="comment__content-btn px-3 py-2 comment__content-btn-cmt ms-2">
                                    Bình luận
                                </button>
                            </div>

                            <CommentFeedback onShow={() => setShowReply(!showReply)} show={showReply} />

                        </div>
                    </div>
                </div>

            </article>
            
        </>
    );
}

export default Comment;