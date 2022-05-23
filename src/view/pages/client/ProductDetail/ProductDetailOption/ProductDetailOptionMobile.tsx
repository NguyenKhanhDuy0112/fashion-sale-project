import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import images from "../../../../../shared/assets";
import ModalCustom from "../../../../../shared/components/ModalCustom";

function ProductDetailOptionMobile() {
    const [show, setShow] = useState(false)
    return (
        <article className="d-xl-none d-block">
            <div onClick={() => setShow(!show)} className="productDetail__info-option-mobile d-flex align-items-center justify-content-between p-2">
                <div className="d-flex align-items-center">
                    <div className="productDetail__info-option-mobile-img">
                        <div
                            className="productDetail__info-option-mobile-bg"
                            style={{ backgroundImage: `url(https://salt.tikicdn.com/cache/w400/ts/product/52/e2/51/589567fae9aba385e3e960f83ac976a0.jpg)` }}>
                        </div>
                    </div>
                    <div className="productDetail__info-option-mobile-content d-flex flex-column ms-2">
                        <span className="productDetail__info-option-mobile-content-title mb-0">
                            Màu sắc, Kích cỡ
                        </span>
                        <span className="productDetail__info-option-mobile-content-text mb-0">
                            Đỏ / M
                        </span>
                    </div>
                </div>
                <span>
                    <IoIosArrowForward size={23} color="#919191" />
                </span>
            </div>

            <ModalCustom show={show} onHandleShow={() => setShow(!show)} position="full">
                <div className="modalCustom__header px-2">
                    <span onClick={() => setShow(false)} className="modalCustom__header-icon p-1">
                        <IoCloseSharp size={30} color="#fff" />
                    </span>
                    <h5 className="modalCustom__header-title">Lựa chọn thuộc tính</h5>
                </div>
                <div className="modalCustom__body mt-5 py-4">
                    <div className="productDetail__info-option-mobile-card d-flex px-3 pb-3 border-b-f7">
                        <div
                            className="productDetail__info-option-mobile-card-img"
                            style={{ backgroundImage: `url(https://salt.tikicdn.com/cache/w208/ts/product/52/e2/51/589567fae9aba385e3e960f83ac976a0.jpg)` }}
                        ></div>
                        <div className="productDetail__info-option-mobile-card-content ms-2">
                            <h5 className="productDetail__info-option-mobile-card-title mb-1">
                                Áo Thun Nam Có Cổ 5S (3 màu) Tay Ngắn, Chất Liệu Thun Cotton Premium Co Giãn, Thấm Hút Mồ Hôi (APC21004)
                            </h5>
                            <div className="d-flex align-items-center">
                                <span className="productDetail__info-option-mobile-content-title">Màu sắc, Kích cỡ: </span>
                                <span className="productDetail__info-option-mobile-content-text ms-2">Đỏ / L</span>
                            </div>
                            <div className="d-flex align-items-center">
                                <span className="productDetail__info-option-mobile-content-title">Cung cấp bởi:</span>
                                <span className="productDetail__info-option-mobile-content-text ms-2">5S Fashion</span>
                            </div>
                            <h2 className="mb-0">189.000 đ</h2>
                        </div>
                    </div>
                    <div className="p-3">
                        <div className="productDetail__info-option-color mb-3">
                            <p className="productDetail__info-option-color-title mb-2">
                                Màu sắc: <strong>Đỏ</strong>
                            </p>
                            <div className="row g-2 w-100">
                                <div className="col-xl-3 col-md-4 col-6">
                                    <div className="productDetail__info-option-color-item active">
                                        <img className="productDetail__info-option-color-item-img" alt="" src="https://salt.tikicdn.com/cache/100x100/ts/product/9f/e5/76/fe337ab46798e29b337c0e224512a7e4.png.webp" />
                                        <span className="productDetail__info-option-color-item-text">
                                            Cam Đất
                                        </span>
                                        <span className="productDetail__info-option-color-item-icon">
                                            <images.CheckItem />
                                        </span>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-md-4 col-6">
                                    <div className="productDetail__info-option-color-item">
                                        <img className="productDetail__info-option-color-item-img" alt="" src="https://salt.tikicdn.com/cache/100x100/ts/product/0c/e9/03/d6b32052e71a0d3928ce278400163e8d.png.webp" />
                                        <span className="productDetail__info-option-color-item-text">
                                            Trắng
                                        </span>
                                        <span className="productDetail__info-option-color-item-icon">
                                            <images.CheckItem />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="productDetail__info-option-color mb-3">
                            <p className="productDetail__info-option-color-title mb-2">
                                Kích cỡ: <strong>XXL</strong>
                            </p>
                            <div className="row g-2">
                                <div className="col-xl-2 col-3">
                                    <div className="productDetail__info-option-color-item active justify-content-center px-2 py-1">
                                        <span className="productDetail__info-option-color-item-text text-center">
                                            L
                                        </span>
                                        <span className="productDetail__info-option-color-item-icon">
                                            <images.CheckItem />
                                        </span>
                                    </div>
                                </div>
                                <div className="col-xl-2 col-3">
                                    <div className="productDetail__info-option-color-item productDetail__info-option-size-item justify-content-center px-2 py-1">
                                        <span className="productDetail__info-option-color-item-text text-center">
                                            M
                                        </span>
                                        <span className="productDetail__info-option-color-item-icon productDetail__info-option-size-item-icon">
                                            <images.CheckItem />
                                        </span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="modalCustom__footer p-3">
                    <button className="productDetail__info-content-buy py-2">
                        Xong
                    </button>
                </div>
            </ModalCustom>
        </article>
    );
}

export default ProductDetailOptionMobile;