import { useEffect, useState } from 'react';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import categoriesService from '../../../../services/categoriesService';
import ProductItem from '../../../../shared/components/ProductItem';
import { Product, ProductDetail } from '../../../../shared/interfaces';

interface ProductDetailSimilarProps {
    category?: string,
    currentProductId?: string
}

function ProductDetailSimilar(props: ProductDetailSimilarProps) {
    const { category, currentProductId } = props
    const [products, setProduct] = useState<Product[]>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        handleLoadProductsByCategoryId()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentProductId])

    const handleLoadProductsByCategoryId = async () => {
        try {
            const findCategory = await categoriesService.getProductsByCategoryId(category ? category : '', 1, 15)
            const products = handleConvertProducts(findCategory.data)
            setProduct(products)
            setLoading(false)
        } catch (err) {
            console.log("Load product failed!")
            setLoading(false)
        }
    }

    const handleConvertProducts = (products: Product[]) => {
        const newProducts: Product[] = products.map((pro: Product, index: number) => {
            const proDetails: ProductDetail[] = []
            let color = ''
            if (pro.productDetails && pro.productDetails.length > 0) {
                pro.productDetails.forEach((proDt: any) => {
                    if (color.toLowerCase() !== proDt.color.color.toLowerCase()) {
                        proDetails.push({ ...proDt, color: proDt.color.color, sizes: [proDt.size.size], images: [proDt.images[0].image, ...proDt.images[0].imagesSub] })
                        color = proDt.color.color
                    }
                    else {
                        const tempProDetail = proDetails[proDetails.length - 1]
                        tempProDetail.sizes.push(proDt.size.size)
                        proDetails.splice(proDetails.length - 1, 1, tempProDetail)
                    }
                })
            }

            return { ...pro, productDetails: proDetails }
        })

        const productsFilter = newProducts.filter(pro => pro._id !== currentProductId)

        return productsFilter

    }

    return (
        <article className="productDetailSimilar mt-xl-3 mt-2">
            <div className='container-client none'>
                <div className='bg-white px-xl-3 py-xl-3 px-0 py-3 border-radius-4'>
                    <h4 className='productDetail__title px-xl-0 px-3'>Sản phẩm tương tự</h4>
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
                        {loading ?
                            Array.from({ length: 6 }).map((ite: any, index: number) => (
                                <SwiperSlide key={index}>
                                    <ProductItem
                                        loading = {loading}
                                    />
                                </SwiperSlide>
                            ))
                            :
                            products && products.length > 0 &&
                            products.map(pro => (
                                <SwiperSlide key={pro._id}>
                                    <ProductItem
                                        loading={loading}
                                        product={pro}
                                        hideImageSub={true}

                                    />
                                </SwiperSlide>
                            ))

                        }
                    </Swiper>
                </div>
            </div>
        </article>
    );
}

export default ProductDetailSimilar;