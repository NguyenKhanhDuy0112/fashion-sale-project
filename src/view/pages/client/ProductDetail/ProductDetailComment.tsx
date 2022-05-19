import { FiStar } from "react-icons/fi";
import RankRating from "../../../../shared/components/RankRating";

function ProductDetailComment() {
    
    return (
        <article className="productDetail__comment mt-3">
            <div className="container-client">
                <div className="bg-white p-3 border-radius-4">
                    <h4 className="productDetail__title">Đánh Giá - Nhận Xét Từ Khách Hàng</h4>
                    <div className="row g-3">
                        <div className="col-3">
                            <RankRating />
                        </div>
                        <div className="col">
                            <div className="d-flex align-items-center">
                                <p className="mb-0">Lọc xem theo: </p>
                                <div className="d-flex ms-2">
                                    <span className="productDetail__comment-filter-tag me-2">Mới nhất</span>
                                    <span className="productDetail__comment-filter-tag me-2">5 <small className="ms-1"><FiStar size={16}/></small></span>
                                    <span className="productDetail__comment-filter-tag me-2">4 <small className="ms-1"><FiStar size={16}/></small></span>
                                    <span className="productDetail__comment-filter-tag me-2">3 <small className="ms-1"><FiStar size={16}/></small></span>
                                    <span className="productDetail__comment-filter-tag me-2">2 <small className="ms-1"><FiStar size={16}/></small></span>
                                    <span className="productDetail__comment-filter-tag">1 <small className="ms-1"><FiStar size={16}/></small></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}

export default ProductDetailComment;