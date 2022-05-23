import { BsChat } from "react-icons/bs";
import { useNavigate } from "react-router";
import FooterClient from "../../../../layout/client/FooterClient";
import HeaderClient from "../../../../layout/client/HeaderClient";
import HeaderMobileTitle from "../../../../layout/client/HeaderMobileTitle";
import Address from "../../../../shared/components/Address";
import Coupon from "../../../../shared/components/Coupon";
import CartTable from "./CartTable";

function Cart() {
    const navigate = useNavigate()

    return (
        <>
            <div className="d-xl-block d-none">
                <HeaderClient />
            </div>
            <div className="d-xl-none d-block">
                <HeaderMobileTitle title="Giỏ Hàng" />
            </div>
            <article className="cart bg-outside-client pt-xl-3 pt-0 pb-3">
                <div className="container-client none">
                    <h5 className="cart__title mt-2 mb-4 text-uppercase d-xl-block d-none">Giỏ hàng</h5>

                    <div className="d-xl-none d-block mb-2">
                        <Address />
                    </div>

                    <div className="row g-xl-3 g-0">
                        <div className="col-xl-9">
                            <CartTable />
                        </div>
                        <div className="col">
                            <div className="d-xl-block d-none">
                                <Address />
                            </div>
                            <div className="mt-3 d-xl-block d-none">
                                <Coupon />
                            </div>
                            <div className="bg-white mt-3 border-radius-4">
                                <div className="d-flex justify-content-between align-items-center border-b-f7 p-3">
                                    <span className="cart__total-title mb-0">Tạm tính</span>
                                    <span className="cart__total-price-temp">189.000đ</span>
                                </div>
                                <div className="p-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className="cart__total-title mb-0">Tổng tiền</span>
                                        <span className="cart__total-price-current">189.000đ</span>
                                    </div>
                                    <span className="cart__total-price-sub">
                                        (Đã bao gồm VAT nếu có)
                                    </span>
                                </div>
                            </div>
                            <button onClick={() => navigate("/checkout/payment")} className="cart__btn mt-3 px-3 py-2 d-xl-block d-none">
                                Mua Hàng
                            </button>
                        </div>
                    </div>
                </div>
            </article>

            <div className="navClient cart__nav d-xl-none d-block">
                <div className="">
                    <Coupon/>
                </div>
                <div className="row g-0 w-100 h-100 justify-content-between p-3">
                    <div className="col-auto h-100 me-2 d-flex flex-column justify-content-start">
                        <span className="cart__nav-total-title mb-0">Tổng tiền</span>
                        <span className="cart__nav-total-price">189.000đ</span>
                    </div>
                    <div className="col-auto">
                        <button onClick={() => navigate("/checkout/payment")} className="productDetail__info-content-buy flex-grow-1 h-100 px-4">
                            Mua Hàng (1)
                        </button>
                    </div>

                </div>
            </div>

            <div className="d-xl-block d-none">
                <FooterClient />
            </div>
        </>
    );
}

export default Cart;