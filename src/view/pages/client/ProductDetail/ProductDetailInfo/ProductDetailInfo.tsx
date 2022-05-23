import { useState } from "react";
import { BsChat } from "react-icons/bs";
import { Link } from "react-router-dom";
import InputQuantity from "../../../../../shared/components/InputQuantity";
import Rating from "../../../../../shared/components/Rating";
import ProductDetailOption from "../ProductDetailOption";
import ProductDetailInfoImage from "./ProductDetailInfoImage";

const images = [
    "https://salt.tikicdn.com/cache/400x400/ts/product/52/e2/51/589567fae9aba385e3e960f83ac976a0.jpg.webp",
    "https://salt.tikicdn.com/cache/w1200/ts/product/ae/e7/b2/a017bc0ff65ff48606ddcab2ce82cb08.jpg",
    "https://salt.tikicdn.com/cache/w1200/ts/product/fc/a8/e6/752b2b7aa1dd5c602c4579205776547e.jpg",
    "https://salt.tikicdn.com/cache/w1200/ts/product/e0/a4/c1/1823c680723520f8294bbb0223ae95a5.jpg",
    "https://salt.tikicdn.com/cache/w1200/ts/product/d2/00/4e/044dd97cec3b4e10c6ba63b41120832d.jpg",
    "https://salt.tikicdn.com/cache/w1200/ts/product/2e/f7/89/f0608a3866ee2b752a57662f5b817991.jpg",
    "https://salt.tikicdn.com/cache/w1200/ts/product/84/ce/0a/03bc8d6dd141069369b35febeafcde76.jpg",
]

function ProductDetailInfo() {
    const [quantity, setQuantity] = useState(1)
    return (
        <>
            <article className="productDetail__info container-client none">
                <div className="bg-white border-radius-4">
                    <div className="row g-0">
                        <div className="col-xl-5 col-12">
                            <ProductDetailInfoImage images = {images}/>
                        </div>
                        <div className="col-xl col-12">
                            <div className="productDetail__info-content p-3">
                                <p className="productDetail__info-content-brand mb-1 d-xl-block d-none">
                                    Thương hiệu: <Link to="" className="productDetail__info-content-brand-name">5S</Link>
                                </p>
                                <h4 className="productDetail__info-content-title mb-2">
                                    Áo Thun Nam 5S Có Cổ (4 Màu) Chất Liệu Cotton Premium, Siêu Mát, Phom Dáng Trẻ Trung, (APC21014)
                                </h4>
                                <div className="productDetail__info-content-rating d-flex align-items-center mb-xl-3 mb-2">
                                    <Rating stars={5} color="#FDD836" size={14} distance={1} />
                                    <Link to="#comment" className="productDetail__info-content-rating-comment ms-2">
                                        
                                        <span className="d-xl-inline d-none">(Xem</span> <span>370</span> <span className="d-xl-inline d-none">đánh giá)</span>
                                    </Link>
                                    <div className="productDetail__info-content-rating-separate mx-2"></div>
                                    <p className="productDetail__info-content-rating-selled mb-0">
                                        Đã bán 50
                                    </p>
                                </div>
                                <div className="productDetail__info-content-price align-items-xl-end align-items-center p-xl-3 p-0 mb-3">
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
                                <p className="mb-2 d-xl-block d-none">Số lượng</p>
                                <div className="d-xl-block d-none">
                                    <InputQuantity
                                        max={100}
                                        onQuantity={(number) => setQuantity(number)}
                                        value={quantity}
                                    />
                                </div>
                                <div className="d-xl-flex d-none mt-3">
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
        </>
    );
}

export default ProductDetailInfo;