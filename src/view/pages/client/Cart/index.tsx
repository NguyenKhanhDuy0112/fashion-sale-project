import { useMemo, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import FooterClient from "../../../../layout/client/FooterClient";
import HeaderClient from "../../../../layout/client/HeaderClient";
import HeaderMobileTitle from "../../../../layout/client/HeaderMobileTitle";
import Address from "../../../../shared/components/Address";
import Coupon from "../../../../shared/components/Coupon";
import ModalCustom from "../../../../shared/components/ModalCustom";
import { formatCashVND } from "../../../../shared/helpers";
import useCart from "../../../../shared/hooks/useCart";
import useCurrentUser from "../../../../shared/hooks/useCurrentUser";
import { ProductCart } from "../../../../shared/interfaces";
import CartTable from "./CartTable";

function Cart() {
    const navigate = useNavigate()
    const currentUser = useCurrentUser()
    const cart = useCart()
    const [showModal, setShowModal] = useState<boolean>(false)

    const handleSell = () => {
        if (currentUser.address === '') {
            navigate('/checkout/shipping')
            return
        }
        if (cart.productsChecking.length === 0) {
            setShowModal(!showModal)
            return
        }
        navigate("/checkout/payment")
    }

    const handleCalcMoney = useMemo(() => {
        const total = cart.productsChecking.reduce((prev: number, cur: ProductCart) => prev + (cur.quantity * ((cur.product && cur.product.price) ? (cur.product.price - (cur.product.price * (cur.product.discount ? cur.product.discount / 100 : 0))) : 0)), 0)
        return total
    }, [cart.productsChecking])

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

                    {cart.products.length > 0 ?
                        <div className="d-xl-none d-block mb-2">
                            <Address />
                        </div> :
                        ''
                    }
                    {
                        cart.products.length === 0
                        &&
                        <div className="bg-white border-radius-4 cart__empty p-4 mb-4">
                            <div className="d-flex flex-column justify-content-center align-items-center">
                                <img src="https://salt.tikicdn.com/desktop/img/mascot@2x.png" style={{ width: "190px" }} alt="" />
                                <small className="my-3">Không có sản phẩm nào trong giỏ hàng</small>
                                <Link to="/" className="cart__btn-continue">Tiếp tục mua sắm</Link>
                            </div>
                        </div>
                    }

                    {cart.products.length > 0 ?
                        <div className="row g-xl-3 g-0">
                            <div className="col-xl-9">
                                <CartTable />
                            </div>
                            <div className="col">
                                <div className="cart__sidebar">
                                    <div className="d-xl-block d-none">
                                        <Address />
                                    </div>
                                    <div className="mt-3 d-xl-block d-none">
                                        <Coupon />
                                    </div>
                                    <div className="bg-white mt-3 border-radius-4">
                                        <div className="d-flex justify-content-between align-items-center border-b-f7 p-3">
                                            <span className="cart__total-title mb-0">Tạm tính</span>
                                            <span className="cart__total-price-temp">{formatCashVND(handleCalcMoney + "", ".")} đ</span>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center border-b-f7 p-3">
                                            <span className="cart__total-title mb-0">Giảm giá</span>
                                            <span className="cart__total-price-temp">0đ</span>
                                        </div>
                                        <div className="p-3">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span className="cart__total-title mb-0">Tổng tiền</span>
                                                <span className="cart__total-price-current">{formatCashVND(handleCalcMoney + "", ".")} đ</span>
                                            </div>
                                            <span className="cart__total-price-sub">
                                                (Đã bao gồm VAT nếu có)
                                            </span>
                                        </div>
                                    </div>
                                    <button onClick={handleSell} className="cart__btn mt-3 px-3 py-2 d-xl-block d-none">
                                        Mua Hàng ({cart.productsChecking.length})
                                    </button>
                                </div>
                            </div>
                        </div> :
                        ''
                    }
                </div>
            </article>

            {cart.products.length > 0 ?
                <div className="navClient cart__nav d-xl-none d-block">
                    <div className="">
                        <Coupon />
                    </div>
                    <div className="row g-0 w-100 h-100 justify-content-between p-3">
                        <div className="col-auto h-100 me-2 d-flex flex-column justify-content-start">
                            <span className="cart__nav-total-title mb-0">Tổng tiền</span>
                            <span className="cart__nav-total-price">189.000đ</span>
                        </div>
                        <div className="col-auto">
                            <button onClick={() => navigate("/checkout/payment")} className="productDetail__info-content-buy flex-grow-1 h-100 px-4">
                                Mua Hàng ({cart.productsChecking.length})
                            </button>
                        </div>

                    </div>
                </div> :
                ''
            }

            <div className="d-xl-block d-none">
                <FooterClient />
            </div>

            <ModalCustom zIndexOverlay={50} className="modalCustom__delete p-3" show={showModal} onHandleShow={() => setShowModal(!showModal)} position="center" >
                <div className="d-flex">
                    <span className="modalCustom__delete-icon me-2">
                        <AiOutlineInfoCircle size = {18} color = "#1A94FF"/>
                    </span>
                    <div className="mb-3">
                        <span className="modalCustom__delete-title">
                            Bạn vẫn chưa chọn sản phẩm nào <br/> để mua
                        </span>
                    </div>
                </div>

                <div className="d-flex justify-content-end align-items-center">
                    <button onClick={() => setShowModal(!showModal)} className="modalCustom__delete-btn ms-1 modalCustom__delete-btn-close">
                        Ok, đã hiểu
                    </button>
                </div>
            </ModalCustom>
        </>
    );
}

export default Cart;