import images from "../../../../shared/assets";

function ProductDetailOption() {
    return (
        <article className="productDetail__info-option w-100">
            <div className="productDetail__info-option-color mb-3">
                <p className="productDetail__info-option-color-title mb-2">
                    Màu sắc: <strong>Đỏ</strong>
                </p>
                <div className="row g-3 w-100">
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
                <div className="row g-3">
                    <div className="col-xl-2 col-md-4 col-6">
                        <div className="productDetail__info-option-color-item active justify-content-center px-2 py-1">
                            <span className="productDetail__info-option-color-item-text text-center">
                                L
                            </span>
                            <span className="productDetail__info-option-color-item-icon">
                                <images.CheckItem />
                            </span>
                        </div>
                    </div>
                    <div className="col-xl-2 col-md-4 col-6">
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
        </article>
    );
}

export default ProductDetailOption;