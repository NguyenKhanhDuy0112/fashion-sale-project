import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

function HomeService() {
    return (
        <div className='container-client none'>
            <article className="HomeService border-radius-4 py-3 px-xl-3 px-0 bg-white mt-3">
                <Swiper
                    breakpoints={{
                        0: {
                            slidesPerView: 4.5,
                            spaceBetween: 10
                        },
                        768: {
                            slidesPerView: 5.56,
                            spaceBetween: 10
                        },
                        1028: {
                            slidesPerView: 10,
                            spaceBetween: 10
                        }

                    }}
                    scrollbar={{ draggable: true }}

                >
                    <SwiperSlide>
                        <Link to="/" className='homeService__card'>
                            <img className='homeService__img' src="https://salt.tikicdn.com/ts/upload/7b/fc/54/777d24de8eff003bda7a8d5f4294f9a8.gif" alt="" />
                            <p className='homeService__text mb-0 mt-2 text-center'>
                                Mua sắm có lời
                            </p>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/" className='homeService__card'>
                            <img className='homeService__img' src="https://salt.tikicdn.com/cache/w100/ts/upload/2b/f3/11/74a188b01c43a4bb3fc07d3734492390.png.webp" alt="" />
                            <p className='homeService__text mb-0 mt-2 text-center'>
                                Bí kíp săn sale
                            </p>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/" className='homeService__card'>
                            <img className='homeService__img' src="https://salt.tikicdn.com/cache/w100/ts/upload/68/9c/2f/6fc82a9a9713a2c2b1968e9760879f6e.png.webp" alt="" />
                            <p className='homeService__text mb-0 mt-2 text-center'>
                                Đi chợ siêu tốc
                            </p>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/" className='homeService__card'>
                            <img className='homeService__img' src="https://salt.tikicdn.com/cache/w100/ts/upload/ff/20/4a/0a7c547424f2d976b6012179ed745819.png.webp" alt="" />
                            <p className='homeService__text mb-0 mt-2 text-center'>
                                Mua bán ASA/XU
                            </p>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/" className='homeService__card'>
                            <img className='homeService__img' src="https://salt.tikicdn.com/cache/w100/ts/upload/73/50/e1/83afc85db37c472de60ebef6eceb41a7.png.webp" alt="" />
                            <p className='homeService__text mb-0 mt-2 text-center'>
                                Mã giảm giá
                            </p>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/" className='homeService__card'>
                            <img className='homeService__img' src="https://salt.tikicdn.com/cache/w100/ts/upload/ef/ae/82/f40611ad6dfc68a0d26451582a65102f.png.webp" alt="" />
                            <p className='homeService__text mb-0 mt-2 text-center'>
                                Bảo hiểm Tiki360
                            </p>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/" className='homeService__card'>
                            <img className='homeService__img' src="https://salt.tikicdn.com/cache/w100/ts/upload/73/e0/7d/af993bdbf150763f3352ffa79e6a7117.png.webp" alt="" />
                            <p className='homeService__text mb-0 mt-2 text-center'>
                                Dịch vụ và tiện ích
                            </p>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/" className='homeService__card'>
                            <img className='homeService__img' src="https://salt.tikicdn.com/cache/w100/ts/upload/99/29/ff/cea178635fd5a24ad01617cae66c065c.png.webp" alt="" />
                            <p className='homeService__text mb-0 mt-2 text-center'>
                                Giảm đến 50%
                            </p>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/" className='homeService__card'>
                            <img className='homeService__img' src="https://salt.tikicdn.com/cache/w100/ts/upload/52/50/73/0788d5207ec8b82e05859dfe953a4327.png.webp" alt="" />
                            <p className='homeService__text mb-0 mt-2 text-center'>
                                Hoàn tiền 15%
                            </p>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/" className='homeService__card'>
                            <img className='homeService__img' src="https://salt.tikicdn.com/cache/w100/ts/upload/4a/b2/c5/b388ee0e511889c83fab1217608fe82f.png.webp" alt="" />
                            <p className='homeService__text mb-0 mt-2 text-center'>
                                Ưu đãi thanh toán
                            </p>
                        </Link>
                    </SwiperSlide>

                </Swiper>
            </article>
        </div>
    );
}

export default HomeService;