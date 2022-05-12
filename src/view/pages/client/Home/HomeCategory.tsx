import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid } from "swiper";

import "swiper/less/grid";
import "swiper/css/grid";

function HomeCategory() {
    return (
        <div className='container-client none'>
            <article className="homeCategory bg-white py-3 ps-xl-3 pe-xl-3 ps-0 pe-0 mt-3 border-radius-4">
                <h6 className='fw-500 homeCategory__title mb-4 ps-xl-0 ps-2'>Danh Mục Nổi Bật</h6>
                <Swiper

                    modules={[Grid]}
                    slidesPerGroup = {3}
                    
                    breakpoints={{
                        0: {
                            slidesPerView: 4.56,
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

                >
                    <SwiperSlide>
                        <Link to="/ngon" className='homeService__card'>
                            <img className='homeService__img homeCategory__img border-radius-20' src="https://salt.tikicdn.com/cache/w100/ts/category/1e/8c/08/d8b02f8a0d958c74539316e8cd437cbd.png.webp" alt="" />
                            <p className='homeService__text mb-0 mt-2 text-center'>
                                NGON
                            </p>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/ao-thun-nam-ngan-tay-co-co" className='homeService__card'>
                            <img className='homeService__img homeCategory__img border-radius-20' src="https://salt.tikicdn.com/cache/w100/ts/product/eb/92/00/8375d071ebd1ad0e7c54fe2db9c0bac3.jpg.webp" alt="" />
                            <p className='homeService__text mb-0 mt-2 text-center'>
                                Áo thun nam ngắn tay có cổ
                            </p>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/giay-the-thao-nam" className='homeService__card'>
                            <img className='homeService__img homeCategory__img border-radius-20' src="https://salt.tikicdn.com/cache/w100/ts/product/29/50/9c/74dcc8646429f6b258628f09e14c822d.jpg.webp" alt="" />
                            <p className='homeService__text mb-0 mt-2 text-center'>
                                Giày thể thao nam
                            </p>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/ao-thun-nu" className='homeService__card'>
                            <img className='homeService__img homeCategory__img border-radius-20' src="https://salt.tikicdn.com/cache/w100/ts/product/b1/47/b6/8e9b58fdfe5290d8a608f5d4578de832.jpg.webp" alt="" />
                            <p className='homeService__text mb-0 mt-2 text-center'>
                                Áo thun nữ
                            </p>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/balo" className='homeService__card'>
                            <img className='homeService__img homeCategory__img border-radius-20' src="https://salt.tikicdn.com/cache/w100/ts/product/1f/49/e2/ba487ca784c50a29bf5cc482a0f61dfa.jpg.webp" alt="" />
                            <p className='homeService__text mb-0 mt-2 text-center'>
                                Balo
                            </p>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/quan-tay-nam" className='homeService__card'>
                            <img className='homeService__img homeCategory__img border-radius-20' src="https://salt.tikicdn.com/cache/w100/ts/product/77/42/60/3978a9515c6a990d07e79e1cc086679c.jpg.webp" alt="" />
                            <p className='homeService__text mb-0 mt-2 text-center'>
                                Quần tây nam
                            </p>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/" className='homeService__card'>
                            <img className='homeService__img homeCategory__img border-radius-20' src="https://salt.tikicdn.com/cache/w100/ts/product/b4/9c/ee/47bb942702c47759bf2106ea04bfcd09.jpg.webp" alt="" />
                            <p className='homeService__text mb-0 mt-2 text-center'>
                                Ví ngắn
                            </p>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/" className='homeService__card'>
                            <img className='homeService__img homeCategory__img border-radius-20' src="https://salt.tikicdn.com/cache/w100/ts/product/d9/ab/41/7aba6e3871fb5243bfa512f91d4e0504.jpg.webp" alt="" />
                            <p className='homeService__text mb-0 mt-2 text-center'>
                                Sữa dưỡng thể
                            </p>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide className='h-100'>
                        <Link to="/" className='homeService__card'>
                            <img className='homeService__img homeCategory__img border-radius-20' src="https://salt.tikicdn.com/cache/w100/ts/product/cb/88/09/f7a7d0961a0b48dd9fb6d034e557fc54.png.webp" alt="" />
                            <p className='homeService__text mb-0 mt-2 text-center'>
                                Áo thun - Áo khoác nỉ nữ
                            </p>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/" className='homeService__card'>
                            <img className='homeService__img homeCategory__img border-radius-20' src="https://salt.tikicdn.com/cache/w100/ts/product/0c/7f/54/d9d28ec0880f92f831ea946e4e08fdce.jpg.webp" alt="" />
                            <p className='homeService__text mb-0 mt-2 text-center'>
                                Lập trình
                            </p>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/" className='homeService__card'>
                            <img className='homeService__img homeCategory__img border-radius-20' src="https://salt.tikicdn.com/cache/w100/ts/product/72/4f/38/308e496dc4a9f323d4c4b2253a15224e.jpg.webp" alt="" />
                            <p className='homeService__text mb-0 mt-2 text-center'>
                                Dép nam quai ngang
                            </p>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/" className='homeService__card'>
                            <img className='homeService__img homeCategory__img border-radius-20' src="https://salt.tikicdn.com/cache/w100/ts/product/7c/da/b3/4828a68bf4864874b3f85eee932a051e.jpg.webp" alt="" />
                            <p className='homeService__text mb-0 mt-2 text-center'>
                                Bình giữ nhiệt
                            </p>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/" className='homeService__card'>
                            <img className='homeService__img homeCategory__img border-radius-20' src="https://salt.tikicdn.com/cache/w100/ts/product/e6/2b/0f/23d7ae3e934e88827a7904782e90c0e8.jpg.webp" alt="" />
                            <p className='homeService__text mb-0 mt-2 text-center'>
                                Áo sơ mi nam tay dài trơn
                            </p>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/" className='homeService__card'>
                            <img className='homeService__img homeCategory__img border-radius-20' src="https://salt.tikicdn.com/cache/w100/ts/product/5b/d8/75/568aa8f29b02ac59581db0a26deac8ab.jpg.webp" alt="" />
                            <p className='homeService__text mb-0 mt-2 text-center'>
                                Áo thun nam
                            </p>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/" className='homeService__card'>
                            <img className='homeService__img homeCategory__img border-radius-20' src="https://salt.tikicdn.com/cache/w100/ts/product/87/6b/f7/be592a2f87a4a5268fff8260957d15d4.png.webp" alt="" />
                            <p className='homeService__text mb-0 mt-2 text-center'>
                                Áo thun nam dài tay
                            </p>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/" className='homeService__card'>
                            <img className='homeService__img homeCategory__img border-radius-20' src="https://salt.tikicdn.com/cache/w100/ts/product/19/53/4b/d18667b208d3f387fd5d7b482f15904c.jpg.webp" alt="" />
                            <p className='homeService__text mb-0 mt-2 text-center'>
                                Quần thun nam ngắn
                            </p>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/" className='homeService__card'>
                            <img className='homeService__img homeCategory__img border-radius-20' src="https://salt.tikicdn.com/cache/w100/ts/product/04/c0/c0/c3857442f895570f80d2750dcc993eca.jpg.webp" alt="" />
                            <p className='homeService__text mb-0 mt-2 text-center'>
                                Sách tham khảo cấp III
                            </p>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/" className='homeService__card'>
                            <img className='homeService__img homeCategory__img border-radius-20' src="https://salt.tikicdn.com/cache/w100/ts/product/7e/79/2b/544033d6d781291bd51a87f1f328ad37.jpg.webp" alt="" />
                            <p className='homeService__text mb-0 mt-2 text-center'>
                                Ghế trẻ em
                            </p>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/" className='homeService__card'>
                            <img className='homeService__img homeCategory__img border-radius-20' src="https://salt.tikicdn.com/cache/w100/ts/product/5b/d8/75/568aa8f29b02ac59581db0a26deac8ab.jpg.webp" alt="" />
                            <p className='homeService__text mb-0 mt-2 text-center'>
                                Áo thun nam ngắn tay không cổ
                            </p>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/" className='homeService__card'>
                            <img className='homeService__img homeCategory__img border-radius-20' src="https://salt.tikicdn.com/cache/w100/ts/product/19/53/4b/d18667b208d3f387fd5d7b482f15904c.jpg.webp" alt="" />
                            <p className='homeService__text mb-0 mt-2 text-center'>
                                Quần thun nam ngắn
                            </p>
                        </Link>
                    </SwiperSlide>
                </Swiper>
            </article>
        </div>
    );
}

export default HomeCategory;