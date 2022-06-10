import { useEffect, useRef, useState } from "react";
import ProductDetailInfoImageModal from "./ProductDetailInfoImageModal";
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide, } from 'swiper/react';
import { ProductDetail, ProductDetailOrder } from "../../../../../shared/interfaces";
import Skeleton from "react-loading-skeleton";

interface Props {
    productDetails?: ProductDetailOrder[] | ProductDetail[],
    loading: boolean,
}

function ProductDetailInfoImage(props: Props) {
    const { productDetails, loading } = props
    const [productDetailsFilter, setProductDetailFilter] = useState<ProductDetailOrder[]>()
    const [images, setImages] = useState<string[]>([''])
    const [thumnail, setThumnail] = useState<string>()
    const [showModalImage, setShowModalImage] = useState(false)

    useEffect(() => {
        let color = ''
        let images: string[] = []
        const proDetailFilter: any = []
        productDetails?.forEach(pro => {
            if (color.toLowerCase() !== pro.color.toLowerCase()) {
                proDetailFilter.push(pro)
                images = [...images, ...pro.images]
                color = pro.color
            }
        })
        setImages(images)
        setProductDetailFilter(proDetailFilter)
        setThumnail(images[0])
    }, [productDetails])

    const handleShowModalImage = () => setShowModalImage(true)
    const handleCloseModalImage = () => setShowModalImage(false)


    return (
        <>
            <div className="productDetail__info-image p-xl-3 p-0 border-r-f7">
                <div className="d-xl-none d-block" onClick={handleShowModalImage}>
                    <Swiper
                        // install Swiper modules
                        modules={[Pagination]}
                        spaceBetween={0}
                        slidesPerView={1}
                        pagination={{
                            type: "fraction",
                        }}
                        scrollbar={{ draggable: true }}
                        className="h-100 productDetail__info-image-swiper"
                    >
                        {
                            loading ?

                                <Skeleton height={380} width="100%" />
                                :
                                images.map((image: any, index: number) => {
                                    return (
                                        <SwiperSlide key={index} className='w-100 h-100'>
                                            <img className='w-100 h-100' style={{ objectFit: "cover" }} src={image} alt="" />
                                        </SwiperSlide>
                                    )
                                })
                        }
                    </Swiper>
                </div>
                <div className="d-xl-block d-none">
                    {loading ?
                        <Skeleton height={500} />
                        :
                        <img
                            onClick={handleShowModalImage}
                            src={thumnail} alt=""
                            className="productDetail__info-image-thumnail w-100 cursor-pointer d-xl-block d-none"
                        />
                    }
                </div>
                <div className="row g-2 mt-1 productDetail__info-image-review d-xl-flex d-none">
                    {
                        images.map((image: any, index: number) => {
                            return index < 5 && (
                                <div key={index} className="col-2">
                                    <img
                                        onClick={() => setThumnail(image)}
                                        className={`productDetail__info-image-review-item cursor-pointer ${image === thumnail ? 'active' : ''}`}
                                        src={image}
                                        alt=""
                                    />
                                </div>
                            )
                        })
                    }
                    {images.length > 5 &&
                        <div className="col-2">
                            <div className="position-relative" onClick={handleShowModalImage}>
                                <img
                                    className={`productDetail__info-image-review-item cursor-pointer ${images[5] === thumnail ? 'active' : ''}`}
                                    src={images[5]}
                                    alt=""
                                />
                                <div
                                    className="productDetail__info-image-review-item-shadow p-2"
                                >
                                    Xem thêm {images.length - 5} hình ảnh
                                </div>
                            </div>
                        </div>
                    }

                </div>

            </div>
            <ProductDetailInfoImageModal
                images={images}
                onClose={handleCloseModalImage}
                show={showModalImage}
            />
        </>
    );
}

export default ProductDetailInfoImage;