import { Swiper, SwiperSlide } from 'swiper/react';

function HomeSuggest() {
    return (
        <>
            <div className='container-client none'>
                <div className="border-radius-4 bg-white py-3 ps-xl-3 ps-2 mt-3 mb-1">
                    <h6 className='fw-500 homeCategory__title mb-0'>Gợi Ý Hôm Nay</h6>
                </div>
            </div>
            <article className="homeSuggest pb-1">
                <div className='container-client none'>
                    <Swiper
                        breakpoints={{
                            0: {
                                slidesPerView: 4.56,
                                spaceBetween: 5
                            },
                            768: {
                                slidesPerView: 4.56,
                                spaceBetween: 10
                            },
                            1028: {
                                slidesPerView: 8,
                                spaceBetween: 5
                            }

                        }}
                        scrollbar={{ draggable: true }}

                    >
                        <SwiperSlide>
                            <div className='homeSuggest__card h-100 active'>
                                <img className='homeSuggest__img' src="https://salt.tikicdn.com/cache/w100/ts/personalish/f9/27/b5/3a8e2286a1c8fb91b67acc5ee35f82f0.png.webp" alt="" />
                                <p className='homeSuggest__text mb-0 mt-2 text-center'>
                                    Dành Cho Bạn
                                </p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='homeSuggest__card h-100'>
                                <img className='homeSuggest__img' src="https://salt.tikicdn.com/cache/w100/ts/tikimsp/60/8d/45/524f4450d65d31323844619f9ebd4ad4.png.webp" alt="" />
                                <p className='homeSuggest__text mb-0 mt-2 text-center'>
                                    Sale Hè -50%
                                </p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='homeSuggest__card h-100'>
                                <img className='homeSuggest__img' src="https://salt.tikicdn.com/cache/w100/ts/tikimsp/75/ae/8e/0b41aaf913209b1e46f654a8737daaee.png.webp" alt="" />
                                <p className='homeSuggest__text mb-0 mt-2 text-center'>
                                    VOUCHER 100k
                                </p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='homeSuggest__card h-100'>
                                <img className='homeSuggest__img' src="https://salt.tikicdn.com/cache/w100/ts/personalish/41/99/9a/8898607d7fca4b79775a708c57a8152f.png.webp" alt="" />
                                <p className='homeSuggest__text mb-0 mt-2 text-center'>
                                    Deal Siêu Hot
                                </p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='homeSuggest__card h-100'>
                                <img className='homeSuggest__img' src="https://salt.tikicdn.com/cache/w100/ts/personalish/0f/59/9d/215fa18ef72e430eefcbfe5355cab8e2.png.webp" alt="" />
                                <p className='homeSuggest__text mb-0 mt-2 text-center'>
                                    Rẻ Vô Đối
                                </p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='homeSuggest__card h-100'>
                                <img className='homeSuggest__img' src="https://salt.tikicdn.com/cache/w100/ts/personalish/2c/25/8d/16f4e3834461f44d14b11cdd8a0ce918.png.webp" alt="" />
                                <p className='homeSuggest__text mb-0 mt-2 text-center'>
                                    Đi Chợ Siêu Sale
                                </p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='homeSuggest__card h-100'>
                                <img className='homeSuggest__img' src="https://salt.tikicdn.com/cache/w100/ts/personalish/7d/8a/6e/d8b76e2c43cbd06b7e1aa3ab8c54df64.png.webp" alt="" />
                                <p className='homeSuggest__text mb-0 mt-2 text-center'>
                                    Hàng Mới
                                </p>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='homeSuggest__card h-100'>
                                <img className='homeSuggest__img' src="https://salt.tikicdn.com/cache/w100/ts/personalish/dc/f1/b1/6ba9e529785de3ad1a81b9c569d05aa0.png.webp" alt="" />
                                <p className='homeSuggest__text mb-0 mt-2 text-center'>
                                    Xu Hướng Thời Trang
                                </p>
                            </div>
                        </SwiperSlide>


                    </Swiper>
                </div>

            </article>
        </>
    );
}

export default HomeSuggest;