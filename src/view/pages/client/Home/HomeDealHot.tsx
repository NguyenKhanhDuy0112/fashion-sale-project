import { Link } from "react-router-dom";
import ProductSale from "../../../../shared/components/ProductSale";
import { Navigation } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
import Countdown from "../../../../shared/components/Countdown";
import { useEffect, useState } from "react";
import productsService from "../../../../services/productService";

function HomeDealHot() {

    const [products, setProducts] = useState<any[]>()
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        handleLoadProductDiscount()
    }, [])

    const handleLoadProductDiscount = async () => {
        const products = await productsService.getProductsDiscountCountdown()
        setProducts(products.data)
        setLoading(false)
    }

    return (
        <div className="container-client none">
            <article className="homeDealHot mt-3 py-3">
                <div className="d-flex justify-content-between align-items-center mb-3 ps-xl-3 ps-2 pe-xl-3 pe-2">
                    <div className="d-flex">
                        <div className="d-flex me-3">
                            <img className="homeDealHot__img" src="https://frontend.tikicdn.com/_desktop-next/static/img/giasoc.svg" alt="" />
                            <img className="homeDealHot__img homeDealHot__img--thunder" src="https://frontend.tikicdn.com/_desktop-next/static/img/dealFlashIcon.svg" alt="" />
                            <img className="homeDealHot__img" src="https://frontend.tikicdn.com/_desktop-next/static/img/homnay.svg" alt="" />
                        </div>
                        <div className="d-xl-block d-none">
                            <Countdown />
                        </div>
                    </div>
                    <div className="d-xl-none d-block">
                        <Countdown />
                    </div>
                    <Link className="homeDealHot__read-more d-xl-block d-none" to="/">Xem thêm</Link>
                </div>
                <Swiper
                    modules={[Navigation]}
                    navigation
                    className="homeDealHot__swiper ps-xl-0 ps-1"
                    breakpoints={{
                        0: {
                            slidesPerView: 2.56,
                            spaceBetween: 0
                        },
                        768: {
                            slidesPerView: 4.56,
                            spaceBetween: 0
                        },
                        1028: {
                            slidesPerView: 6,
                            spaceBetween: 0
                        }

                    }}
                    scrollbar={{ draggable: true }}



                >
                    {
                        loading
                            ?
                            Array.from({ length: 10 }).map((item, index) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <ProductSale
                                            loading={loading}
                                            url="/"
                                            title=""
                                            image=""
                                            price={0}
                                            discount={0}
                                            quantity={0}
                                            sold={0}
                                            intro={true}
                                        />
                                    </SwiperSlide>
                                )
                            })
                            :
                            products?.map(pro => {
                                return (
                                    <SwiperSlide key={pro._id}>
                                        <ProductSale
                                            loading={loading}
                                            url={`/products/${pro.slug}`}
                                            title={`${pro.name}`}
                                            image={`${pro.productDetails ? pro.productDetails[0]?.images[0].image : ''}`}
                                            price={(pro.price ? pro.price: 0)}
                                            discount={pro.discount ? pro.discount : 0}
                                            quantity={pro.productDetails ? pro.productDetails.reduce((prev: number, cur:any) => prev + cur.quantity, 0) : 0}
                                            sold={pro.sold ? pro.sold : 0}
                                            intro={true}
                                        />
                                    </SwiperSlide>
                                )
                            })

                    }

                </Swiper>

            </article>
        </div>
    );
}

export default HomeDealHot;