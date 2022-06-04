import HeaderClient from "../../../../layout/client/HeaderClient";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import ProductDetailInfo from "./ProductDetailInfo/ProductDetailInfo";
import ProductDetailSimilar from "./ProductDetailSimilar";
import ProductDetailInfoDt from "./ProductDetailInfoDt";
import ProductDetailDescription from "./ProductDetailDescription/ProductDetailDescriptionDesk";
import { BsChat } from "react-icons/bs";
import HeaderClientProductItem from "../../../../layout/client/HeaderClientProductItem";
import ProductDetailComment from "./ProductDetailComment";
import ProductDetailMore from "./ProductDetailMore";
import FooterClient from "../../../../layout/client/FooterClient";

function ProductDetail() {
    return (
        <>
            <div className="d-xl-block d-none">
                <HeaderClient />
            </div>
            <div className="d-xl-none d-block">
                <HeaderClientProductItem />
            </div>
            <article className="productDetail bg-outside-client">
                <div className="container-client d-xl-block d-none">
                    <article className="breadcrumbCustom py-2">
                        <ul className="breadcrumbCustom__list align-items-start">
                            <li className="breadcrumbCustom__list-item">
                                <Link to="/" className="breadcrumbCustom__list-item-link">Trang chủ</Link>
                            </li>
                            <li className="breadcrumbCustom__list-item mx-1">
                                <span className="breadcrumbCustom__list-item-link">
                                    <IoIosArrowForward />
                                </span>
                            </li>
                            <li className="breadcrumbCustom__list-item">
                                <Link to="/" className="breadcrumbCustom__list-item-link">Áo thun nam ngắn tay có cổ</Link>
                            </li>
                            <li className="breadcrumbCustom__list-item mx-1">
                                <span className="breadcrumbCustom__list-item-link">
                                    <IoIosArrowForward />
                                </span>
                            </li>
                            <li className="breadcrumbCustom__list-item">
                                <span className="breadcrumbCustom__list-item-link none">
                                    Áo thun nam
                                </span>
                            </li>
                        </ul>
                    </article>
                </div>
                <div className="pb-3">
                    <ProductDetailInfo />
                    <ProductDetailSimilar />
                    <ProductDetailInfoDt />
                    <ProductDetailDescription description="" />
                    <ProductDetailComment />
                    <ProductDetailMore />
                </div>
            </article>

            <div className="navClient productDetail__nav-buy d-xl-none d-block">
                <div className="row g-0 w-100 h-100">
                    <div className="col-auto h-100 me-2 d-flex justify-content-start">
                        <button className="productDetail__info-content-chat">
                            <span className="productDetail__info-content-chat-icon">
                                <BsChat size={17} />
                            </span>
                            <span className="productDetail__info-content-chat-text">Chat</span>
                        </button>
                    </div>
                    <div className="col h-100">
                        <button className="productDetail__info-content-buy flex-grow-1 h-100">
                            Chọn Mua
                        </button>
                    </div>

                </div>
            </div>

            <div className="d-xl-block d-none">
                <FooterClient />
            </div>
        </>
    );
}

export default ProductDetail;