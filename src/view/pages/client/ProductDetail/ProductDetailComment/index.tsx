import { useEffect, useState } from "react";
import commentsService from "../../../../../services/commentsService";
import RankRating from "../../../../../shared/components/RankRating";
import useCurrentUser from "../../../../../shared/hooks/useCurrentUser";
import { Comment, Product } from "../../../../../shared/interfaces";
import ProductDetailCommentDesk from "./ProductDetailCommentDesk";
import ProductDetailCommentFilter from "./ProductDetailCommentFilter";
import ProductDetailCommentModal from "./ProductDetailCommentModal";

interface ProductDetailCommentProps{
    product?: Product,
    loading: boolean
}

function ProductDetailComment(props: ProductDetailCommentProps) {
    const { product, loading } = props
    const [showModalComment, setShowModalComment] = useState<boolean>(false)
    const [comments, setComments] = useState<Comment[]>()
    const [loadingComment, setLoadingComment] = useState(true)
    const currentUser = useCurrentUser()

    useEffect(() => {
        handleLoadComment()
    },[product])

    const handleLoadComment = async () => {
        try{
            const comments = await commentsService.getCommentsByProductId((product && product._id) ? product._id : "", currentUser._id ? currentUser._id : "")
            console.log("Comments detail: ", comments.data)
            setComments(comments.data)
            setLoadingComment(false)
        }catch(err){
            console.log("Failed load comment")
            setLoadingComment(false)
        }
    }

    return (
        <>
            <article className="productDetail__comment mt-xl-3 mt-2">
                <div className="container-client none">
                    <div className="bg-white border-radius-4 p-3">
                        <h4 className="productDetail__title d-xl-block d-none">Đánh Giá - Nhận Xét Từ Khách Hàng</h4>
                        <h4 className="productDetail__title d-xl-none d-block">Khách Hàng Đánh Giá</h4>

                        <div className="row g-3">
                            <div className="col-xl-3">
                                <RankRating product={product}/>
                            </div>
                            <div className="col d-xl-block d-none">
                                <ProductDetailCommentFilter />
                            </div>
                        </div>
                        <ProductDetailCommentDesk 
                            comments={comments} 
                            loading = {loadingComment}
                            onLoadComment = {handleLoadComment}
                        />

                        <button onClick={() => setShowModalComment(!showModalComment)} className="productDetail__comment-btn-more d-xl-none d-block">
                            Xem tất cả 185 đánh giá
                        </button>
                    </div>
                </div>
            </article>
            <ProductDetailCommentModal 
                product = {product} 
                onShow={() => setShowModalComment(!showModalComment)} 
                show = {showModalComment}
            />
        </>
    );
}

export default ProductDetailComment;