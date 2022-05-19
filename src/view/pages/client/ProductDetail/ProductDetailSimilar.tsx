import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import ProductItem from '../../../../shared/components/ProductItem';

function ProductDetailSimilar() {
    return (
        <article className="productDetailSimilar mt-3">
            <div className='container-client'>
                <div className='bg-white p-3 border-radius-4'>
                    <h4 className='productDetail__title'>Sản phẩm tương tự</h4>
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
                        {Array.from({ length: 30 }).map((item, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <ProductItem hideImageSub={true} />
                                </SwiperSlide>
                            )
                        })}

                    </Swiper>
                </div>
            </div>
        </article>
    );
}

export default ProductDetailSimilar;