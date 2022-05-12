import { useState } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Rating from "../Rating";

const image = [
    "https://salt.tikicdn.com/cache/100x100/ts/product/96/09/5a/2fec33bc62c2a56c060b7f83dfc633c5.jpg.webp",
    "https://salt.tikicdn.com/cache/100x100/ts/product/76/40/99/3e0f366602bcc73f5c7e49cd878fe510.jpg.webp",
    "https://salt.tikicdn.com/cache/100x100/ts/product/98/ef/09/395fe7e81e5eb683cc828cfe5dbe2609.jpg.webp",
    "https://salt.tikicdn.com/cache/100x100/ts/product/6c/a1/ef/b276cae2cce7f5894fdf68e8a59b070e.jpg.webp"
]

function ProductItem() {

    const [imgCurrent, setimgCurrent] = useState("https://salt.tikicdn.com/cache/100x100/ts/product/96/09/5a/2fec33bc62c2a56c060b7f83dfc633c5.jpg.webp")

    return (
        <Link to = "/" className="card productSale p-xl-3 p-1">
            <img className="productSale__img" src={imgCurrent} alt="" />
            <div className="card-body productSale__body mt-xl-1 mt-0 p-xl-0 p-2">
                <Swiper
                    modules={[Navigation]}
                    navigation
                    className="productSale__swiper d-xl-block d-none"
                    breakpoints={{
                        0: {
                            slidesPerView: 2,
                            spaceBetween: 10
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 10
                        },
                        1028: {
                            slidesPerView: 4,
                            spaceBetween: 10
                        }

                    }}
                    scrollbar={{ draggable: true }}

                >
                    {image.map(img => (
                        <SwiperSlide key={img}>
                            <img  
                                onMouseEnter={() => setimgCurrent(img)}
                                className={`productSale__img-sub cursor-pointer ${img === imgCurrent ? 'active' : ''}`} 
                                src={img} 
                                alt = "" 
                            />
                        </SwiperSlide>
                    ))}

                </Swiper>
                <h5 className="card-title productSale__title mb-1 mt-1">
                    Áo thun nam ngắn tay Polo
                </h5>
                <div className="d-flex align-items-center mb-1">
                    <Rating distance={1} size={12} color="#FDDA40" stars={4} />
                    <div className="productSale__border-distance"></div>
                    <p className="productSale__sold mb-0">Đã bán 40</p>
                </div>
                <div className="d-flex align-items-center">
                    <p className="productSale__price-current mb-0">189.000 ₫</p>
                    <span className="productSale__discount">50%</span>
                </div>
            </div>
        </Link>
    );
}

export default ProductItem;