import { useState } from "react";
import { BsChat } from "react-icons/bs";
import { Link } from "react-router-dom";
import InputQuantity from "../../../../shared/components/InputQuantity";
import Rating from "../../../../shared/components/Rating";
import ProductDetailOption from "./ProductDetailOption";

function ProductDetailInfo() {
    const [quantity, setQuantity] = useState(1)
    return (
        <article className="productDetail__info container-client none">
            <div className="bg-white border-radius-4">
                <div className="row g-0">
                    <div className="col-xl-5 col-12">
                        <div className="productDetail__info-image p-3 border-r-f7">
                            <img
                                src="https://salt.tikicdn.com/cache/400x400/ts/product/f4/01/32/a34e42c926adad4544ab8309d0173ff6.png.webp" alt=""
                                className="productDetail__info-image-thumnail w-100"
                            />
                            <div className="row g-2 mt-1 productDetail__info-image-review">
                                <div className="col-2">
                                    <img className="productDetail__info-image-review-item active" src="https://salt.tikicdn.com/cache/100x100/ts/product/0c/e9/03/d6b32052e71a0d3928ce278400163e8d.png.webp" alt="" />
                                </div>
                                <div className="col-2">
                                    <img className="productDetail__info-image-review-item" src="https://salt.tikicdn.com/cache/100x100/ts/product/0c/e9/03/d6b32052e71a0d3928ce278400163e8d.png.webp" alt="" />
                                </div>
                                <div className="col-2">
                                    <img className="productDetail__info-image-review-item" src="https://salt.tikicdn.com/cache/100x100/ts/product/0c/e9/03/d6b32052e71a0d3928ce278400163e8d.png.webp" alt="" />
                                </div>
                                <div className="col-2">
                                    <img className="productDetail__info-image-review-item" src="https://salt.tikicdn.com/cache/100x100/ts/product/0c/e9/03/d6b32052e71a0d3928ce278400163e8d.png.webp" alt="" />
                                </div>
                                <div className="col-2">
                                    <img className="productDetail__info-image-review-item" src="https://salt.tikicdn.com/cache/100x100/ts/product/0c/e9/03/d6b32052e71a0d3928ce278400163e8d.png.webp" alt="" />
                                </div>
                                <div className="col-2">
                                    <img className="productDetail__info-image-review-item" src="https://salt.tikicdn.com/cache/100x100/ts/product/0c/e9/03/d6b32052e71a0d3928ce278400163e8d.png.webp" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl col-12">
                        <div className="productDetail__info-content p-3">
                            <p className="productDetail__info-content-brand mb-1">
                                Thương hiệu: <Link to="" className="productDetail__info-content-brand-name">5S</Link>
                            </p>
                            <h4 className="productDetail__info-content-title mb-2">
                                Áo Thun Nam 5S Có Cổ (4 Màu) Chất Liệu Cotton Premium, Siêu Mát, Phom Dáng Trẻ Trung, (APC21014)
                            </h4>
                            <div className="productDetail__info-content-rating d-flex align-items-center mb-3">
                                <Rating stars={5} color="#FDD836" size={14} distance={1} />
                                <Link to="#comment" className="productDetail__info-content-rating-comment ms-2">
                                    (Xem 370 đánh giá)
                                </Link>
                                <div className="productDetail__info-content-rating-separate mx-2"></div>
                                <p className="productDetail__info-content-rating-selled mb-0">
                                    Đã bán 50
                                </p>
                            </div>
                            <div className="productDetail__info-content-price p-xl-3 p-0 mb-3">
                                <p className="productDetail__info-content-price-current mb-0">
                                    199.000 ₫
                                </p>
                                <p className="productDetail__info-content-price-old mb-0 mx-2">
                                    429.000 ₫
                                </p>
                                <p className="mb-0 productDetail__info-content-price-discount">
                                    -54%
                                </p>
                            </div>
                            <ProductDetailOption />
                            <p className="mb-2">Số lượng</p>
                            <InputQuantity
                                max={100}
                                onQuantity={(number) => setQuantity(number)}
                                value={quantity}
                            />
                            <div className="d-flex mt-3">
                                <button className="productDetail__info-content-buy">
                                    Chọn Mua
                                </button>

                                <button className="productDetail__info-content-chat ms-2">
                                    <span className="productDetail__info-content-chat-icon">
                                        <BsChat />
                                    </span>
                                    <span className="productDetail__info-content-chat-text">Chat</span>
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}

export default ProductDetailInfo;