import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import FooterClient from "../../../../layout/client/FooterClient";
import HeaderMobileTitle from "../../../../layout/client/HeaderMobileTitle";
import HeaderPayment from "../../../../layout/client/HeaderPayment"
import { deleteProductsByChecking } from "../../../../modules/cart/cartSlice";
import { hideLoading, showLoading } from "../../../../modules/loading/loadingSlice";
import { showToast } from "../../../../modules/toast/toastSlice";
import billDetailsService from "../../../../services/billDetailsService";
import billsService from "../../../../services/billsService";
import Address from "../../../../shared/components/Address";
import Coupon from "../../../../shared/components/Coupon";
import { formatCashVND } from "../../../../shared/helpers";
import useCart from "../../../../shared/hooks/useCart";
import useCurrentUser from "../../../../shared/hooks/useCurrentUser";
import { ProductCart } from "../../../../shared/interfaces";
import PaymentOption from "./PaymentOption";
import PaymentPackage from "./PaymentPackage";

function Payment() {
    const cart = useCart()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const currentUser = useCurrentUser()

    const handleCalcMoney = useMemo(() => {
        const total = cart.productsChecking.reduce((prev: number, cur: ProductCart) =>
            prev + (cur.quantity * ((cur.product && cur.product.price) ? (cur.product.price - (cur.product.price * (cur.product.discount ? cur.product.discount / 100 : 0))) : 0)), 0
        )
        return total
    }, [cart.productsChecking])


    const handleOrder = async () => {
        dispatch(showLoading())
        try {
            const bill = await billsService.add(
                {
                    feeShip: 20000,
                    status: 1,
                    shippedDate: new Date().setDate(new Date().getDate() + 3),
                    user: currentUser._id !== '' ? currentUser._id : ''
                }
            )
            const productsChecking = await cart.productsChecking


            if (bill) {
                const lengthChecking = await cart.productsChecking.length

                await productsChecking.forEach(async (pro, index: number) => {
                    console.log("Bill Detail: ", {
                        bill: bill._id,
                        quantity: pro.quantity,
                        productDetail: pro._id
                    })
                    await billDetailsService.add(
                        {
                            bill: bill._id,
                            quantity: pro.quantity,
                            productDetail: pro._id
                        }
                    )
                    
                    console.log("Length: ", lengthChecking)

                    if (index === await lengthChecking - 1) {
                        console.log("Index: ", index)
                        console.log("Length: ", lengthChecking - 1)
                        await dispatch(hideLoading())
                        await navigate(`/checkout/payment/success?orderId=${bill._id}`)
                        await dispatch(deleteProductsByChecking({ key: currentUser._id ? currentUser._id : '' }))
                    }
                })

            }
        }
        catch (err) {
            dispatch(hideLoading())
            dispatch(showToast({ show: true, text: '?????t h??ng th???t b???i', type: 'error', delay: 1500 }))
        }
    }



    return (
        <>
            <div className="d-xl-block d-none">
                <HeaderPayment />
            </div>
            <div className="d-xl-none d-block">
                <HeaderMobileTitle title="Thanh To??n" />
            </div>
            <article className="payment bg-outside-client py-xl-4 pb-xl-4 pb-5">
                <div className="container-client none">
                    <div className="row g-xl-3 g-0">
                        <div className="col-xl-9">
                            <div className="border-radius-4 payment__option bg-white p-3">
                                <div className="row mb-5">
                                    <div className="col-xl-6 col-12">
                                        <p className="payment__option-title mb-3">
                                            Ch???n h??nh th???c giao h??ng
                                        </p>
                                        <div className="d-flex align-items-center w-100">
                                            <div className="payment__option-choose w-100">
                                                <label className="payment__radio">
                                                    <input checked={true} type="radio" className="payment__radio-input" />
                                                    <span className="payment__radio-fake"></span>
                                                    <span className="payment__radio-label d-flex align-items-center">
                                                        <img className="payment__option-img mx-2" src="https://salt.tikicdn.com/ts/upload/2a/47/46/0e038f5927f3af308b4500e5b243bcf6.png" alt="" />
                                                        <p className="payment__option-text mb-0">Giao Ti???t Ki???m</p>
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <PaymentPackage />
                            </div>

                            <PaymentOption />
                        </div>
                        <div className="col">
                            <div className="d-xl-block d-none">
                                <Address />
                            </div>
                            <div className="mt-3 d-xl-block d-none">
                                <Coupon />
                            </div>
                            <div className="bg-white payment__total-content mt-3 border-radius-4">
                                <div className="d-flex justify-content-between align-items-center px-3 py-xl-1 py-2">
                                    <span className="payment__total payment__total-title mb-0">T???m t??nh</span>
                                    <span className="cart__total-price-temp">{formatCashVND(handleCalcMoney + "", ".")}??</span>
                                </div>
                                <div className="d-flex justify-content-between border-b-f7 align-items-center px-3 py-1">
                                    <span className="payment__total payment__total-title mb-0">Ph?? v???n chuy???n</span>
                                    <span className="cart__total-price-temp">20.000??</span>
                                </div>
                                <div className="p-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className="payment__total payment__total-calc mb-0">T???ng ti???n</span>
                                        <span className="cart__total-price-temp d-xl-none d-block">{formatCashVND((handleCalcMoney + 20000) + "", ".")}??</span>
                                        <span className="cart__total-price-current d-xl-block d-none">{formatCashVND((handleCalcMoney + 20000) + "", ".")} ??</span>
                                    </div>
                                    <span className="cart__total-price-sub d-xl-block d-none">
                                        (???? bao g???m VAT n???u c??)
                                    </span>
                                </div>
                            </div>
                            <button onClick={handleOrder} className="cart__btn mt-3 px-3 py-2 d-xl-block d-none">
                                ?????t H??ng
                            </button>
                        </div>
                    </div>
                </div>
            </article>

            <div className="navClient cart__nav d-xl-none d-block">
                <div className="">
                    <Coupon />
                </div>
                <div className="row g-0 w-100 h-100 justify-content-between p-3">
                    <div className="col-auto h-100 me-2 d-flex flex-column justify-content-start">
                        <span className="cart__nav-total-title mb-0">T???ng ti???n</span>
                        <span className="cart__nav-total-price">{formatCashVND((handleCalcMoney + 20000) + "", ".")}??</span>
                    </div>
                    <div className="col-auto">
                        <button className="productDetail__info-content-buy flex-grow-1 h-100 px-4">
                            ?????t H??ng
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

export default Payment;