import { IoCloseSharp } from "react-icons/io5";
import Comment from "../../../../../shared/components/Comment";
import ModalCustom from "../../../../../shared/components/ModalCustom";
import RankRating from "../../../../../shared/components/RankRating";
import RankRatingMobile from "../../../../../shared/components/RankRating/RankRatingMobile";
import { Comment as CommentI, Product } from "../../../../../shared/interfaces";
import ProductDetailCommentFilter from "./ProductDetailCommentFilter";
import images from "../../../../../shared/assets";

interface Props {
    show: boolean,
    product?: Product,
    onShow: () => void,
    onLoadComment: () => void,
    comments?: CommentI[],
}

function ProductDetailCommentModal(props: Props) {
    const { show, onShow, product, onLoadComment, comments } = props

    return (
        <ModalCustom show={show} onHandleShow={onShow} position="full">
            <div className="modalCustom__header px-2">
                <span onClick={onShow} className="modalCustom__header-icon p-1">
                    <IoCloseSharp size={30} color="#fff" />
                </span>
                <h5 className="modalCustom__header-title">Đánh giá sản phẩm</h5>
            </div>
            <div className="modalCustom__body mt-5 py-4">
                <div>
                    <div className="px-3">
                        <RankRatingMobile product={product} />
                    </div>
                    <div className="mt-2 px-3">
                        <ProductDetailCommentFilter />
                    </div>
                    <div className="px-3">
                        {comments && comments.map(comment => (
                            <Comment key={comment._id} onLoadComment={onLoadComment} loading={false} comment={comment} />
                        ))}
                       
                    </div>
                </div>

            </div>
        </ModalCustom>
    );
}

export default ProductDetailCommentModal;