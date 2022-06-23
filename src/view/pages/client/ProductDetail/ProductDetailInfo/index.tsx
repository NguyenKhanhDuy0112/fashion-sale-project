import { useState } from "react";
import { BsChat } from "react-icons/bs";
import Skeleton from "react-loading-skeleton";
import { useDispatch } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { addProduct } from "../../../../../modules/cart/cartSlice";
import { toggleFormLogin } from "../../../../../modules/loginForm/loginFormSlice";
import { showCartNotify } from "../../../../../modules/notifyCart/notifyCartSlice";
import InputQuantity from "../../../../../shared/components/InputQuantity";
import Rating from "../../../../../shared/components/Rating";
import { formatCashVND } from "../../../../../shared/helpers";
import useCurrentUser from "../../../../../shared/hooks/useCurrentUser";
import { Product, ProductDetailOrder } from "../../../../../shared/interfaces";
import ProductDetailOption from "../ProductDetailOption";
import ProductDetailInfoImage from "./ProductDetailInfoImage";

interface ProductDetailInfoProps {
    productInfo?: Product,
    loading: boolean,
}

function ProductDetailInfo(props: ProductDetailInfoProps) {
    const { productInfo, loading } = props
    const [searchParams, setSearchParams] = useSearchParams()
    const currentUser = useCurrentUser()
    const dispatch = useDispatch()

    const [quantity, setQuantity] = useState(1)

    const handleAddToCart = () => {
        dispatch(showCartNotify({show: true, delay: 5000}))
        window.scrollTo(0,0)

        if(currentUser._id !== ''){
            if(searchParams.get('spId')){
                const productDetail:any = productInfo?.productDetails
                const product = productDetail.find((pro:any) => pro._id === searchParams.get('spId'))
                
                dispatch(addProduct({key: currentUser._id ? currentUser._id : '', product: {...product, quantity: quantity,product: productInfo, isChecking: false}}))
            }
        }
        else{
            dispatch(toggleFormLogin())
        }
    }

    return (
        <>
            <article className="productDetail__info container-client none">
                <div className="bg-white border-radius-4">
                    <div className="row g-0">
                        <div className="col-xl-5 col-12">
                            <ProductDetailInfoImage
                                loading={loading}
                                productDetails={productInfo?.productDetails}
                            />
                        </div>
                        <div className="col-xl col-12">
                            <div className="productDetail__info-content p-3">
                                {
                                    loading
                                        ?
                                        <Skeleton />
                                        :
                                        <p className="productDetail__info-content-brand mb-1 d-xl-block d-none">
                                            Thương hiệu:
                                            <Link
                                                to={`/thuong-hieu/${productInfo?.trademark._id}`}
                                                className="productDetail__info-content-brand-name ms-1"
                                            >
                                                {productInfo?.trademark.name}
                                            </Link>
                                        </p>
                                }
                                <h4 className="productDetail__info-content-title mb-2">
                                    {loading ? <Skeleton /> : productInfo?.name}
                                </h4>
                                {loading ? <Skeleton /> :
                                    <div className="productDetail__info-content-rating d-flex align-items-center mb-xl-3 mb-2">
                                        <Rating
                                            stars={productInfo?.rating ? productInfo.rating : 0}
                                            color="#FDD836"
                                            size={14}
                                            distance={1}
                                        />
                                        {productInfo && productInfo.comments && productInfo.comments.length > 0 &&
                                            <Link to="#comment" className="productDetail__info-content-rating-comment ms-2">
                                                <span className="d-xl-inline d-none">
                                                    (Xem</span> {productInfo?.comments?.length} <span></span> <span className="d-xl-inline d-none">đánh giá)
                                                </span>
                                            </Link>
                                        }
                                        <div className="productDetail__info-content-rating-separate mx-2"></div>
                                        <p className="productDetail__info-content-rating-selled mb-0">
                                            Đã bán {productInfo?.sold}
                                        </p>
                                    </div>
                                }
                                {loading ?
                                    <div className="mb-3">
                                        <Skeleton height={70} />
                                    </div>
                                    :
                                    <div className="productDetail__info-content-price align-items-xl-end align-items-center p-xl-3 p-0 mb-3">
                                        <p className="productDetail__info-content-price-current mb-0">
                                            {(productInfo && productInfo.price)
                                                ?
                                                formatCashVND(productInfo.price - (productInfo.price * ((productInfo.discount ? productInfo.discount : 0) / 100)) + "", ".")

                                                :
                                                0
                                            } ₫

                                        </p>
                                        {(productInfo && productInfo.discount && productInfo.discount > 0)
                                            ?
                                            <p className="productDetail__info-content-price-old mb-0 mx-2">
                                                {formatCashVND(productInfo.price+"",".")} ₫
                                            </p>
                                            :
                                            ''
                                        }
                                        {(productInfo && productInfo.discount && productInfo.discount > 0) ?
                                            <p className="mb-0 productDetail__info-content-price-discount">
                                                -{productInfo?.discount}%
                                            </p> :
                                            ''
                                        }
                                    </div>
                                }
                                <ProductDetailOption loading={loading} product={productInfo} />
                                {!loading &&
                                    <div>
                                        <p className="mb-2 d-xl-block d-none">Số lượng</p>
                                        <div className="d-xl-block d-none">
                                            <InputQuantity
                                                max={100}
                                                onQuantity={(number) => setQuantity(number)}
                                                value={quantity}
                                            />
                                        </div>
                                    </div>
                                }
                                {!loading &&
                                    <div className="d-xl-flex d-none mt-3">
                                        <button onClick={handleAddToCart} className="productDetail__info-content-buy">
                                            Chọn Mua
                                        </button>

                                        <button className="productDetail__info-content-chat ms-2">
                                            <span className="productDetail__info-content-chat-icon">
                                                <BsChat />
                                            </span>
                                            <span className="productDetail__info-content-chat-text">Chat</span>
                                        </button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </>
    );
}

export default ProductDetailInfo;