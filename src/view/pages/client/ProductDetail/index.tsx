import HeaderClient from "../../../../layout/client/HeaderClient";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import ProductDetailInfo from "./ProductDetailInfo";
import ProductDetailSimilar from "./ProductDetailSimilar";
import ProductDetailInfoDt from "./ProductDetailInfoDt";
import ProductDetailDescription from "./ProductDetailDescription";
import ProductDetailComment from "./ProductDetailComment";

function ProductDetail() {
    return (
        <>
            <HeaderClient />
            <article className="productDetail bg-outside-client">
                <div className="container-client">
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
                                <span className="breadcrumbCustom__list-item-link">
                                    Áo thun nam
                                </span>
                            </li>
                        </ul>
                    </article>
                </div>
                <div className="pb-3">
                    <ProductDetailInfo/>
                    <ProductDetailSimilar/>
                    <ProductDetailInfoDt/>
                    <ProductDetailDescription/>
                    <ProductDetailComment/>
                </div>
            </article>
        </>
    );
}

export default ProductDetail;