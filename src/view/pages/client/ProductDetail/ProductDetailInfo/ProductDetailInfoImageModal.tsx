import { MdOutlineClose } from 'react-icons/md';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide, } from 'swiper/react';

interface Props {
    show: boolean,
    onClose: () => void,
    images: string[]
}

function ProductDetailInfoImageModal(props: Props) {
    const { show, onClose, images } = props
    return (
        <div className={`productDetail__info-image-modal p-xl-3 p-0 ${show ? 'active' : ''}`}>
            <div 
                className='productDetail__info-image-modal-close d-flex flex-column justify-content-center' 
                onClick={onClose}
            >
                <span className='productDetail__info-image-modal-close-icon'>
                    <MdOutlineClose size={35}/>
                </span>
                <span className='productDetail__info-image-modal-close-text d-xl-block d-none'>
                    Đóng
                </span>
            </div>
            <div className='px-xl-5 p-0 d-flex justify-content-center align-items-start h-100'>
                <Swiper
                    // install Swiper modules
                    modules={[Navigation, Pagination]}
                    spaceBetween={0}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                    className="h-100 productDetail__info-image-modal-swiper"

                >
                    {images.map((img: string, index: number) => (
                        <SwiperSlide key={index} className='w-100 h-100 productDetail__info-image-modal-swiper-slide'>
                            <img className='w-100 h-100' style={{objectFit: "cover"}} src={img} alt="" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

export default ProductDetailInfoImageModal;