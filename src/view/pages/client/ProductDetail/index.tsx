import HeaderClient from "../../../../layout/client/HeaderClient";
import { Link, useSearchParams } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import ProductDetailInfo from "./ProductDetailInfo";
import ProductDetailSimilar from "./ProductDetailSimilar";
import ProductDetailInfoDt from "./ProductDetailInfoDt";
import ProductDetailDescription from "./ProductDetailDescription/ProductDetailDescriptionDesk";
import { BsChat } from "react-icons/bs";
import HeaderClientProductItem from "../../../../layout/client/HeaderClientProductItem";
import ProductDetailComment from "./ProductDetailComment";
import ProductDetailMore from "./ProductDetailMore";
import FooterClient from "../../../../layout/client/FooterClient";
import { useParams } from "react-router";
import productsService from "../../../../services/productService";
import { useEffect, useState } from "react";
import { Product } from "../../../../shared/interfaces";
import Skeleton from "react-loading-skeleton";

function ProductDetail() {
    const { slug } = useParams()
    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState<Product>()
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        setLoading(true)
        handleLoadProductBySlug()
    }, [slug])

    const handleLoadProductBySlug = async () => {
        const product = await productsService.findBySlug(slug ? slug : '')
        const productDetails = product.productDetails.map((proDt: any) => {
            proDt.color = proDt.color.color
            proDt.size = proDt.size.size
            proDt.images = [proDt.images[0].image, ...proDt.images[0].imagesSub]
            return { ...proDt }
        })

        if (searchParams.get('spId')) {
            const id = searchParams.get('spId') ?? ''
            searchParams.set('spId', id)
            setSearchParams(searchParams)
        }
        else {
            searchParams.append('spId', productDetails[0]._id)
            setSearchParams(searchParams)
        }

        product.productDetails = productDetails
        setProduct(product)
        setLoading(false)
    }

    console.log(product)

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
                                <Link to={`/${product?.category.slug}`} className="breadcrumbCustom__list-item-link">{product?.category.name}</Link>
                            </li>
                            <li className="breadcrumbCustom__list-item mx-1">
                                <span className="breadcrumbCustom__list-item-link">
                                    <IoIosArrowForward />
                                </span>
                            </li>
                            <li className="breadcrumbCustom__list-item">
                                <span className="breadcrumbCustom__list-item-link none">
                                    {product?.name}
                                </span>
                            </li>
                        </ul>
                    </article>
                </div>
                <div className="pb-3">
                    <ProductDetailInfo
                        loading={loading}
                        productInfo={product}
                    />
                    <ProductDetailSimilar 
                        currentProductId = {product?._id}
                        category = {product?.category._id}
                    />
                    <ProductDetailInfoDt 
                        product = {product} 
                        loading = {loading}
                    />
                    <ProductDetailDescription
                        description={product?.description}
                    />
                    <ProductDetailComment 
                        product = {product}
                        loading = {loading}
                    />
                    <ProductDetailMore />
                </div>
            </article>

            {loading ?
                <Skeleton height={40} />
                :
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
            }

            <div className="d-xl-block d-none">
                <FooterClient />
            </div>
        </>
    );
}

export default ProductDetail;