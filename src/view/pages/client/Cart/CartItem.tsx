import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import InputQuantity from "../../../../shared/components/InputQuantity";

function CartItem() {
    const [quantity, setQuantity] = useState(1)
    return (
        <article className="cart__item">
            <div className="row align-items-center">
                <div className="col-xl-5 col">
                    <div className="d-flex align-items-center">
                        <label className="cart__cartHead-checkbox d-flex align-items-center">
                            <input type="checkbox" className="cart__cartHead-checkbox-input" />
                            <span className="cart__cartHead-checkbox-fake"></span>
                        </label>
                        <div className="cart__item-card row align-items-xl-center align-items-start g-2">
                            <div className="col-auto">
                                <div
                                    className="cart__item-card-img"
                                    style={{ backgroundImage: `url(https://salt.tikicdn.com/cache/w78/ts/product/3c/8c/b0/06606d938d752d0bebf4bd9d6d13dd6c.jpg.webp)` }}>
                                </div>
                            </div>
                            <div className="col">
                                <Link to="" className="cart__item-card-title">
                                    Áo Polo Nam Họa Tiết COMAX 5S (5 Màu), Sợi Vải Dệt Mắt Chim Thoáng Mát, Thiết Kế Chuẩn Phom, Trẻ Trung - APC22301TRT  - L
                                </Link>
                                <div className="cart__item-card-price d-xl-none d-flex my-2 align-items-center">
                                    <span className="cart__item-card-price-current">135.000 ₫</span>
                                    <span className="cart__item-card-price-old ms-1">239.000 ₫</span>
                                </div>
                                <div className="cart__item-quantity d-xl-none d-block">
                                    <InputQuantity
                                        value={quantity}
                                        max={100}
                                        onQuantity={(value) => setQuantity(value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col d-xl-block d-none">
                    <div className="cart__item-card-price d-flex align-items-center">
                        <span className="cart__item-card-price-current">135.000 ₫</span>
                        <span className="cart__item-card-price-old ms-1">239.000 ₫</span>
                    </div>
                </div>
                <div className="col d-xl-block d-none">
                    <InputQuantity
                        value={quantity}
                        max={100}
                        onQuantity={(value) => setQuantity(value)}
                    />
                </div>
                <div className="col d-xl-block d-none">
                    <span className="cart__item-card-price-total">139.000 ₫</span>
                </div>
                <div className="col-auto">
                    <span className="cart__cartHead-title cursor-pointer">
                        <FiTrash2 color="#787878" size={18} />
                    </span>
                </div>
            </div>
        </article>
    );
}

export default CartItem;