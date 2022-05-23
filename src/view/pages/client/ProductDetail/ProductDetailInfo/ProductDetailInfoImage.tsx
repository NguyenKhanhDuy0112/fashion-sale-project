import { useState } from "react";
import ProductDetailInfoImageModal from "./ProductDetailInfoImageModal";
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide, } from 'swiper/react';

interface Props {
    images: string[]
}

function ProductDetailInfoImage(props: Props) {
    const { images } = props
    const [thumnail, setThumnail] = useState<string>(images[0])
    const [showModalImage, setShowModalImage] = useState(false)

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
                        {images.map((img: string, index: number) => (
                            <SwiperSlide key={index} className='w-100 h-100'>
                                <img className='w-100 h-100' src={img} alt="" />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <img
                    onClick={handleShowModalImage}
                    src={thumnail} alt=""
                    className="productDetail__info-image-thumnail w-100 cursor-pointer d-xl-block d-none"
                />
                <div className="row g-2 mt-1 productDetail__info-image-review d-xl-flex d-none">
                    {Array.from({ length: 6 }).map((ite, index) => {
                        return index < 5 ? (
                            <div key={index} className="col-2">
                                <img
                                    onClick={() => setThumnail(images[index])}
                                    className={`productDetail__info-image-review-item cursor-pointer ${images[index] === thumnail ? 'active' : ''}`}
                                    src={images[index]}
                                    alt=""
                                />
                            </div>
                        ) : (
                            <div key={index} className="col-2">
                                <div className="position-relative" onClick={handleShowModalImage}>
                                    <img
                                        className={`productDetail__info-image-review-item cursor-pointer ${images[index] === thumnail ? 'active' : ''}`}
                                        src={images[index]}
                                        alt=""
                                    />
                                    <div className="productDetail__info-image-review-item-shadow p-2">Xem thêm {images.length - 5} hình ảnh</div>
                                </div>
                            </div>
                        )
                    })}
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