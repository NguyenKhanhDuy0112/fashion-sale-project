import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import FooterClient from "../../../../layout/client/FooterClient";
import HeaderClient from "../../../../layout/client/HeaderClient";
import HeaderMobileTitle from "../../../../layout/client/HeaderMobileTitle";
import Account from "../Account";
import OrderDetailTable from "./OrderDetailTable";

function OrderDetail() {
    return (
        <>
            <div className="d-xl-block d-none">
                <HeaderClient />
            </div>
            <div className="d-xl-none d-block">
                <HeaderMobileTitle title="Chi tiết đơn hàng" />
            </div>
            <section className="orderDetail bg-outside-client pb-3">
                <div className="container-client none">
                    <article className="breadcrumbCustom py-2 d-xl-block d-none">
                        <ul className="breadcrumbCustom__list align-items-start">
                            <li className="breadcrumbCustom__list-item">
                                <Link to="/" className="breadcrumbCustom__list-item-link">Trang chủ</Link>
                            </li>
                            <li className="breadcrumbCustom__list-item mx-1">
                                <span className="breadcrumbCustom__list-item-link">
                                    <IoIosArrowForward />
                                </span>
                            </li>
                            <li className="breadcrumbCustom__list-item">
                                <span className="breadcrumbCustom__list-item-link">
                                    Đơn hàng của tôi
                                </span>
                            </li>
                        </ul>
                    </article>
                    <div className="row g-xl-3 g-0 mt-xl-0 mt-5 pt-xl-0 pt-3">
                        <div className="col-xl-auto d-xl-block d-none">
                            <Account />
                        </div>
                        <div className="col">
                            <h5 className="editAccount__title mb-4">Chi tiết đơn hàng #732470171-Huỷ</h5>
                            <div className="d-flex mb-3 justify-content-end">
                                <span className="orderDetail__date">
                                    Ngày đặt hàng: 18:59 21/05/2022
                                </span>
                            </div>
                            <div className="row g-xl-3 g-0 row-cols-xl-3 row-cols-1">
                                <div className="col">
                                    <p className="mb-2 orderDetail__title">Địa chỉ người nhận</p>
                                    <div className="orderDetail__info p-2 border-radius-4">
                                        <p className="mb-0 orderDetail__info-name">Nguyễn Khánh Duy</p>
                                        <p className="mb-0 orderDetail__info-title">Hóc Môn, Thành Phố Hồ Chí Minh</p>
                                        <p className="mb-0 orderDetail__info-title">0798132664</p>
                                    </div>
                                </div>
                                <div className="col">
                                    <p className="mb-2 orderDetail__title">Hình thức giao hàng</p>
                                    <div className="orderDetail__info p-2 border-radius-4">
                                        <p className="mb-0 orderDetail__info-title">Giao Tiết Kiệm</p>
                                        <p className="mb-0 orderDetail__info-title">Giao và Thứ Bảy, 28/5</p>
                                        <p className="mb-0 orderDetail__info-title">Miễn phí vận chuyển</p>
                                    </div>
                                </div>
                                <div className="col d-flex flex-column justify-content-between">
                                    <p className="mb-2 orderDetail__title">Hình thức thanh toán</p>
                                    <div className="orderDetail__info p-2 border-radius-4 h-100">
                                        <p className="mb-0 orderDetail__info-title">Thanh toán tiền mặt khi nhận hàng</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white border-radius-4 mt-xl-3 mt-2">
                                <OrderDetailTable />
                            </div>
                            <div className="d-flex w-100 justify-content-end bg-white p-3">
                                <div>
                                    <p className="d-flex justify-content-between mb-2 orderDetail__text">
                                        <span>Tạm tính</span>
                                        <span className="ms-2">189.000đ</span>
                                    </p>
                                    <p className="d-flex justify-content-between mb-2 orderDetail__text">
                                        <span>Phí vận chuyển</span>
                                        <span className="ms-2">0đ</span>
                                    </p>
                                    <p className="d-flex justify-content-between align-items-center mb-2 orderDetail__text">
                                        <span>Tổng cộng</span>
                                        <span className="orderDetail__footer-price ms-2">189.000đ</span>
                                    </p>
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

export default OrderDetail;