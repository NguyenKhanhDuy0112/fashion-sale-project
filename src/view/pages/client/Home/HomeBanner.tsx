import { Navigation, Pagination, Autoplay } from 'swiper';

import { Swiper, SwiperSlide, } from 'swiper/react';

function HomeBanner() {
    return (
        <div className='container-client'>
            <div className="row g-2">
                <div className='col-lg-8 col-12'>
                    <Swiper
                        // install Swiper modules
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={5}
                        loop={true}
                        slidesPerView={1}
                        navigation
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}

                        pagination={{ clickable: true }}
                        scrollbar={{ draggable: true }}
                        className="w-100 h-100 homeBanner__swiper border-radius-4"

                    >
                        <SwiperSlide className='w-100 h-100'>
                            <img className='w-100 homeBanner__swiper-img' src="https://salt.tikicdn.com/cache/w1080/ts/banner/44/e0/c7/84bc53e43612e20b6ac3dcafb02e5068.png.webp" alt="" />
                        </SwiperSlide>
                        <SwiperSlide className='w-100 h-100'>
                            <img className='w-100 homeBanner__swiper-img' src="https://salt.tikicdn.com/cache/w1080/ts/banner/21/aa/a9/c73b427339a656a8d5e7b384432f97de.png.webp" alt="" />
                        </SwiperSlide>
                        <SwiperSlide className='w-100 h-100'>
                            <img className='w-100 homeBanner__swiper-img' src="https://salt.tikicdn.com/cache/w1080/ts/banner/3f/2c/6b/2b9acccef52f1f9b984fa09e408b769e.png.webp" alt="" />
                        </SwiperSlide>
                        <SwiperSlide className='w-100 h-100'>
                            <img className='w-100 homeBanner__swiper-img' src="https://salt.tikicdn.com/cache/w1080/ts/banner/72/93/d4/bb874b47c59e7c719f56debaf6d52b7c.png.webp" alt="" />
                        </SwiperSlide>
                    </Swiper>
                </div>
                <div className='col h-100 d-xl-block d-none'>
                    <img className='w-100' src="https://salt.tikicdn.com/cache/w400/ts/banner/7d/22/49/51f288253bd7eada23331dbffee95869.png.webp" alt="" />
                </div>
            </div>
        </div>
    );
}

export default HomeBanner;