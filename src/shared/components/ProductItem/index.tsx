import { useState } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Rating from "../Rating";

interface Props {
    hideImageSub?: boolean,
}

const image = [
    "https://salt.tikicdn.com/cache/400x400/ts/product/0e/dd/71/3f47941e097f814c16cdeafd37300f2c.jpg.webp",
    "https://salt.tikicdn.com/cache/100x100/ts/product/7a/80/7e/299783cc085da51ad65ed7b542151e52.jpg.webp",
    "https://salt.tikicdn.com/cache/100x100/ts/product/a5/47/05/5ad82d5bc1a8c3feb94a937603d08dca.jpg.webp",
    "https://salt.tikicdn.com/cache/100x100/ts/review/c3/5b/c1/0786b8c7971d48563f2dbc0098a0a340.jpg.webp"
]

function ProductItem(props: Props) {
    const { hideImageSub } = props

    const [imgCurrent, setimgCurrent] = useState("https://salt.tikicdn.com/cache/400x400/ts/product/0e/dd/71/3f47941e097f814c16cdeafd37300f2c.jpg.webp")

    return (
        <Link to="/products/ao-thun-nam" className="card productSale p-xl-3 p-1">
            <img className="productSale__img" src={imgCurrent} alt="" />
            <div className="card-body productSale__body mt-xl-1 mt-0 p-xl-0 p-2">
                {!hideImageSub && <div className="d-xl-block d-none">
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
                                    alt=""
                                />
                            </SwiperSlide>
                        ))}

                    </Swiper>
                </div>
                }
                <h5 className="card-title productSale__title mt-1">
                    Áo thun nam ngắn tay Polo
                </h5>
                <div className="d-flex align-items-center">
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