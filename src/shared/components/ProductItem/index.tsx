import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { formatCashVND } from "../../helpers";
import { Product } from "../../interfaces";
import Rating from "../Rating";

interface Props {
    product?: Product,
    loading: boolean
    hideImageSub?: boolean,
}

function ProductItem(props: Props) {
    const { hideImageSub, product, loading } = props

    const [imgCurrent, setImgCurrent] = useState('')

    useEffect(() => {
        setImgCurrent(product?.productDetails && product.productDetails[0].images[0])
    },[product])

    return (
        <Link to={`/products/${product?.slug}`} className="card productSale p-xl-3 p-1">
            {loading && <Skeleton height={200}/>}
            {!loading &&  <div className="productSale__img" style={{ backgroundImage: `url(${imgCurrent})` }}></div>}
            <div className="card-body productSale__body mt-xl-1 mt-0 p-xl-0 p-2">
                {!hideImageSub && <div className="d-xl-block d-none">
                    <Swiper
                        modules={[Navigation]}
                        navigation
                        className="productSale__swiper d-xl-block d-none"
                        breakpoints={{
                            0: {
                                slidesPerView: 2,
                                spaceBetween: 10
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 10
                            },
                            1028: {
                                slidesPerView: 4,
                                spaceBetween: 10
                            }

                        }}
                        scrollbar={{ draggable: true }}

                    >
                        {product?.productDetails && product.productDetails.map((pro: any, index: number) => {

                            return (
                                <SwiperSlide key={index}>
                                    <img
                                        onMouseEnter={() => setImgCurrent(pro.images[0])}
                                        className={`productSale__img-sub cursor-pointer ${pro.images[0] === imgCurrent ? 'active' : ''}`}
                                        src={pro.images[0]}
                                        alt=""
                                    />
                                </SwiperSlide>
                            )
                        })}

                    </Swiper>
                </div>
                }
                <h5 className="card-title productSale__title mt-1">
                    {loading ? <Skeleton /> : product?.name}
                </h5>
                <div className="d-flex align-items-center">
                    {loading ? <Skeleton /> :
                        <div className="d-flex align-items-center">
                            <Rating
                                distance={1}
                                size={12}
                                color="#FDDA40"
                                stars={product?.rating ? product.rating : 0}
                            />
                            <div className="productSale__border-distance"></div>
                            <p className="productSale__sold mb-0">Đã bán {product?.sold}</p>
                        </div>
                    }
                </div>
                <div className="d-flex align-items-center">
                    {loading ? <Skeleton />
                        :
                        product?.price &&
                        <p
                            className="productSale__price-current mb-0"
                        >
                            {formatCashVND((product.price - (product.price * ((product.discount ? product.discount : 0)/100))) + "", ".")} ₫
                        </p>
                    }

                    {loading ? <Skeleton /> : <span className={`productSale__discount ${(product?.discount && product.discount > 0) ? 'd-block' : 'd-none'}`}>{product?.discount}%</span>}
                </div>
            </div>
        </Link>
    );
}

export default ProductItem;