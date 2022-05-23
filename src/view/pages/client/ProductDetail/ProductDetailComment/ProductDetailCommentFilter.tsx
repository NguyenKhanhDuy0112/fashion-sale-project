import { FiStar } from "react-icons/fi";

function ProductDetailCommentFilter() {
    return (
        <div className="d-flex align-items-center">
            <p className="mb-0 d-xl-block d-none">Lọc xem theo: </p>
            <div className="d-flex flex-wrap ms-2">
                <span className="productDetail__comment-filter-tag me-2 mt-2">Mới nhất</span>
                <span className="productDetail__comment-filter-tag me-2 mt-2">5 <small className="ms-1"><FiStar size={16} /></small></span>
                <span className="productDetail__comment-filter-tag me-2 mt-2">4 <small className="ms-1"><FiStar size={16} /></small></span>
                <span className="productDetail__comment-filter-tag me-2 mt-2">3 <small className="ms-1"><FiStar size={16} /></small></span>
                <span className="productDetail__comment-filter-tag me-2 mt-2">2 <small className="ms-1"><FiStar size={16} /></small></span>
                <span className="productDetail__comment-filter-tag mt-2">1 <small className="ms-1"><FiStar size={16} /></small></span>
            </div>
        </div>
    );
}

export default ProductDetailCommentFilter;