import { Link } from "react-router-dom";
import ProductSale from "../../../../shared/components/ProductSale";
import { Navigation } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
import Countdown from "../../../../shared/components/Countdown";

function HomeDealHot() {

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
                    {Array.from({ length: 30 }).map((item,index) => {
                        return (
                            <SwiperSlide key={index}>
                                <ProductSale
                                    url="/"
                                    title="Áo Sơ Mi Form Rộng Unisex Nam Nữ Tay Dài Hàn Quốc Kiểu Cổ Vest Cổ Ve Áo Khoác Ngoài Vải Lụa Mềm Mịn - SMV01 - Màu xanh đậm - XL"
                                    image="https://salt.tikicdn.com/cache/200x200/ts/product/08/8d/27/0ba57ab422f7f1e709d8383c187615ff.png.webp"
                                    price={210000}
                                    discount={50}
                                    quantity={100}
                                    sold={50}
                                    intro={true}
                                />
                            </SwiperSlide>
                        )
                    })}

                </Swiper>

            </article>
        </div>
    );
}

export default HomeDealHot;