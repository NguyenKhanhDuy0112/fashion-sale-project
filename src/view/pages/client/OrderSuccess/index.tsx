import { Link } from "react-router-dom";
import FooterClient from "../../../../layout/client/FooterClient";
import HeaderAddress from "../../../../layout/client/HeaderAddress";

function OrderSuccess() {
    return (
        <>
            <HeaderAddress noneProgress={true} />
            <section className="orderSucess bg-outside-client">
                <div className="container-client">
                    <div className="row justify-content-center">
                        <div className="col-11">
                            <div className="row py-4 g-3">
                                <div className="col-8">
                                    <div className="orderSuccess__notify p-5">
                                        <div className="d-flex">
                                            <div className="orderSuccess__img me-3">
                                                <img src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/tiki-mascot-congrat.svg" alt="" />
                                            </div>
                                            <div className="orderSuccess__background"></div>
                                            <div className="orderSuccess__content">
                                                <div className="orderSuccess__content-header mb-4">
                                                    <h1 className="orderSuccess__content-header-title">
                                                        Yay, đặt hàng thành công
                                                    </h1>
                                                    <h3 className="orderSuccess__content-header-title-sub">
                                                        Chuẩn bị tiền mặt 149.000 ₫
                                                    </h3>
                                                </div>
                                                <div className="orderSuccess__content-summary">
                                                    <div className="py-2 orderSuccess__content-summary-item border-b-f7 d-flex justify-content-between align-items-center">
                                                        <span className="orderSuccess__content-summary-item-label">
                                                            Phương thức thanh toán
                                                        </span>
                                                        <span className="orderSuccess__content-summary-item-value">
                                                            Thanh toán tiền mặt
                                                        </span>
                                                    </div>
                                                    <div className="py-2 orderSuccess__content-summary-item d-flex justify-content-between align-items-center">
                                                        <span className="orderSuccess__content-summary-item-label">
                                                            Tổng cộng
                                                        </span>
                                                        <span className="orderSuccess__content-summary-item-value orderSuccess__content-summary-item-value--large">
                                                            194.000 ₫
                                                        </span>
                                                    </div>
                                                    <div className="d-flex justify-content-end orderSuccess__content-summary-vat">
                                                        (Đã bao gồm VAT nếu có)
                                                    </div>
                                                    <button className="orderSuccess__btn-back mt-2">
                                                        Quay về trang chủ
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="col">
                                    <div className="orderSuccess__bill">
                                        <div className="orderSuccess__bill-main">
                                            <div className="orderSuccess__bill-header p-3 d-flex justify-content-between align-items-center">
                                                <p className="mb-0 orderSuccess__bill-header-code">
                                                    Mã đơn hàng
                                                </p>
                                                <Link to="" className="orderSuccess__bill-header-view">
                                                    Xem đơn hàng
                                                </Link>
                                            </div>
                                            <div className="orderSuccess__bill-body p-3">
                                                <p className="mb-0 orderSuccess__bill-body-date">
                                                    Giao vào chủ nhật, 19/6
                                                </p>
                                                <div className="orderSuccess__bill-body-product">
                                                    <div>
                                                        <div
                                                            style={{ backgroundImage: `url(https://salt.tikicdn.com/cache/96x96/ts/product/60/b4/94/a3fca7cad00bb5443a5d6a5de2b0b448.jpg.webp)` }}
                                                            className="orderSuccess__bill-body-product-img"
                                                        >

                                                        </div>
                                                    </div>
                                                    <p className="orderSuccess__bill-body-product-name mb-0 ms-2">
                                                        Áo thun POLO nam TOVER phối Nâu vải cá sấu Cotton xuất xịn , chuẩn form , trẻ trung - HAPPYHOW - NÂU,M
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="orderSuccess__bill-body-download p-3 mt-3">
                                            <p className="mb-3 orderSuccess__bill-body-download-title text-center">
                                                Mua sắm tiết kiệm hơn trên ứng dụng Tiki!
                                            </p>
                                            <div className="orderSuccess__bill-body-download-app d-flex justify-content-center align-items-center">
                                                <img className="me-1" src="https://salt.tikicdn.com/ts/upload/49/a6/6a/48e5b9307942215d3754a0162e8694f1.png" alt="" />
                                                <img className="ms-1" src="https://salt.tikicdn.com/ts/upload/c1/a2/b9/6f367d22657f94dcca9d798274687b42.png" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="d-xl-block d-none">
                <FooterClient />
            </div>
        </>
    );
}

export default OrderSuccess;