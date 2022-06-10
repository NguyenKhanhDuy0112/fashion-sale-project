import { useEffect, useState } from 'react';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import categoriesService from '../../../../services/categoriesService';
import ProductItem from '../../../../shared/components/ProductItem';
import { Product } from '../../../../shared/interfaces';

interface ProductDetailSimilarProps {
    category?: string,
}

function ProductDetailSimilar(props: ProductDetailSimilarProps) {
    const { category } = props
    const [products, setProduct] = useState<Product[]>()

    useEffect(() => {
        handleLoadProductsByCategoryId()
    },[])

    const handleLoadProductsByCategoryId = async () => {
        try {
            const findCategory = await categoriesService.findById(category ? category : '')
            setProduct(findCategory.products)
        } catch (err) {
            console.log("Load product failed!")
        }

    }

    console.log("Product simalr: ", products)

    return (
        <article className="productDetailSimilar mt-xl-3 mt-2">
            <div className='container-client none'>
                <div className='bg-white p-3 border-radius-4'>
                    <h4 className='productDetail__title'>Sản phẩm tương tự</h4>
                    <Swiper
                        modules={[Navigation]}
                        navigation
                        className="homeDealHot__swiper ps-xl-0 ps-1"
                        breakpoints={{
                            0: {
                                slidesPerView: 2.23,
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